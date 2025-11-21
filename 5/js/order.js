const selectedDishes = {
    soup: null,
    main: null,
    salad: null,
    drink: null,
    dessert: null
};

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
        orderNothingElement.style.display = 'block';
        orderSoupBlock.style.display = 'none';
        orderMainBlock.style.display = 'none';
        orderSaladBlock.style.display = 'none';
        orderDrinkBlock.style.display = 'none';
        orderDessertBlock.style.display = 'none';
        orderTotalBlock.style.display = 'none';
        return;
    }

    orderNothingElement.style.display = 'none';
    orderSoupBlock.style.display = 'block';
    orderMainBlock.style.display = 'block';
    orderSaladBlock.style.display = 'block';
    orderDrinkBlock.style.display = 'block';
    orderDessertBlock.style.display = 'block';

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

    if (selectedDishes.salad) {
        orderSaladElement.textContent = `${selectedDishes.salad.name} ${selectedDishes.salad.price}₽`;
    } else {
        orderSaladElement.textContent = 'Блюдо не выбрано';
    }

    if (selectedDishes.drink) {
        orderDrinkElement.textContent = `${selectedDishes.drink.name} ${selectedDishes.drink.price}₽`;
    } else {
        orderDrinkElement.textContent = 'Напиток не выбран';
    }

    if (selectedDishes.dessert) {
        orderDessertElement.textContent = `${selectedDishes.dessert.name} ${selectedDishes.dessert.price}₽`;
    } else {
        orderDessertElement.textContent = 'Блюдо не выбрано';
    }

    const totalPrice = (selectedDishes.soup?.price || 0) +
        (selectedDishes.main?.price || 0) +
        (selectedDishes.salad?.price || 0) +
        (selectedDishes.drink?.price || 0) +
        (selectedDishes.dessert?.price || 0);

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