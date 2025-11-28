const API_URL = 'https://edu.std-900.ist.mospolytech.ru/labs/api';
const API_KEY = '93d1ea7e-f703-4e45-8062-3dc32166662d';

async function loadOrderDishes() {
    const saved = localStorage.getItem('currentOrder');
    if (!saved) {
        document.querySelector('#empty-order').style.display = 'block';
        document.querySelector('#order-dishes-container').style.display = 'none';
        return;
    }

    try {
        const orderIds = JSON.parse(saved);
        const container = document.querySelector('#order-dishes-container');
        const emptyOrder = document.querySelector('#empty-order');

        container.innerHTML = '';

        const hasAnyDish = Object.values(orderIds).some(id => id !== null);

        if (!hasAnyDish) {
            emptyOrder.style.display = 'block';
            container.style.display = 'none';
            return;
        }

        emptyOrder.style.display = 'none';
        container.style.display = 'grid';

        for (const [category, keyword] of Object.entries(orderIds)) {
            if (keyword) {
                const dish = dishes.find(d => d.keyword === keyword);
                if (dish) {
                    const card = createOrderDishCard(dish);
                    container.appendChild(card);
                }
            }
        }

        updateOrderSummary();
    } catch (error) {
        console.error('error loading order dishes:', error);
    }
}

function createOrderDishCard(dish) {
    const card = document.createElement('div');
    card.className = 'dish-card';
    card.setAttribute('data-dish', dish.keyword);
    card.setAttribute('data-category', dish.category);

    card.innerHTML = `
        <img src="${dish.image}" alt="${dish.name}">
        <p class="dish-price">${dish.price} ₽</p>
        <p class="dish-name">${dish.name}</p>
        <p class="dish-weight">${dish.count}</p>
        <button class="remove-btn" data-category="${dish.category}">Удалить</button>
    `;

    return card;
}

function updateOrderSummary() {
    const summaryElements = {
        soup: document.querySelector('#summary-soup'),
        main: document.querySelector('#summary-main'),
        salad: document.querySelector('#summary-salad'),
        drink: document.querySelector('#summary-drink'),
        dessert: document.querySelector('#summary-dessert'),
        total: document.querySelector('#summary-total')
    };

    if (selectedDishes.soup) {
        summaryElements.soup.textContent = `${selectedDishes.soup.name} - ${selectedDishes.soup.price}₽`;
    } else {
        summaryElements.soup.textContent = 'Не выбран';
    }

    if (selectedDishes.main) {
        summaryElements.main.textContent = `${selectedDishes.main.name} - ${selectedDishes.main.price}₽`;
    } else {
        summaryElements.main.textContent = 'Не выбрано';
    }

    if (selectedDishes.salad) {
        summaryElements.salad.textContent = `${selectedDishes.salad.name} - ${selectedDishes.salad.price}₽`;
    } else {
        summaryElements.salad.textContent = 'Не выбран';
    }

    if (selectedDishes.drink) {
        summaryElements.drink.textContent = `${selectedDishes.drink.name} - ${selectedDishes.drink.price}₽`;
    } else {
        summaryElements.drink.textContent = 'Не выбран';
    }

    if (selectedDishes.dessert) {
        summaryElements.dessert.textContent = `${selectedDishes.dessert.name} - ${selectedDishes.dessert.price}₽`;
    } else {
        summaryElements.dessert.textContent = 'Не выбран';
    }

    const totalPrice = (selectedDishes.soup?.price || 0) +
        (selectedDishes.main?.price || 0) +
        (selectedDishes.salad?.price || 0) +
        (selectedDishes.drink?.price || 0) +
        (selectedDishes.dessert?.price || 0);

    summaryElements.total.textContent = `${totalPrice}₽`;
}

function removeFromOrder(category) {
    removeDish(category);

    const card = document.querySelector(`.dish-card[data-category="${category}"]`);
    if (card) {
        card.remove();
    }

    updateOrderSummary();

    const container = document.querySelector('#order-dishes-container');
    const hasCards = container.querySelectorAll('.dish-card').length > 0;

    if (!hasCards) {
        document.querySelector('#empty-order').style.display = 'block';
        container.style.display = 'none';
    }
}

function getSelectedCategories() {
    const selected = [];
    if (selectedDishes.soup) selected.push('soup');
    if (selectedDishes.main) selected.push('main');
    if (selectedDishes.salad) selected.push('salad');
    if (selectedDishes.drink) selected.push('drink');
    return selected;
}

function isValidCombo(selected) {
    const comboVariants = [
        ['soup', 'main', 'salad', 'drink'],
        ['soup', 'main', 'drink'],
        ['soup', 'salad', 'drink'],
        ['main', 'salad', 'drink'],
        ['main', 'drink']
    ];

    for (let combo of comboVariants) {
        if (combo.length === selected.length &&
            combo.every(cat => selected.includes(cat))) {
            return true;
        }
    }
    return false;
}

function getNotificationMessage(selected) {
    if (selected.length === 0) {
        return 'Ничего не выбрано. Выберите блюда для заказа';
    }

    const hasSoup = selected.includes('soup');
    const hasMain = selected.includes('main');
    const hasSalad = selected.includes('salad');
    const hasDrink = selected.includes('drink');

    if (!hasDrink) {
        return 'Выберите напиток';
    }

    if (hasSoup && !hasMain && !hasSalad) {
        return 'Выберите главное блюдо или салат/стартер';
    }

    if (hasSalad && !hasSoup && !hasMain) {
        return 'Выберите суп или главное блюдо';
    }

    if (!hasMain && !hasSoup) {
        return 'Выберите главное блюдо';
    }

    return 'Ваш заказ не соответствует ни одному комбо';
}

async function submitOrder(formData) {
    try {
        const response = await fetch(`${API_URL}/orders?api_key=${API_KEY}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'ошибка при отправке заказа');
        }

        const result = await response.json();

        localStorage.removeItem('currentOrder');

        alert('Заказ успешно оформлен!');
        window.location.href = 'index.html';

        return result;
    } catch (error) {
        console.error('submit order error:', error);
        alert(`Ошибка при оформлении заказа: ${error.message}`);
        throw error;
    }
}

function getCategoryIdField(category) {
    const mapping = {
        'soup': 'soup_id',
        'main': 'main_course_id',
        'salad': 'salad_id',
        'drink': 'drink_id',
        'dessert': 'dessert_id'
    };
    return mapping[category];
}

async function handleFormSubmit(event) {
    event.preventDefault();

    const selected = getSelectedCategories();

    if (!isValidCombo(selected)) {
        const message = getNotificationMessage(selected);
        alert(message);
        return;
    }

    const form = event.target;
    const formData = new FormData(form);

    const deliveryType = formData.get('delivery_type');
    const deliveryTime = formData.get('delivery_time');

    if (deliveryType === 'by_time' && !deliveryTime) {
        alert('Укажите время доставки');
        return;
    }

    const orderData = {
        full_name: formData.get('full_name'),
        email: formData.get('email'),
        subscribe: formData.get('subscribe') ? 1 : 0,
        phone: formData.get('phone'),
        delivery_address: formData.get('delivery_address'),
        delivery_type: deliveryType,
        comment: formData.get('comment') || ''
    };

    if (deliveryType === 'by_time' && deliveryTime) {
        orderData.delivery_time = deliveryTime;
    }

    Object.entries(selectedDishes).forEach(([category, dish]) => {
        if (dish) {
            const fieldName = getCategoryIdField(category);
            orderData[fieldName] = dish.id;
        }
    });

    await submitOrder(orderData);
}

async function initializeOrderPage() {
    await loadDishes();
    loadOrderFromLocalStorage();
    await loadOrderDishes();
}

document.addEventListener('DOMContentLoaded', async () => {
    await initializeOrderPage();

    document.addEventListener('click', (event) => {
        if (event.target.classList.contains('remove-btn')) {
            const category = event.target.getAttribute('data-category');
            removeFromOrder(category);
        }
    });

    const form = document.querySelector('#order-form');
    if (form) {
        form.addEventListener('submit', handleFormSubmit);
    }

    const resetButton = document.querySelector('#reset-order');
    if (resetButton) {
        resetButton.addEventListener('click', () => {
            if (confirm('Вы уверены что хотите очистить заказ?')) {
                localStorage.removeItem('currentOrder');
                window.location.reload();
            }
        });
    }
});