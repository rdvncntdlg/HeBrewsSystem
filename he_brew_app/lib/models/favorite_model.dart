class Favorite {
  final String menu_id;
  final String name;
  final double price;
  final String image;
  final String category;

  Favorite({required this.menu_id, required this.name, required this.price, required this.image, required this.category});

  factory Favorite.fromJson(Map<String, dynamic> json) {
    return Favorite(
      menu_id: json['menu_id'],
      name: json['itemname'],
      price: double.tryParse(json['price'] as String) ?? 0.0,
      image: json['imageurl'],
      category: json['categoryname'],
    );
  }

  @override
  bool operator ==(Object other) {
    if (identical(this, other)) return true;
    if (other is! Favorite) return false;
    return other.menu_id == menu_id;
  }

  @override
  int get hashCode => menu_id.hashCode;
}
