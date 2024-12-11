import 'dart:convert';
import 'package:he_brew_app/models/category.dart';
import 'package:http/http.dart' as http;

class CategoryService {
  Future<List<Category>> fetchCategories() async {
    final response = await http.get(
        Uri.parse('https://hebrewscafeserver.onrender.com/api/categories'));

    if (response.statusCode == 200) {
      List<Category> categories = (json.decode(response.body) as List)
          .map((data) => Category.fromJson(data))
          .toList();
      return categories;
    } else {
      throw Exception('Failed to load categories');
    }
  }
}
