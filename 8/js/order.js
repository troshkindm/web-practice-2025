const selectedDishes = {
    soup: null,
    main: null,
    salad: null,
    drink: null,
    dessert: null
};

function saveOrderToLocalStorage() {
    const orderIds = {
        soup: selectedDishes.soup?.keyword || null,
        main: selectedDishes.main?.keyword || null,
        salad: selectedDishes.salad?.keyword || null,
        drink: selectedDishes.drink?.keyword || null,
        dessert: selectedDishes.dessert?.keyword || null
    };
    localStorage.setItem('currentOrder', JSON.stringify(orderIds));
}

function loadOrderFromLocalStorage() {
    const saved = localStorage.getItem('currentOrder');
    if (!saved) return;

    try {
        const orderIds = JSON.parse(saved);

        Object.keys(orderIds).forEach(category => {
            if (orderIds[category]) {
                const dish = dishes.find(d => d.keyword === orderIds[category]);
                if (dish) {
                    selectedDishes[category] = dish;
                }
            }
        });
    } catch (error) {
        console.error('error loading order from localStorage:', error);
    }
}

function updateOrderDisplay() {
    const orderSoupElement = document.querySelector('#order-soup');
    const orderMainElement = document.querySelector('#order-main');
    const orderSaladElement = document.querySelector('#order-salad');
    const orderDrinkElement = document.querySelector('#order-drink');
    const orderDessertElement = document.querySelector('#order-dessert');

    const orderNothingElement = document.querySelector('#order-nothing');
    const orderSoupBlock = document.querySelector('#order-soup-block');
    const orderMainBlock = document.querySelector('#order-main-block');
    const orderSaladBlock = document.querySelector('#order-salad-block');
    const orderDrinkBlock = document.querySelector('#order-drink-block');
    const orderDessertBlock = document.querySelector('#order-dessert-block');
    const orderTotalBlock = document.querySelector('#order-total-block');
    const orderTotalPrice = document.querySelector('#order-total-price');

    const hasSelection = selectedDishes.soup || selectedDishes.main ||
        selectedDishes.salad || selectedDishes.drink ||
        selectedDishes.dessert;

    if (!hasSelection) {
        if (orderNothingElement) orderNothingElement.style.display = 'block';
        if (orderSoupBlock) orderSoupBlock.style.display = 'none';
        if (orderMainBlock) orderMainBlock.style.display = 'none';
        if (orderSaladBlock) orderSaladBlock.style.display = 'none';
        if (orderDrinkBlock) orderDrinkBlock.style.display = 'none';
        if (orderDessertBlock) orderDessertBlock.style.display = 'none';
        if (orderTotalBlock) orderTotalBlock.style.display = 'none';
        return;
    }

    if (orderNothingElement) orderNothingElement.style.display = 'none';
    if (orderSoupBlock) orderSoupBlock.style.display = 'block';
    if (orderMainBlock) orderMainBlock.style.display = 'block';
    if (orderSaladBlock) orderSaladBlock.style.display = 'block';
    if (orderDrinkBlock) orderDrinkBlock.style.display = 'block';
    if (orderDessertBlock) orderDessertBlock.style.display = 'block';

    if (orderSoupElement) {
        if (selectedDishes.soup) {
            orderSoupElement.textContent = `${selectedDishes.soup.name} ${selectedDishes.soup.price}₽`;
        } else {
            orderSoupElement.textContent = 'Блюдо не выбрано';
        }
    }

    if (orderMainElement) {
        if (selectedDishes.main) {
            orderMainElement.textContent = `${selectedDishes.main.name} ${selectedDishes.main.price}₽`;
        } else {
            orderMainElement.textContent = 'Блюдо не выбрано';
        }
    }

    if (orderSaladElement) {
        if (selectedDishes.salad) {
            orderSaladElement.textContent = `${selectedDishes.salad.name} ${selectedDishes.salad.price}₽`;
        } else {
            orderSaladElement.textContent = 'Блюдо не выбрано';
        }
    }

    if (orderDrinkElement) {
        if (selectedDishes.drink) {
            orderDrinkElement.textContent = `${selectedDishes.drink.name} ${selectedDishes.drink.price}₽`;
        } else {
            orderDrinkElement.textContent = 'Напиток не выбран';
        }
    }

    if (orderDessertElement) {
        if (selectedDishes.dessert) {
            orderDessertElement.textContent = `${selectedDishes.dessert.name} ${selectedDishes.dessert.price}₽`;
        } else {
            orderDessertElement.textContent = 'Блюдо не выбрано';
        }
    }

    const totalPrice = (selectedDishes.soup?.price || 0) +
        (selectedDishes.main?.price || 0) +
        (selectedDishes.salad?.price || 0) +
        (selectedDishes.drink?.price || 0) +
        (selectedDishes.dessert?.price || 0);

    if (orderTotalPrice) {
        orderTotalPrice.textContent = `${totalPrice}₽`;
    }
    if (orderTotalBlock) {
        orderTotalBlock.style.display = 'block';
    }
}

function selectDish(dishKeyword) {
    const dish = dishes.find(d => d.keyword === dishKeyword);
    if (!dish) return;

    selectedDishes[dish.category] = dish;
    saveOrderToLocalStorage();
    updateOrderDisplay();
    if (typeof updateStickyPanel === 'function') {
        updateStickyPanel();
    }
    highlightSelectedDishes();
}

function removeDish(category) {
    selectedDishes[category] = null;
    saveOrderToLocalStorage();
    updateOrderDisplay();
    if (typeof updateStickyPanel === 'function') {
        updateStickyPanel();
    }
    highlightSelectedDishes();
}

function highlightSelectedDishes() {
    document.querySelectorAll('.dish-card').forEach(card => {
        card.classList.remove('selected');
    });

    Object.values(selectedDishes).forEach(dish => {
        if (dish) {
            const card = document.querySelector(`.dish-card[data-dish="${dish.keyword}"]`);
            if (card) {
                card.classList.add('selected');
            }
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    document.addEventListener('click', (event) => {
        const dishCard = event.target.closest('.dish-card');
        if (dishCard && !event.target.closest('.remove-btn')) {
            const dishKeyword = dishCard.getAttribute('data-dish');
            selectDish(dishKeyword);
        }
    });
});