const comboVariants = [
    ['soup', 'main', 'salad', 'drink'],
    ['soup', 'main', 'drink'],
    ['soup', 'salad', 'drink'],
    ['main', 'salad', 'drink'],
    ['main', 'drink']
];

function getSelectedCategories() {
    const selected = [];
    if (selectedDishes.soup) selected.push('soup');
    if (selectedDishes.main) selected.push('main');
    if (selectedDishes.salad) selected.push('salad');
    if (selectedDishes.drink) selected.push('drink');
    return selected;
}

function isValidCombo(selected) {
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
        return {
            text: 'Ничего не выбрано. Выберите блюда для заказа',
            image: 'images/notification-empty.png'
        };
    }

    const hasSoup = selected.includes('soup');
    const hasMain = selected.includes('main');
    const hasSalad = selected.includes('salad');
    const hasDrink = selected.includes('drink');

    if (!hasDrink) {
        return {
            text: 'Выберите напиток',
            image: 'images/notification-drink.png'
        };
    }

    if (hasSoup && !hasMain && !hasSalad) {
        return {
            text: 'Выберите главное блюдо или салат/стартер',
            image: 'images/notification-main-salad.png'
        };
    }

    if (hasSalad && !hasSoup && !hasMain) {
        return {
            text: 'Выберите суп или главное блюдо',
            image: 'images/notification-main-salad.png'
        };
    }

    if (!hasMain && !hasSoup) {
        return {
            text: 'Выберите главное блюдо',
            image: 'images/notification-main-salad.png'
        };
    }

    return {
        text: 'Ваш заказ не соответствует ни одному комбо',
        image: 'images/notification-main-salad.png'
    };
}

function showNotification(message, image) {
    const modal = document.createElement('div');
    modal.className = 'notification-modal';

    modal.innerHTML = `
        <div class="notification-content">
            <img src="${image}" alt="Уведомление">
            <p>${message}</p>
            <button>Окей</button>
        </div>
    `;

    document.body.appendChild(modal);

    const button = modal.querySelector('button');
    button.addEventListener('click', () => {
        modal.remove();
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
        }
    });
}

function validateOrder(event) {
    event.preventDefault();

    const selected = getSelectedCategories();

    if (isValidCombo(selected)) {
        event.target.submit();
    } else {
        const notification = getNotificationMessage(selected);
        showNotification(notification.text, notification.image);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('.order-form');
    if (form) {
        form.addEventListener('submit', validateOrder);
    }
});