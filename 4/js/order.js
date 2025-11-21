const selectedDishes = {
    soup: null,
    main: null,
    drink: null
};

function updateOrderDisplay() {
    const orderSoupElement = document.querySelector('#order-soup');
    const orderMainElement = document.querySelector('#order-main');
    const orderDrinkElement = document.querySelector('#order-drink');
    const orderNothingElement = document.querySelector('#order-nothing');
    const orderTotalBlock = document.querySelector('#order-total-block');
    const orderTotalPrice = document.querySelector('#order-total-price');

    const hasSelection = selectedDishes.soup || selectedDishes.main || selectedDishes.drink;

    if (!hasSelection) {
        orderNothingElement.style.display = 'block';
        orderSoupElement.parentElement.style.display = 'none';
        orderMainElement.parentElement.style.display = 'none';
        orderDrinkElement.parentElement.style.display = 'none';
        orderTotalBlock.style.display = 'none';
        return;
    }

    orderNothingElement.style.display = 'none';
    orderSoupElement.parentElement.style.display = 'block';
    orderMainElement.parentElement.style.display = 'block';
    orderDrinkElement.parentElement.style.display = 'block';

    if (selectedDishes.soup) {
        orderSoupElement.textContent = `${selectedDishes.soup.name} ${selectedDishes.soup.price}₽`;
    } else {
        orderSoupElement.textContent = 'Блюдо не выбрано';
    }

    if (selectedDishes.main) {
        orderMainElement.textContent = `${selectedDishes.main.name} ${selectedDishes.main.price}₽`;
    } else {
        orderMainElement.textContent = 'Блюдо не выбрано';
    }

    if (selectedDishes.drink) {
        orderDrinkElement.textContent = `${selectedDishes.drink.name} ${selectedDishes.drink.price}₽`;
    } else {
        orderDrinkElement.textContent = 'Напиток не выбран';
    }

    const totalPrice = (selectedDishes.soup?.price || 0) +
        (selectedDishes.main?.price || 0) +
        (selectedDishes.drink?.price || 0);

    orderTotalPrice.textContent = `${totalPrice}₽`;
    orderTotalBlock.style.display = 'block';
}

function selectDish(dishKeyword) {
    const dish = dishes.find(d => d.keyword === dishKeyword);
    if (!dish) return;

    selectedDishes[dish.category] = dish;
    updateOrderDisplay();
}

document.addEventListener('DOMContentLoaded', () => {
    document.addEventListener('click', (event) => {
        const dishCard = event.target.closest('.dish-card');
        if (dishCard) {
            const dishKeyword = dishCard.getAttribute('data-dish');
            selectDish(dishKeyword);
        }
    });

    updateOrderDisplay();
});