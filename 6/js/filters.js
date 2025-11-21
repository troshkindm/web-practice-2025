const activeFilters = {
    soup: null,
    main: null,
    salad: null,
    drink: null,
    dessert: null
};

function getCategoryFromContainer(container) {
    const containerId = container.id;
    if (containerId.includes('soups')) return 'soup';
    if (containerId.includes('mains')) return 'main';
    if (containerId.includes('salads')) return 'salad';
    if (containerId.includes('drinks')) return 'drink';
    if (containerId.includes('desserts')) return 'dessert';
    return null;
}

function filterDishes(category, kind) {
    const containerMap = {
        'soup': '#soups-container',
        'main': '#mains-container',
        'salad': '#salads-container',
        'drink': '#drinks-container',
        'dessert': '#desserts-container'
    };

    const container = document.querySelector(containerMap[category]);
    if (!container) return;

    const allCards = container.querySelectorAll('.dish-card');

    if (kind === null) {
        allCards.forEach(card => {
            card.style.display = 'flex';
        });
    } else {
        allCards.forEach(card => {
            if (card.getAttribute('data-kind') === kind) {
                card.style.display = 'flex';
            } else {
                card.style.display = 'none';
            }
        });
    }
}

function handleFilterClick(event) {
    const button = event.target;
    if (!button.classList.contains('filter-btn')) return;

    const section = button.closest('.lunch-section');
    const container = section.querySelector('.dishes-grid');
    const category = getCategoryFromContainer(container);
    const kind = button.getAttribute('data-kind');

    const filtersNav = button.closest('.filters');
    const allButtons = filtersNav.querySelectorAll('.filter-btn');

    if (button.classList.contains('active')) {
        button.classList.remove('active');
        activeFilters[category] = null;
        filterDishes(category, null);
    } else {
        allButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        activeFilters[category] = kind;
        filterDishes(category, kind);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    document.addEventListener('click', handleFilterClick);
});