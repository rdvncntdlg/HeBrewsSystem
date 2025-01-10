import 'package:he_brew_app/models/favorite_model.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';

class FavoriteService {
  final String baseUrl = 'http://10.0.2.2:3000'; // Replace with your API base URL

  // Fetch user profile to get customer_id
  Future<Map<String, dynamic>> fetchProfile(String token) async {
    final response = await http.get(
      Uri.parse('$baseUrl/profile'),
      headers: {'Authorization': 'Bearer $token'},
    );

    if (response.statusCode == 200) {
      return json.decode(response.body);
    } else {
      throw Exception('Failed to fetch profile: ${response.reasonPhrase}');
    }
  }

  // Fetch user's favorite products
  Future<List<Favorite>> fetchFavorites(String customerId, String token) async {
    final response = await http.get(
      Uri.parse('$baseUrl/customers/$customerId/favorites'),
      headers: {'Authorization': 'Bearer $token'},
    );

    if (response.statusCode == 200) {
      final List<dynamic> data = json.decode(response.body);
      return data.map((json) => Favorite.fromJson(json)).toList();
    } else {
      throw Exception('Failed to fetch favorites: ${response.reasonPhrase}');
    }
  }

  // Add a product to favorites
  Future<void> addFavorite(String customerId, Favorite favorite, String token) async {
    final response = await http.post(
      Uri.parse('$baseUrl/customers/$customerId/favorites'),
      headers: {
        'Authorization': 'Bearer $token',
        'Content-Type': 'application/json',
      },
      body: json.encode({'menu_id': favorite.menu_id}),
    );

    if (response.statusCode != 200) {
      throw Exception('Failed to add favorite: ${response.reasonPhrase}');
    }
  }

  // Remove a product from favorites
  Future<void> removeFavorite(String customerId, Favorite favorite, String token) async {
    final response = await http.delete(
      Uri.parse('$baseUrl/customers/$customerId/favorites/${favorite.menu_id}'),
      headers: {'Authorization': 'Bearer $token'},
    );

    if (response.statusCode != 200) {
      throw Exception('Failed to remove favorite: ${response.reasonPhrase}');
    }
  }
}
