const API_URL = 'https://edu.std-900.ist.mospolytech.ru/labs/api';
const API_KEY = '93d1ea7e-f703-4e45-8062-3dc32166662d';

let allOrders = [];
let allDishes = [];

async function loadAllDishes() {
    try {
        const response = await fetch(`${API_URL}/dishes`);
        if (!response.ok) {
            throw new Error('failed to load dishes');
        }
        allDishes = await response.json();
        return allDishes;
    } catch (error) {
        console.error('load dishes error:', error);
        return [];
    }
}

function getDishById(id) {
    return allDishes.find(dish => dish.id === id);
}

function formatDate(dateString) {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
}

function formatDateTime(dateString) {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${day}.${month}.${year} ${hours}:${minutes}`;
}

function getOrderComposition(order) {
    const dishes = [];

    if (order.soup_id) {
        const dish = getDishById(order.soup_id);
        if (dish) dishes.push(dish.name);
    }

    if (order.main_course_id) {
        const dish = getDishById(order.main_course_id);
        if (dish) dishes.push(dish.name);
    }

    if (order.salad_id) {
        const dish = getDishById(order.salad_id);
        if (dish) dishes.push(dish.name);
    }

    if (order.drink_id) {
        const dish = getDishById(order.drink_id);
        if (dish) dishes.push(dish.name);
    }

    if (order.dessert_id) {
        const dish = getDishById(order.dessert_id);
        if (dish) dishes.push(dish.name);
    }

    return dishes.join(', ');
}

function calculateOrderPrice(order) {
    let total = 0;

    if (order.soup_id) {
        const dish = getDishById(order.soup_id);
        if (dish) total += dish.price;
    }

    if (order.main_course_id) {
        const dish = getDishById(order.main_course_id);
        if (dish) total += dish.price;
    }

    if (order.salad_id) {
        const dish = getDishById(order.salad_id);
        if (dish) total += dish.price;
    }

    if (order.drink_id) {
        const dish = getDishById(order.drink_id);
        if (dish) total += dish.price;
    }

    if (order.dessert_id) {
        const dish = getDishById(order.dessert_id);
        if (dish) total += dish.price;
    }

    return total;
}

function getDeliveryTimeText(order) {
    if (order.delivery_type === 'by_time' && order.delivery_time) {
        return `К ${order.delivery_time}`;
    }
    return 'Как можно скорее (с 7:00 до 23:00)';
}

async function loadOrders() {
    try {
        const response = await fetch(`${API_URL}/orders?api_key=${API_KEY}`);

        if (!response.ok) {
            throw new Error('failed to load orders');
        }

        allOrders = await response.json();
        allOrders.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

        displayOrders();
    } catch (error) {
        console.error('load orders error:', error);
        const container = document.querySelector('#orders-container');
        container.innerHTML = '<p class="empty-state">Ошибка при загрузке заказов. Попробуйте обновить страницу.</p>';
    }
}

function displayOrders() {
    const container = document.querySelector('#orders-container');

    if (allOrders.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <p>У вас пока нет заказов. <a href="lunch.html">Перейти к меню</a></p>
            </div>
        `;
        return;
    }

    const ordersList = document.createElement('div');
    ordersList.className = 'orders-list';

    allOrders.forEach((order, index) => {
        const card = createOrderCard(order, index + 1);
        ordersList.appendChild(card);
    });

    container.innerHTML = '';
    container.appendChild(ordersList);
}

function createOrderCard(order, number) {
    const card = document.createElement('div');
    card.className = 'order-card';
    card.setAttribute('data-order-id', order.id);

    const composition = getOrderComposition(order);
    const price = calculateOrderPrice(order);
    const deliveryTime = getDeliveryTimeText(order);

    card.innerHTML = `
        <div class="order-header">
            <span class="order-number">Заказ №${number}</span>
            <span class="order-date">${formatDate(order.created_at)}</span>
        </div>
        <div class="order-body">
            <div class="order-info-row">
                <span class="order-label">Состав:</span>
                <span class="order-value">${composition}</span>
            </div>
            <div class="order-info-row">
                <span class="order-label">Стоимость:</span>
                <span class="order-value order-price">${price}₽</span>
            </div>
            <div class="order-info-row">
                <span class="order-label">Доставка:</span>
                <span class="order-value">${deliveryTime}</span>
            </div>
        </div>
        <div class="order-actions">
            <button class="btn btn-view" onclick="viewOrder(${order.id})">Подробнее</button>
            <button class="btn btn-edit" onclick="editOrder(${order.id})">Редактировать</button>
            <button class="btn btn-delete" onclick="deleteOrder(${order.id})">Удалить</button>
        </div>
    `;

    return card;
}

function viewOrder(orderId) {
    const order = allOrders.find(o => o.id === orderId);
    if (!order) return;

    const composition = getOrderComposition(order);
    const price = calculateOrderPrice(order);
    const deliveryTime = getDeliveryTimeText(order);

    const content = `
        <div class="modal-info-row">
            <span class="modal-info-label">Дата оформления:</span>
            <span class="modal-info-value">${formatDateTime(order.created_at)}</span>
        </div>
        <div class="modal-info-row">
            <span class="modal-info-label">Состав заказа:</span>
            <span class="modal-info-value">${composition}</span>
        </div>
        <div class="modal-info-row">
            <span class="modal-info-label">Стоимость:</span>
            <span class="modal-info-value">${price}₽</span>
        </div>
        <div class="modal-info-row">
            <span class="modal-info-label">Имя:</span>
            <span class="modal-info-value">${order.full_name}</span>
        </div>
        <div class="modal-info-row">
            <span class="modal-info-label">Email:</span>
            <span class="modal-info-value">${order.email}</span>
        </div>
        <div class="modal-info-row">
            <span class="modal-info-label">Телефон:</span>
            <span class="modal-info-value">${order.phone}</span>
        </div>
        <div class="modal-info-row">
            <span class="modal-info-label">Адрес доставки:</span>
            <span class="modal-info-value">${order.delivery_address}</span>
        </div>
        <div class="modal-info-row">
            <span class="modal-info-label">Время доставки:</span>
            <span class="modal-info-value">${deliveryTime}</span>
        </div>
        ${order.comment ? `
        <div class="modal-info-row">
            <span class="modal-info-label">Комментарий:</span>
            <span class="modal-info-value">${order.comment}</span>
        </div>
        ` : ''}
    `;

    document.querySelector('#modal-view-content').innerHTML = content;
    openModal('modal-view');
}

function editOrder(orderId) {
    const order = allOrders.find(o => o.id === orderId);
    if (!order) return;

    document.querySelector('#edit-order-id').value = order.id;
    document.querySelector('#edit-full-name').value = order.full_name;
    document.querySelector('#edit-email').value = order.email;
    document.querySelector('#edit-phone').value = order.phone;
    document.querySelector('#edit-address').value = order.delivery_address;
    document.querySelector('#edit-comment').value = order.comment || '';

    if (order.delivery_type === 'now') {
        document.querySelector('#edit-now').checked = true;
    } else {
        document.querySelector('#edit-by-time').checked = true;
    }

    if (order.delivery_time) {
        document.querySelector('#edit-time').value = order.delivery_time;
    } else {
        document.querySelector('#edit-time').value = '';
    }

    openModal('modal-edit');
}

function deleteOrder(orderId) {
    document.querySelector('#delete-order-id').value = orderId;
    openModal('modal-delete');
}

async function confirmDelete() {
    const orderId = document.querySelector('#delete-order-id').value;

    try {
        const response = await fetch(`${API_URL}/orders/${orderId}?api_key=${API_KEY}`, {
            method: 'DELETE'
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'failed to delete order');
        }

        closeModal('modal-delete');

        allOrders = allOrders.filter(o => o.id != orderId);
        displayOrders();

        alert('Заказ успешно удалён');
    } catch (error) {
        console.error('delete order error:', error);
        alert(`Ошибка при удалении заказа: ${error.message}`);
    }
}

async function handleEditFormSubmit(event) {
    event.preventDefault();

    const orderId = document.querySelector('#edit-order-id').value;
    const form = event.target;
    const formData = new FormData(form);

    const deliveryType = formData.get('delivery_type');
    const deliveryTime = formData.get('delivery_time');

    if (deliveryType === 'by_time' && !deliveryTime) {
        alert('Укажите время доставки');
        return;
    }

    const updateData = {
        full_name: formData.get('full_name'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        delivery_address: formData.get('delivery_address'),
        delivery_type: deliveryType,
        comment: formData.get('comment') || ''
    };

    if (deliveryType === 'by_time' && deliveryTime) {
        updateData.delivery_time = deliveryTime;
    }

    try {
        const response = await fetch(`${API_URL}/orders/${orderId}?api_key=${API_KEY}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updateData)
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'failed to update order');
        }

        const updatedOrder = await response.json();

        const index = allOrders.findIndex(o => o.id == orderId);
        if (index !== -1) {
            allOrders[index] = updatedOrder;
        }

        closeModal('modal-edit');
        displayOrders();

        alert('Заказ успешно изменён');
    } catch (error) {
        console.error('update order error:', error);
        alert(`Ошибка при изменении заказа: ${error.message}`);
    }
}

function openModal(modalId) {
    const modal = document.querySelector(`#${modalId}`);
    modal.classList.add('active');
}

function closeModal(modalId) {
    const modal = document.querySelector(`#${modalId}`);
    modal.classList.remove('active');
}

document.addEventListener('DOMContentLoaded', async () => {
    await loadAllDishes();
    await loadOrders();

    document.querySelector('#edit-form').addEventListener('submit', handleEditFormSubmit);

    document.querySelectorAll('.modal-close').forEach(closeBtn => {
        closeBtn.addEventListener('click', (e) => {
            const modal = e.target.closest('.modal');
            modal.classList.remove('active');
        });
    });

    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
            }
        });
    });
});