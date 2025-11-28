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

function updateStickyPanel() {
    const panel = document.querySelector('.sticky-panel');
    if (!panel) return;

    const totalPrice = (selectedDishes.soup?.price || 0) +
        (selectedDishes.main?.price || 0) +
        (selectedDishes.salad?.price || 0) +
        (selectedDishes.drink?.price || 0) +
        (selectedDishes.dessert?.price || 0);

    const hasSelection = selectedDishes.soup || selectedDishes.main ||
        selectedDishes.salad || selectedDishes.drink ||
        selectedDishes.dessert;

    if (!hasSelection) {
        panel.style.display = 'none';
        return;
    }

    panel.style.display = 'flex';

    const priceElement = panel.querySelector('.panel-price');
    if (priceElement) {
        priceElement.textContent = `${totalPrice}₽`;
    }

    const orderButton = panel.querySelector('.panel-button');
    const selected = getSelectedCategories();
    const valid = isValidCombo(selected);

    if (orderButton) {
        if (valid) {
            orderButton.classList.remove('disabled');
            orderButton.disabled = false;
        } else {
            orderButton.classList.add('disabled');
            orderButton.disabled = true;
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    updateStickyPanel();
});