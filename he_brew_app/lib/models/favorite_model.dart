import 'package:he_brew_app/models/product_model.dart';

class Favorite {
  final String menu_id;
  final String name;
  final String description;
  final double price;
  final String image;
  final String category;
  int quantity;

  Favorite({
    required this.menu_id,
    required this.name,
    required this.description,
    required this.price,
    required this.image,
    required this.category,
    required this.quantity,
  });

  factory Favorite.fromJson(Map<String, dynamic> json) {
    return Favorite(
      menu_id: json['menu_id'],
      name: json['itemname'],
      description: json['description'],
      price: double.tryParse(json['price'] as String) ?? 0.0,
      image: json['imageurl'],
      category: json['categoryname'],
      quantity: json.containsKey('quantity') ? json['quantity'] : 1,
    );
  }

  // Conversion method
  Product toProduct() {
    return Product(
      menu_id: menu_id,
      name: name,
      description: description,
      image: image,
      price: price,
      category: category,
      quantity: quantity,
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
