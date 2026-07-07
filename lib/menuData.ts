export interface MenuItem {
  id: number;
  nameUz: string;
  nameEn: string;
  nameRu: string;
  descUz: string;
  descEn: string;
  descRu: string;
  price: number;
  category: string;
  image: string;
  tags: string[];
  weight?: string;
  calories?: number;
}

export const menuItems: MenuItem[] = [
  // ===== OSHPAZ TAVSIYASI =====
  {
    id: 1,
    nameUz: "Oshpaz Maxsus Losossi",
    nameEn: "Chef's Special Salmon",
    nameRu: "Особый лосось шефа",
    descUz: "Limon sousi va kapers bilan pishirilgan Atlantika losossi",
    descEn: "Atlantic salmon with lemon sauce and capers",
    descRu: "Атлантический лосось с лимонным соусом и каперсами",
    price: 89000,
    category: "chef",
    // Salmon taom
    image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=400&q=80",
    tags: ["popular", "chef"],
    weight: "320g",
    calories: 420,
  },

  // ===== GAZAKLAR =====
  {
    id: 3,
    nameUz: "Truffel Bruschetta",
    nameEn: "Truffle Bruschetta",
    nameRu: "Трюфельная брускетта",
    descUz: "Qora truffel va rikotra pendiri bilan italyan non",
    descEn: "Italian bread with black truffle and ricotta cheese",
    descRu: "Итальянский хлеб с чёрным трюфелем и рикоттой",
    price: 32000,
    category: "appetizers",
    // Bruschetta
    image: "https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?auto=format&fit=crop&w=400&q=80",
    tags: ["popular"],
    weight: "180g",
  },
  {
    id: 4,
    nameUz: "Spinat Krem Sho'rvasi",
    nameEn: "Spinach Cream Soup",
    nameRu: "Крем-суп из шпината",
    descUz: "Yangi spinat, kaviar va grissini bilan premium krem sho'rva",
    descEn: "Fresh spinach cream soup with caviar and grissini breadstick",
    descRu: "Крем-суп из свежего шпината с икрой и хлебными палочками",
    price: 52000,
    category: "soups",
    // Spinach cream soup
    image: "https://images.unsplash.com/photo-1626200419199-391ae4be7a41?auto=format&fit=crop&w=400&q=80",
    tags: ["new"],
    weight: "240g",
  },

  // ===== SHOVRVALAR =====
  {
    id: 5,
    nameUz: "Frantsuz Piyoz Sho'rvasi",
    nameEn: "French Onion Soup",
    nameRu: "Французский луковый суп",
    descUz: "Gruyere pendiri va krutonlar bilan klassik fransuz sho'rvasi",
    descEn: "Classic French soup with Gruyère cheese and croutons",
    descRu: "Классический французский суп с сыром Грюйер и гренками",
    price: 38000,
    category: "soups",
    // French onion soup
    image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=400&q=80",
    tags: ["popular"],
    weight: "350ml",
  },
  {
    id: 6,
    nameUz: "Dengiz Mahsulotlari Sho'rvasi",
    nameEn: "Seafood Bisque",
    nameRu: "Суп из морепродуктов",
    descUz: "Krevetka, qisqichbaqa va dengiz mahsulotlari bilan krem sho'rva",
    descEn: "Cream soup with shrimp, crab and seafood",
    descRu: "Сливочный суп с креветками, крабом и морепродуктами",
    price: 45000,
    category: "soups",
    // Seafood soup
    image: "https://images.unsplash.com/photo-1476718406336-bb5a9690ee2a?auto=format&fit=crop&w=400&q=80",
    tags: ["chef"],
    weight: "350ml",
  },

  // ===== SALATLAR =====
  {
    id: 7,
    nameUz: "Sezar Deluxe",
    nameEn: "Caesar Deluxe",
    nameRu: "Цезарь Делюкс",
    descUz: "Grill kurka, parmezano va truffel krutonlar bilan",
    descEn: "Grilled turkey, Parmesan and truffle croutons",
    descRu: "Грилованная индейка, пармезан и трюфельные гренки",
    price: 42000,
    category: "salads",
    // Caesar salad
    image: "https://images.unsplash.com/photo-1546793665-c74683f339c1?auto=format&fit=crop&w=400&q=80",
    tags: ["popular"],
    weight: "280g",
  },
  {
    id: 8,
    nameUz: "Nisuaz Salati",
    nameEn: "Niçoise Salad",
    nameRu: "Салат Нисуаз",
    descUz: "Tuna, zaytun, pomidor va bichiq tuxum bilan klassik nisuaz",
    descEn: "Classic niçoise with tuna, olives, tomatoes and quail eggs",
    descRu: "Классический нисуаз с тунцом, оливками, помидорами и яйцами",
    price: 45000,
    category: "salads",
    // Nicoise salad
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=400&q=80",
    tags: [],
    weight: "300g",
  },

  // ===== ASOSIY TAOMLAR =====
  {
    id: 9,
    nameUz: "Mol Go'shti Wellingtons",
    nameEn: "Beef Wellington",
    nameRu: "Говядина Веллингтон",
    descUz: "Klassik ingliz taomi, grib duksell va puff pastry bilan",
    descEn: "Classic English dish with mushroom duxelles and puff pastry",
    descRu: "Классическое английское блюдо с грибным дюкселем и слоёным тестом",
    price: 125000,
    category: "mains",
    // Beef Wellington
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=400&q=80",
    tags: ["popular", "chef"],
    weight: "450g",
    calories: 680,
  },
  {
    id: 10,
    nameUz: "Qo'zi Qovurg'asi",
    nameEn: "Rack of Lamb",
    nameRu: "Корейка ягнёнка",
    descUz: "Otlar va sarimsoq bilan pishirilgan qo'zi qovurg'asi",
    descEn: "Herb and garlic crusted rack of lamb",
    descRu: "Корейка ягнёнка в корочке из трав и чеснока",
    price: 145000,
    category: "mains",
    // Rack of lamb
    image: "https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?auto=format&fit=crop&w=400&q=80",
    tags: ["new"],
    weight: "380g",
  },

  // ===== STEYKLAR =====
  {
    id: 11,
    nameUz: "Ribay Steyk",
    nameEn: "Ribeye Steak",
    nameRu: "Стейк Рибай",
    descUz: "250g premium Avstriya ribay, berbere sousi bilan",
    descEn: "250g premium Austrian ribeye with béarnaise sauce",
    descRu: "250г премиального австрийского рибая с соусом беарнез",
    price: 155000,
    category: "steaks",
    // Ribeye steak
    image: "https://images.unsplash.com/photo-1600891964092-4316c288032e?auto=format&fit=crop&w=400&q=80",
    tags: ["popular"],
    weight: "250g",
    calories: 720,
  },
  {
    id: 12,
    nameUz: "Filet Minyon",
    nameEn: "Filet Mignon",
    nameRu: "Филе Миньон",
    descUz: "200g mol filesi, truffel yog'i va krem sousi bilan",
    descEn: "200g beef tenderloin with truffle butter and cream sauce",
    descRu: "200г говяжьей вырезки с трюфельным маслом и сливочным соусом",
    price: 175000,
    category: "steaks",
    // Filet mignon
    image: "https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&w=400&q=80",
    tags: ["popular", "chef"],
    weight: "200g",
    calories: 590,
  },
  {
    id: 2,
    nameUz: "Royal Wagyu Steyk",
    nameEn: "Royal Wagyu Steak",
    nameRu: "Королевский стейк Вагю",
    descUz: "A5 Yapon Wagyu go'shti, truffel va foie gras bilan",
    descEn: "A5 Japanese Wagyu beef with truffle and foie gras",
    descRu: "Японская говядина Вагю A5 с трюфелем и фуа-гра",
    price: 195000,
    category: "steaks",
    // Wagyu steak - different angle
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80",
    tags: ["popular", "chef", "new"],
    weight: "400g",
    calories: 780,
  },

  // ===== GRILL VA KABOBLAR =====
  {
    id: 13,
    nameUz: "Lula Kabob Premium",
    nameEn: "Premium Lula Kebab",
    nameRu: "Премиум Люля Кебаб",
    descUz: "Qo'y va mol go'shti aralashmasi, sumakh va so'ganli",
    descEn: "Mixed lamb and beef with sumac and onion",
    descRu: "Смесь баранины и говядины с сумахом и луком",
    price: 65000,
    category: "grill",
    // Kebab
    image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=400&q=80",
    tags: ["popular", "spicy"],
    weight: "350g",
  },
  {
    id: 14,
    nameUz: "Grill Qo'zi Qovurg'asi",
    nameEn: "Grilled Lamb Chops",
    nameRu: "Жареные бараньи отбивные",
    descUz: "Zaytun yog'i va limon suvi bilan marinado qilingan qo'zi",
    descEn: "Lamb chops marinated with olive oil and lemon juice",
    descRu: "Бараньи отбивные, маринованные в оливковом масле и лимонном соке",
    price: 115000,
    category: "grill",
    // Grilled lamb chops
    image: "https://images.unsplash.com/photo-1432139509613-5c4255815697?auto=format&fit=crop&w=400&q=80",
    tags: ["chef"],
    weight: "400g",
  },

  // ===== BALIQ VA DENGIZ MAHSULOTLARI =====
  {
    id: 15,
    nameUz: "Grill Lobster",
    nameEn: "Grilled Lobster",
    nameRu: "Жареный омар",
    descUz: "Butun lobster, limon-sariyog' sousi va o'tlar bilan",
    descEn: "Whole lobster with lemon-butter sauce and herbs",
    descRu: "Целый омар с лимонно-сливочным соусом и зеленью",
    price: 245000,
    category: "seafood",
    // Lobster
    image: "https://images.unsplash.com/photo-1559737558-2f5a35f4523b?auto=format&fit=crop&w=400&q=80",
    tags: ["popular", "chef", "new"],
    weight: "600g",
  },
  {
    id: 16,
    nameUz: "Tuna Tataki",
    nameEn: "Tuna Tataki",
    nameRu: "Тунец Татаки",
    descUz: "Yarim pishgan tuna, sezam va wasabi sousi bilan",
    descEn: "Seared tuna with sesame and wasabi sauce",
    descRu: "Обжаренный тунец с кунжутом и соусом васаби",
    price: 88000,
    category: "seafood",
    // Tuna dish
    image: "https://images.unsplash.com/photo-1580822184713-fc5400e7fe10?auto=format&fit=crop&w=400&q=80",
    tags: ["new"],
    weight: "280g",
  },

  // ===== GARNIRLAR =====
  {
    id: 17,
    nameUz: "Truffel Kartoshkasi",
    nameEn: "Truffle Potatoes",
    nameRu: "Картофель с трюфелем",
    descUz: "Qora truffel va parmezano bilan kremli kartoshka püresi",
    descEn: "Creamy potato purée with black truffle and Parmesan",
    descRu: "Кремовое картофельное пюре с чёрным трюфелем и пармезаном",
    price: 28000,
    category: "sides",
    // Mashed potatoes / truffle potatoes
    image: "https://images.unsplash.com/photo-1630384060421-cb20d0e0649d?auto=format&fit=crop&w=400&q=80",
    tags: ["popular"],
    weight: "200g",
  },
  {
    id: 18,
    nameUz: "Asparagus Grill",
    nameEn: "Grilled Asparagus",
    nameRu: "Спаржа на гриле",
    descUz: "Balzamik sousi va parmezano bilan grill asparagus",
    descEn: "Grilled asparagus with balsamic and Parmesan",
    descRu: "Спаржа гриль с бальзамиком и пармезаном",
    price: 22000,
    category: "sides",
    image: "https://images.unsplash.com/photo-1528712306091-ed0763094c98?auto=format&fit=crop&w=400&q=80",
    tags: [],
    weight: "180g",
  },

  // ===== SHIRINLIKLAR =====
  {
    id: 19,
    nameUz: "Shogolad Fondyu",
    nameEn: "Chocolate Fondant",
    nameRu: "Шоколадный фондан",
    descUz: "Ichidan issiq Belgi shogolad, vanil muzqaymoq bilan",
    descEn: "Warm Belgian chocolate with molten center and vanilla ice cream",
    descRu: "Тёплый бельгийский шоколад с жидкой начинкой и ванильным мороженым",
    price: 38000,
    category: "desserts",
    // Chocolate fondant
    image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=400&q=80",
    tags: ["popular"],
    weight: "180g",
    calories: 520,
  },
  {
    id: 20,
    nameUz: "Kremli Brule",
    nameEn: "Crème Brûlée",
    nameRu: "Крем-брюле",
    descUz: "Klassik fransuz desserti, karamelizatsiya qilingan qand bilan",
    descEn: "Classic French dessert with caramelized sugar crust",
    descRu: "Классический французский десерт с карамелизированной сахарной корочкой",
    price: 32000,
    category: "desserts",
    // Creme brulee
    image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=400&q=80",
    tags: ["popular"],
    weight: "160g",
    calories: 380,
  },
  {
    id: 25,
    nameUz: "Malinalı Krem Tort",
    nameEn: "Raspberry Cream Cake",
    nameRu: "Торт с малиной и кремом",
    descUz: "Qatlamli krem va yangi malina bilan tayyorlangan premium tort",
    descEn: "Layered cream cake with fresh raspberries and vanilla cream",
    descRu: "Слоёный торт со свежей малиной и ванильным кремом",
    price: 45000,
    category: "desserts",
    image: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=400&q=80",
    tags: ["popular", "chef", "new"],
    weight: "200g",
    calories: 450,
  },

  // ===== MAXSUS ICHIMLIKLAR VA QAHVA =====
  {
    id: 21,
    nameUz: "Royal Cocktail",
    nameEn: "Royal Cocktail",
    nameRu: "Королевский коктейль",
    descUz: "Oltin angur, limonchello va sharbat aralashmasi",
    descEn: "Golden grape, limoncello and juice blend",
    descRu: "Смесь золотого винограда, лимончелло и сока",
    price: 42000,
    category: "drinks",
    // Cocktail with golden color
    image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=400&q=80",
    tags: ["popular", "new"],
    weight: "300ml",
  },
  {
    id: 22,
    nameUz: "Smoke Mojito",
    nameEn: "Smoke Mojito",
    nameRu: "Дымный Мохито",
    descUz: "Tutun effekti bilan tayyorlangan premium mojito",
    descEn: "Premium mojito prepared with smoke effect",
    descRu: "Премиальный мохито с эффектом дыма",
    price: 38000,
    category: "drinks",
    // Mojito / mint cocktail
    image: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=400&q=80",
    tags: ["new"],
    weight: "280ml",
  },

  // ===== QAHVA VA CHOY =====
  {
    id: 23,
    nameUz: "Truffel Cappuccino",
    nameEn: "Truffle Cappuccino",
    nameRu: "Трюфельное капучино",
    descUz: "Arabika kofe, qora truffel va sut ko'pigi bilan",
    descEn: "Arabica coffee with black truffle and milk foam",
    descRu: "Кофе арабика с чёрным трюфелем и молочной пеной",
    price: 25000,
    category: "drinks",
    // Cappuccino with latte art
    image: "https://images.unsplash.com/photo-1572442388796-11668a67e53d?auto=format&fit=crop&w=400&q=80",
    tags: ["popular", "new"],
    weight: "200ml",
  },
  {
    id: 24,
    nameUz: "Royal Tea Seti",
    nameEn: "Royal Tea Set",
    nameRu: "Королевский чайный сет",
    descUz: "Premium Darjeeling choy, limon va asallik bilan",
    descEn: "Premium Darjeeling tea with lemon and honey",
    descRu: "Премиальный чай Дарджилинг с лимоном и мёдом",
    price: 22000,
    category: "drinks",
    // Tea set
    image: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=400&q=80",
    tags: [],
    weight: "300ml",
  },
];

export const branches = [
  { id: 1, name: "Toshkent — Amir Temur", address: "Amir Temur ko'chasi 25" },
  { id: 2, name: "Toshkent — Yunusobod", address: "Yunusobod tumani, 7-kvartal" },
  { id: 3, name: "Samarqand — Markaz", address: "Registon maydoni 3" },
  { id: 4, name: "Buxoro — Markaz", address: "Mustaqillik ko'chasi 12" },
  { id: 5, name: "Namangan — Markaz", address: "Al-Farg'oniy ko'chasi 8" },
  { id: 6, name: "Andijon — Markaz", address: "Bobur ko'chasi 15" },
  { id: 7, name: "Farg'ona — Markaz", address: "Mustaqillik ko'chasi 20" },
];
