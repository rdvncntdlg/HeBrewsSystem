class Product {
  final int menu_id;
  final String name;
  final String description;
  final String image;
  final double price;
  final String category;
  int quantity;

  Product({
    required this.menu_id,
    required this.name,
    required this.description,
    required this.image,
    required this.price,
    required this.category,
    required this.quantity,
  });

  // fromJson method to parse a JSON object into a Product
  factory Product.fromJson(Map<String, dynamic> json) {
    return Product(
      menu_id: json['menu_id'],         // Map 'menu_id' from JSON
      name: json['name'],               // Map 'name' from JSON
      description: json['description'], // Map 'description' from JSON
      image: json['image'],             // Map 'image' from JSON
      price: json['price'].toDouble(),  // Map 'price' and ensure it's a double
      category: json['category'],       // Map 'category' from JSON
      quantity: json['quantity'],       // Map 'quantity' from JSON
    );
  }

  // toJson method to convert a Product object to JSON
  Map<String, dynamic> toJson() {
    return {
      'menu_id': menu_id,
      'name': name,
      'description': description,
      'image': image,
      'price': price,
      'category': category,
      'quantity': quantity,
    };
  }
}
