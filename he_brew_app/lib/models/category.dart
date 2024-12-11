class Category {
  final String title;
  final String image;
  final double size;

  Category({required this.title, required this.image, required this.size});
}

final List<Category> categoriesList = [
  Category(title: "Best Sellers", image: "images/best_seller.jpg", size: 16),
  Category(title: "Iced Drinks", image: "images/iced_drinks.jpg", size: 16),
  Category(title: "Milkshakes", image: "images/milkshakes.jpg", size: 16),
  Category(title: "Fruit Slush", image: "images/fruit_slush.jpg", size: 16),
  Category(title: "Iced Tea", image: "images/iced_tea.jpg", size: 16),
  Category(title: "Big Plates", image: "images/big_plates.jpg", size: 16),
  Category(title: "Snacks", image: "images/snacks.png", size: 16),
  Category(title: "Pasta", image: "images/pasta.jpg", size: 16),
  Category(title: "Sandwiches", image: "images/sandwiches.jpg", size: 16),
];
