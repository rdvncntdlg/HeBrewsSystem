class Product {
  final String title;
  final String description;
  final String image;
  final String review;
  final int price;
  final String category;
  final double rate;
  int quantity;

  Product({
    required this.title,
    required this.description,
    required this.image,
    required this.review,
    required this.price,
    required this.category,
    required this.rate,
    required this.quantity,
  });
}

final List<Product> bestSellers = [
  Product(
      title: "Iced Coffee",
      description:
          "Smooth, chilled coffee brewed to perfection and served over ice.",
      image: "images/iced_drinks/iced_coffee.png",
      review: " (329 Reviews)",
      price: 119,
      category: "Iced Drinks",
      rate: 4.9,
      quantity: 1),
  Product(
      title: "Caramel Macchiato",
      description:
          "Layers of espresso, cold milk, and caramel syrup, served over ice.",
      image: "images/iced_drinks/caramel_macchiato.png",
      review: " (256 Reviews)",
      price: 149,
      category: "Iced Drinks",
      rate: 4.8,
      quantity: 1),
  Product(
      title: "Mango Cheesecake",
      description: "A creamy milkshake blending mango and cheesecake flavors.",
      image: "images/milkshakes/mango_cheesecake.png",
      review: " (267 Reviews)",
      price: 149,
      category: "Milkshakes",
      rate: 4.7,
      quantity: 1),
  Product(
      title: "Green Apple",
      description: "A crisp and refreshing green apple flavored slush.",
      image: "images/fruit_slush/green_apple.png",
      review: " (286 Reviews)",
      price: 129,
      category: "Fruit Slush",
      rate: 4.8,
      quantity: 1),
  Product(
      title: "Blue Lychee",
      description:
          "A unique slush combining blue raspberry and lychee flavors.",
      image: "images/fruit_slush/blue_lychee.png",
      review: " (261 Reviews)",
      price: 129,
      category: "Fruit Slush",
      rate: 4.8,
      quantity: 1),
  Product(
      title: "Cordon Bleu",
      description:
          "A classic dish of breaded chicken stuffed with ham and cheese, served with rice.",
      image: "images/big_plates/cordon_bleu.png",
      review: " (365 Reviews)",
      price: 219,
      category: "Big Plates",
      rate: 4.9,
      quantity: 1),
  Product(
      title: "Chicken Wings",
      description: "Juicy and crispy chicken wings, served with rice.",
      image: "images/big_plates/chicken_wings.png",
      review: " (304 Reviews)",
      price: 219,
      category: "Big Plates",
      rate: 4.8,
      quantity: 1),
  Product(
      title: "Nachos",
      description:
          "Crispy tortilla chips topped with melted cheese, jalapeños, and salsa.",
      image: "images/snacks/nachos.png",
      review: " (442 Reviews)",
      price: 179,
      category: "Snacks",
      rate: 5.0,
      quantity: 1),
  Product(
      title: "Fries Overload",
      description: "Generous serving of fries loaded with cheese and toppings.",
      image: "images/snacks/fries_overload.png",
      review: " (305 Reviews)",
      price: 199,
      category: "Snacks",
      rate: 4.8,
      quantity: 1),
  Product(
      title: "He Brews Sandwich",
      description:
          "The restaurant's signature sandwich with a unique blend of ingredients.",
      image: "images/sandwiches/he_brews_sandwich.png",
      review: " (503 Reviews)",
      price: 199,
      category: "Sandwiches",
      rate: 5.0,
      quantity: 1),
];

final List<Product> icedDrinks = [
  Product(
      title: "Iced Americano",
      description:
          "A refreshing mix of rich espresso and cold water, served over ice.",
      image: "images/iced_drinks/iced_americano.png",
      review: " (101 Reviews)",
      price: 119,
      category: "Iced Drinks",
      rate: 4.6,
      quantity: 1),
  Product(
      title: "Iced Coffee",
      description:
          "Smooth, chilled coffee brewed to perfection and served over ice.",
      image: "images/iced_drinks/iced_coffee.png",
      review: " (329 Reviews)",
      price: 119,
      category: "Iced Drinks",
      rate: 4.9,
      quantity: 1),
  Product(
      title: "Iced Latte",
      description: "A creamy blend of espresso and cold milk, poured over ice.",
      image: "images/iced_drinks/iced_latte.png",
      review: " (153 Reviews)",
      price: 129,
      category: "Iced Drinks",
      rate: 4.5,
      quantity: 1),
  Product(
      title: "Iced Mocha",
      description:
          "Espresso mixed with cold milk and chocolate syrup, served over ice.",
      image: "images/iced_drinks/iced_mocha.png",
      review: " (312 Reviews)",
      price: 129,
      category: "Iced Drinks",
      rate: 4.9,
      quantity: 1),
  Product(
      title: "Caramel Macchiato",
      description:
          "Layers of espresso, cold milk, and caramel syrup, served over ice.",
      image: "images/iced_drinks/caramel_macchiato.png",
      review: " (256 Reviews)",
      price: 149,
      category: "Iced Drinks",
      rate: 4.8,
      quantity: 1),
];

final List<Product> milkShakes = [
  Product(
      title: "Mango Graham",
      description: "A creamy mango milkshake with a graham cracker crumble.",
      image: "images/milkshakes/mango_graham.png",
      review: " (275 Reviews)",
      price: 149,
      category: "Milkshakes",
      rate: 4.5,
      quantity: 1),
  Product(
      title: "Choco Mint",
      description: "A refreshing chocolate milkshake with a hint of mint.",
      image: "images/milkshakes/choco_mint.png",
      review: " (261 Reviews)",
      price: 149,
      category: "Milkshakes",
      rate: 4.0,
      quantity: 1),
  Product(
      title: "Matcha",
      description:
          " A smooth milkshake infused with the unique flavor of matcha green tea.",
      image: "images/milkshakes/matcha.png",
      review: " (230 Reviews)",
      price: 179,
      category: "Milkshakes",
      rate: 4.3,
      quantity: 1),
  Product(
      title: "Strawberry Cheesecake",
      description:
          "A rich milkshake combining strawberry and cheesecake flavors.",
      image: "images/milkshakes/strawberry_cheesecake.png",
      review: " (165 Reviews)",
      price: 149,
      category: "Milkshakes",
      rate: 4.4,
      quantity: 1),
  Product(
      title: "Mango Cheesecake",
      description: "A creamy milkshake blending mango and cheesecake flavors.",
      image: "images/milkshakes/mango_cheesecake.png",
      review: " (267 Reviews)",
      price: 149,
      category: "Milkshakes",
      rate: 4.7,
      quantity: 1),
  Product(
      title: "Blueberry Cheesecake",
      description:
          "A delightful mix of blueberry and cheesecake flavors in a milkshake.",
      image: "images/milkshakes/blueberry_cheesecake.png",
      review: " (257 Reviews)",
      price: 149,
      category: "Milkshakes",
      rate: 4.6,
      quantity: 1),
];

final List<Product> fruitSlush = [
  Product(
      title: "Lemon Cucumber",
      description: "A revitalizing slush made with lemon and cucumber flavors.",
      image: "images/fruit_slush/lemon_cucumber.png",
      review: " (126 Reviews)",
      price: 129,
      category: "Fruit Slush",
      rate: 4.5,
      quantity: 1),
  Product(
      title: "Honey Lemonade",
      description: "A sweet and tangy honey and lemon flavored slush.",
      image: "images/fruit_slush/honey_lemonade.png",
      review: " (187 Reviews)",
      price: 129,
      category: "Fruit Slush",
      rate: 4.3,
      quantity: 1),
  Product(
      title: "Passion Mango",
      description: "A tropical slush blending passion fruit and mango flavors.",
      image: "images/fruit_slush/passion_mango.png",
      review: " (99 Reviews)",
      price: 129,
      category: "Fruit Slush",
      rate: 3.9,
      quantity: 1),
  Product(
      title: "Green Apple",
      description: "A crisp and refreshing green apple flavored slush.",
      image: "images/fruit_slush/green_apple.png",
      review: " (286 Reviews)",
      price: 129,
      category: "Fruit Slush",
      rate: 4.8,
      quantity: 1),
  Product(
      title: "Blue Lychee",
      description:
          "A unique slush combining blue raspberry and lychee flavors.",
      image: "images/fruit_slush/blue_lychee.png",
      review: " (261 Reviews)",
      price: 129,
      category: "Fruit Slush",
      rate: 4.8,
      quantity: 1),
  Product(
      title: "Blueberry Yogurt",
      description: "A creamy slush with blueberry and yogurt flavors.",
      image: "images/fruit_slush/blueberry_yogurt.png",
      review: " (217 Reviews)",
      price: 139,
      category: "Fruit Slush",
      rate: 4.6,
      quantity: 1),
  Product(
      title: "Strawberry Yogurt",
      description: "A refreshing slush blending strawberry and yogurt flavors.",
      image: "images/fruit_slush/strawberry_yogurt.png",
      review: " (189 Reviews)",
      price: 139,
      category: "Fruit Slush",
      rate: 4.8,
      quantity: 1),
  Product(
      title: "Mango Yogurt",
      description: "A tropical slush combining mango and yogurt flavors.",
      image: "images/fruit_slush/mango_yogurt.png",
      review: " (285 Reviews)",
      price: 139,
      category: "Fruit Slush",
      rate: 4.4,
      quantity: 1),
];

final List<Product> icedTea = [
  Product(
      title: "Lemon Lychee",
      description: "A refreshing iced tea with lemon and lychee flavors.",
      image: "images/iced_tea/lemon_lychee.png",
      review: " (351 Reviews)",
      price: 119,
      category: "Iced Tea",
      rate: 4.3,
      quantity: 1),
  Product(
      title: "Pasion Fruit",
      description: "A tropical iced tea infused with passion fruit flavor.",
      image: "images/iced_tea/passion_fruit.png",
      review: " (253 Reviews)",
      price: 119,
      category: "Iced Tea",
      rate: 4.5,
      quantity: 1),
  Product(
      title: "Honey Mango",
      description: "A sweet iced tea combining honey and mango flavors.",
      image: "images/iced_tea/honey_mango.png",
      review: " (164 Reviews)",
      price: 119,
      category: "Iced Tea",
      rate: 4.2,
      quantity: 1),
];

final List<Product> bigPlates = [
  Product(
      title: "Cordon Bleu",
      description:
          " A classic dish of breaded chicken stuffed with ham and cheese, served with rice.",
      image: "images/big_plates/cordon_bleu.png",
      review: " (365 Reviews)",
      price: 219,
      category: "Big Plates",
      rate: 4.9,
      quantity: 1),
  Product(
      title: "Chicken Wings",
      description: "Juicy and crispy chicken wings, served with rice.",
      image: "images/big_plates/chicken_wings.png",
      review: " (304 Reviews)",
      price: 219,
      category: "Big Plates",
      rate: 4.8,
      quantity: 1),
  Product(
      title: "Beef Tapa",
      description: "Flavorful marinated beef strips, served with rice.",
      image: "images/big_plates/beef_tapa.png",
      review: " (201 Reviews)",
      price: 159,
      category: "Big Plates",
      rate: 4.3,
      quantity: 1),
  Product(
      title: "Burger Steak",
      description: "Savory beef patties in a rich gravy, served with rice.",
      image: "images/big_plates/burger_steak.png",
      review: " (261 Reviews)",
      price: 189,
      category: "Big Plates",
      rate: 4.6,
      quantity: 1),
  Product(
      title: "German Sausage",
      description:
          "Grilled German sausage with a side of sauerkraut, served with rice.",
      image: "images/big_plates/german_sausage.png",
      review: " (164 Reviews)",
      price: 179,
      category: "Big Plates",
      rate: 4.5,
      quantity: 1),
  Product(
      title: "BBQ Liempo",
      description: "Tender and smoky grilled pork belly, served with rice.",
      image: "images/big_plates/bbq_liempo.png",
      review: " (286 Reviews)",
      price: 179,
      category: "Big Plates",
      rate: 4.5,
      quantity: 1),
];

final List<Product> snacks = [
  Product(
      title: "Nachos",
      description:
          "Crispy tortilla chips topped with melted cheese, jalapeños, and salsa.",
      image: "images/snacks/nachos.png",
      review: " (442 Reviews)",
      price: 179,
      category: "Snacks",
      rate: 5.0,
      quantity: 1),
  Product(
      title: "Fries Overload",
      description: "Generous serving of fries loaded with cheese and toppings.",
      image: "images/snacks/fries_overload.png",
      review: " (305 Reviews)",
      price: 199,
      category: "Snacks",
      rate: 4.8,
      quantity: 1),
  Product(
      title: "Beef Quesadilla",
      description:
          "Grilled tortilla filled with seasoned beef and melted cheese.",
      image: "images/snacks/beef_quesadilla.png",
      review: " (245 Reviews)",
      price: 179,
      category: "Snacks",
      rate: 4.7,
      quantity: 1),
  Product(
      title: "Potato Wedges",
      description: "Thick-cut, crispy potato wedges.",
      image: "images/snacks/potato_wedges.png",
      review: " (210 Reviews)",
      price: 159,
      category: "Snacks",
      rate: 4.6,
      quantity: 1),
];

final List<Product> pasta = [
  Product(
      title: "Carbonara",
      description: "A creamy pasta dish with bacon and parmesan cheese.",
      image: "images/pasta/carbonara.png",
      review: " (205 Reviews)",
      price: 199,
      category: "Pasta",
      rate: 4.7,
      quantity: 1),
  Product(
      title: "Baked Macaroni",
      description: "Cheesy baked pasta with a savory meat sauce.",
      image: "images/pasta/baked_macaroni.png",
      review: " (201 Reviews)",
      price: 199,
      category: "Pasta",
      rate: 4.4,
      quantity: 1),
  Product(
      title: "Sausage Penne",
      description: "Penne pasta with a flavorful sausage and tomato sauce.",
      image: "images/pasta/sausage_penne.png",
      review: " (195 Reviews)",
      price: 189,
      category: "Pasta",
      rate: 4.4,
      quantity: 1),
  Product(
      title: "Tuna Pesto",
      description: "Pasta tossed in a fresh pesto sauce with chunks of tuna.",
      image: "images/pasta/tuna_pesto.png",
      review: " (239 Reviews)",
      price: 199,
      category: "Pasta",
      rate: 4.8,
      quantity: 1),
  Product(
      title: "Spanish Sardines",
      description: "Pasta with Spanish sardines, garlic, and olive oil.",
      image: "images/pasta/spanish_sardines.png",
      review: " (199 Reviews)",
      price: 179,
      category: "Pasta",
      rate: 4.5,
      quantity: 1),
];

final List<Product> sandwiches = [
  Product(
      title: "He Brews Sandwich",
      description:
          "The restaurant's signature sandwich with a unique blend of ingredients.",
      image: "images/sandwiches/he_brews_sandwich.png",
      review: " (503 Reviews)",
      price: 199,
      category: "Sandwiches",
      rate: 5.0,
      quantity: 1),
  Product(
      title: "Egg and Tuna",
      description: "A delicious sandwich filled with egg and tuna salad.",
      image: "images/sandwiches/egg_and_tuna.png",
      review: " (293 Reviews)",
      price: 179,
      category: "Sandwiches",
      rate: 4.8,
      quantity: 1),
  Product(
      title: "Tuna Applemelt",
      description:
          "A tasty sandwich with tuna, apple slices, and melted cheese.",
      image: "images/sandwiches/tuna_applemelt.png",
      review: " (254 Reviews)",
      price: 179,
      category: "Sandwiches",
      rate: 4.7,
      quantity: 1),
];
