let dishes = [
    // {
    //     keyword: 'tartar',
    //     name: 'Тартар из портовой крысы',
    //     price: 680,
    //     category: 'salad',
    //     kind: 'fish',
    //     count: '150 г',
    //     image: 'images/salad1.webp'
    // },
    // {
    //     keyword: 'pashtet',
    //     name: 'Паштет из подвальной печени',
    //     price: 420,
    //     category: 'salad',
    //     kind: 'meat',
    //     count: '120 г',
    //     image: 'images/salad2.webp'
    // },
    // {
    //     keyword: 'rukola',
    //     name: 'Салат "Найденная рукола"',
    //     price: 380,
    //     category: 'salad',
    //     kind: 'veg',
    //     count: '200 г',
    //     image: 'images/salad3.webp'
    // },
    // {
    //     keyword: 'ushki',
    //     name: 'Крысиные ушки маринованные',
    //     price: 340,
    //     category: 'salad',
    //     kind: 'veg',
    //     count: '180 г',
    //     image: 'images/salad4.webp'
    // },
    // {
    //     keyword: 'grill-ovoshi',
    //     name: 'Овощи гриль из помойки',
    //     price: 450,
    //     category: 'salad',
    //     kind: 'veg',
    //     count: '220 г',
    //     image: 'images/salad5.webp'
    // },
    // {
    //     keyword: 'zelen',
    //     name: 'Зелень с хвостовой заправкой',
    //     price: 320,
    //     category: 'salad',
    //     kind: 'veg',
    //     count: '180 г',
    //     image: 'images/salad6.webp'
    // },
    // {
    //     keyword: 'mors',
    //     name: 'Морс "Крысиные Слёзы"',
    //     price: 150,
    //     category: 'drink',
    //     kind: 'cold',
    //     count: '300 мл',
    //     image: 'images/drink1.webp'
    // },
    // {
    //     keyword: 'smoothie',
    //     name: 'Смузи "Хвостатый Детокс"',
    //     price: 250,
    //     category: 'drink',
    //     kind: 'cold',
    //     count: '350 мл',
    //     image: 'images/drink2.webp'
    // },
    // {
    //     keyword: 'coffee',
    //     name: 'Кофе "Канализационная Арабика"',
    //     price: 180,
    //     category: 'drink',
    //     kind: 'hot',
    //     count: '250 мл',
    //     image: 'images/drink3.webp'
    // },
    // {
    //     keyword: 'tea',
    //     name: 'Чай из крысиных усов',
    //     price: 140,
    //     category: 'drink',
    //     kind: 'hot',
    //     count: '300 мл',
    //     image: 'images/drink4.webp'
    // },
    // {
    //     keyword: 'glintvein',
    //     name: 'Глинтвейн "Канализационный"',
    //     price: 320,
    //     category: 'drink',
    //     kind: 'hot',
    //     count: '250 мл',
    //     image: 'images/drink5.webp'
    // },
    // {
    //     keyword: 'limonad',
    //     name: 'Лимонад из сточных вод',
    //     price: 160,
    //     category: 'drink',
    //     kind: 'cold',
    //     count: '400 мл',
    //     image: 'images/drink6.webp'
    // }
];

async function loadDishes() {
    try {
        const response = await fetch('https://edu.std-900.ist.mospolytech.ru/labs/api/dishes');

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const apiDishes = await response.json();

        const normalizedDishes = apiDishes.map(dish => {
            if (dish.category === 'main-course') {
                return { ...dish, category: 'main' };
            }
            return dish;
        });

        dishes = [...normalizedDishes, ...dishes];

        return dishes;
    } catch (error) {
        console.error('failed to load dishes from api:', error);
        return dishes;
    }
}