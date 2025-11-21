const dishes = [
    // soups
    {
        keyword: 'krysolapsha',
        name: 'Суп "Крысолапша"',
        price: 520,
        category: 'soup',
        kind: 'meat',
        count: '450 мл',
        image: 'images/soup1.webp'
    },
    {
        keyword: 'hvostovoy-bulyon',
        name: 'Хвостовой бульон',
        price: 490,
        category: 'soup',
        kind: 'meat',
        count: '400 мл',
        image: 'images/soup2.webp'
    },
    {
        keyword: 'krem-sup',
        name: 'Крем-суп "Лабораторный" с грибами',
        price: 650,
        category: 'soup',
        kind: 'veg',
        count: '350 мл',
        image: 'images/soup3.webp'
    },
    {
        keyword: 'uha-portovaya',
        name: 'Уха из портовой крысы',
        price: 780,
        category: 'soup',
        kind: 'fish',
        count: '400 мл',
        image: 'images/soup4.webp'
    },
    {
        keyword: 'krysa-borsch',
        name: 'Крысиный борщ с хвостом',
        price: 560,
        category: 'soup',
        kind: 'meat',
        count: '450 мл',
        image: 'images/soup5.webp'
    },
    {
        keyword: 'minestrone',
        name: 'Минестроне "Подземное"',
        price: 620,
        category: 'soup',
        kind: 'veg',
        count: '400 мл',
        image: 'images/soup6.webp'
    },

    // main dishes
    {
        keyword: 'podvalny',
        name: 'Крысиный Люкс "Подвальный"',
        price: 666,
        category: 'main',
        kind: 'meat',
        count: '350 г',
        image: 'images/main1.webp'
    },
    {
        keyword: 'krysa-tyan',
        name: 'Крыса-Тян по-Токийски',
        price: 890,
        category: 'main',
        kind: 'fish',
        count: '280 г',
        image: 'images/main2.webp'
    },
    {
        keyword: 'karpaccho',
        name: 'Карпаччо "Спортивная Крыса"',
        price: 1100,
        category: 'main',
        kind: 'meat',
        count: '180 г',
        image: 'images/main3.webp'
    },
    {
        keyword: 'rizotto',
        name: 'Крысиное Ризотто "Метро-2"',
        price: 750,
        category: 'main',
        kind: 'veg',
        count: '320 г',
        image: 'images/main4.webp'
    },
    {
        keyword: 'steak',
        name: 'Премиум стейк из канализационной крысы',
        price: 1200,
        category: 'main',
        kind: 'meat',
        count: '300 г',
        image: 'images/main5.webp'
    },
    {
        keyword: 'frikadelki',
        name: 'Фрикадельки с хвостиками',
        price: 580,
        category: 'main',
        kind: 'fish',
        count: '250 г',
        image: 'images/main6.webp'
    },
    {
        keyword: 'pasta-veg',
        name: 'Паста с овощами "Найденная"',
        price: 720,
        category: 'main',
        kind: 'veg',
        count: '300 г',
        image: 'images/main7.webp'
    },

    // salads
    {
        keyword: 'tartar',
        name: 'Тартар из портовой крысы',
        price: 680,
        category: 'salad',
        kind: 'fish',
        count: '150 г',
        image: 'images/salad1.webp'
    },
    {
        keyword: 'pashtet',
        name: 'Паштет из подвальной печени',
        price: 420,
        category: 'salad',
        kind: 'meat',
        count: '120 г',
        image: 'images/salad2.webp'
    },
    {
        keyword: 'rukola',
        name: 'Салат "Найденная рукола"',
        price: 380,
        category: 'salad',
        kind: 'veg',
        count: '200 г',
        image: 'images/salad3.webp'
    },
    {
        keyword: 'ushki',
        name: 'Крысиные ушки маринованные',
        price: 340,
        category: 'salad',
        kind: 'veg',
        count: '180 г',
        image: 'images/salad4.webp'
    },
    {
        keyword: 'grill-ovoshi',
        name: 'Овощи гриль из помойки',
        price: 450,
        category: 'salad',
        kind: 'veg',
        count: '220 г',
        image: 'images/salad5.webp'
    },
    {
        keyword: 'zelen',
        name: 'Зелень с хвостовой заправкой',
        price: 320,
        category: 'salad',
        kind: 'veg',
        count: '180 г',
        image: 'images/salad6.webp'
    },

    // drinks
    {
        keyword: 'mors',
        name: 'Морс "Крысиные Слёзы"',
        price: 150,
        category: 'drink',
        kind: 'cold',
        count: '300 мл',
        image: 'images/drink1.webp'
    },
    {
        keyword: 'smoothie',
        name: 'Смузи "Хвостатый Детокс"',
        price: 250,
        category: 'drink',
        kind: 'cold',
        count: '350 мл',
        image: 'images/drink2.webp'
    },
    {
        keyword: 'coffee',
        name: 'Кофе "Канализационная Арабика"',
        price: 180,
        category: 'drink',
        kind: 'hot',
        count: '250 мл',
        image: 'images/drink3.webp'
    },
    {
        keyword: 'tea',
        name: 'Чай из крысиных усов',
        price: 140,
        category: 'drink',
        kind: 'hot',
        count: '300 мл',
        image: 'images/drink4.webp'
    },
    {
        keyword: 'glintvein',
        name: 'Глинтвейн "Канализационный"',
        price: 320,
        category: 'drink',
        kind: 'hot',
        count: '250 мл',
        image: 'images/drink5.webp'
    },
    {
        keyword: 'limonad',
        name: 'Лимонад из сточных вод',
        price: 160,
        category: 'drink',
        kind: 'cold',
        count: '400 мл',
        image: 'images/drink6.webp'
    },

    // desserts
    {
        keyword: 'macaron',
        name: 'Крысиное макарон',
        price: 180,
        category: 'dessert',
        kind: 'small',
        count: '50 г',
        image: 'images/dessert1.webp'
    },
    {
        keyword: 'eclair',
        name: 'Мини-эклер с хвостовой начинкой',
        price: 160,
        category: 'dessert',
        kind: 'small',
        count: '60 г',
        image: 'images/dessert2.webp'
    },
    {
        keyword: 'truffle',
        name: 'Трюфель "Тоннельный"',
        price: 140,
        category: 'dessert',
        kind: 'small',
        count: '40 г',
        image: 'images/dessert3.webp'
    },
    {
        keyword: 'cheesecake',
        name: 'Чизкейк "Лабораторный"',
        price: 320,
        category: 'dessert',
        kind: 'medium',
        count: '150 г',
        image: 'images/dessert4.webp'
    },
    {
        keyword: 'tiramisu',
        name: 'Тирамису "Подвальное"',
        price: 380,
        category: 'dessert',
        kind: 'medium',
        count: '180 г',
        image: 'images/dessert5.webp'
    },
    {
        keyword: 'cake',
        name: 'Торт "Король канализации"',
        price: 650,
        category: 'dessert',
        kind: 'large',
        count: '350 г',
        image: 'images/dessert6.webp'
    }
];