function sortDishesByName(dishesArray) {
    return dishesArray.sort((a, b) => a.name.localeCompare(b.name));
}

function createDishCard(dish) {
    const card = document.createElement('div');
    card.className = 'dish-card';
    card.setAttribute('data-dish', dish.keyword);
    card.setAttribute('data-kind', dish.kind);

    card.innerHTML = `
        <img src="${dish.image}" alt="${dish.name}">
        <p class="dish-price">${dish.price} ₽</p>
        <p class="dish-name">${dish.name}</p>
        <p class="dish-weight">${dish.count}</p>
        <button>Добавить</button>
    `;

    return card;
}

function displayDishesByCategory(category, containerId) {
    const container = document.querySelector(containerId);
    if (!container) return;

    container.innerHTML = '';

    const categoryDishes = dishes.filter(dish => dish.category === category);
    const sortedDishes = sortDishesByName(categoryDishes);

    sortedDishes.forEach(dish => {
        const card = createDishCard(dish);
        container.appendChild(card);
    });
}

function displayAllDishes() {
    displayDishesByCategory('soup', '#soups-container');
    displayDishesByCategory('main', '#mains-container');
    displayDishesByCategory('salad', '#salads-container');
    displayDishesByCategory('drink', '#drinks-container');
    displayDishesByCategory('dessert', '#desserts-container');
}

document.addEventListener('DOMContentLoaded', () => {
    displayAllDishes();
});