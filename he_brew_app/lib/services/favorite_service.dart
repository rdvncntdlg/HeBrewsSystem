import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:he_brew_app/models/product_model.dart';

class FavoriteService {
  final String _baseUrl = 'https://hebrewssystem.onrender.com';

  // Fetch user profile to get customer_id
  Future<Map<String, dynamic>> fetchProfile(String token) async {
    final response = await http.get(
      Uri.parse('$_baseUrl/profile'),
      headers: {
        'Authorization': 'Bearer $token',
      },
    );

    if (response.statusCode == 200) {
      final decodedResponse = jsonDecode(response.body);
      if (decodedResponse is Map<String, dynamic>) {
        return decodedResponse;
      } else {
        throw Exception('Unexpected response format');
      }
    } else {
      throw Exception('Failed to fetch profile');
    }
  }

  // Add a product to the favorites
  Future<void> addFavorite(int customerId, Product product, String token) async {
    final response = await http.post(
      Uri.parse('$_baseUrl/favorites'),
      headers: {
        'Authorization': 'Bearer $token',
        'Content-Type': 'application/json',
      },
      body: jsonEncode({
        'customer_id': customerId,
        'product_id': product.menu_id, // Ensure you pass the correct product ID here
      }),
    );

    if (response.statusCode != 201) {
      throw Exception('Failed to add favorite');
    }
  }

  // Remove a product from the favorites
  Future<void> removeFavorite(int customerId, Product product, String token) async {
    final response = await http.delete(
      Uri.parse('$_baseUrl/favorites'),
      headers: {
        'Authorization': 'Bearer $token',
        'Content-Type': 'application/json',
      },
      body: jsonEncode({
        'customer_id': customerId,
        'product_id': product.menu_id, // Use product's menu_id or ID as appropriate
      }),
    );

    if (response.statusCode != 200) {
      throw Exception('Failed to remove favorite');
    }
  }

  // Fetch all favorite products for a customer
  Future<List<Product>> fetchFavorites(int customerId, String token) async {
    final response = await http.get(
      Uri.parse('$_baseUrl/favorites/$customerId'),
      headers: {
        'Authorization': 'Bearer $token',
      },
    );

    if (response.statusCode == 200) {
      final List<dynamic> favoriteList = jsonDecode(response.body);
      return favoriteList.map((item) => Product.fromJson(item)).toList();
    } else {
      throw Exception('Failed to fetch favorites');
    }
  }
}
