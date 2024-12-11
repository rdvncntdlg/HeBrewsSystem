class Category {
  final String id;
  final String title;

  Category({required this.id, required this.title});

  factory Category.fromJson(Map<String, dynamic> json) {
    return Category(
      id: json['category_id'].toString(), // Ensure the id is a string
      title: json['categoryname'],
    );
  }
}
