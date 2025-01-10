import 'package:flutter/material.dart';
import 'package:he_brew_app/models/favorite_model.dart';
import 'package:he_brew_app/services/favorite_service.dart';
import 'package:provider/provider.dart';

class FavoriteProvider extends ChangeNotifier {
  final List<Favorite> _favorites = [];
  List<Favorite> get favorites => _favorites;

  final FavoriteService _favoriteService = FavoriteService();
  String? _customerId;

  String? get customerId => _customerId;

  // Initialize by fetching profile and favorites
  Future<void> initialize(String? token) async {
    if (token == null || token.isEmpty) {
      throw Exception('Token is null or empty');
    }

    try {
      final profile = await _favoriteService.fetchProfile(token);
      final user = profile['user'] as Map<String, dynamic>?;
      _customerId = user?['customer_id'];

      if (_customerId == null) {
        throw Exception('Customer ID is null');
      }

      final fetchedFavorites = await _favoriteService.fetchFavorites(_customerId!, token);
      _favorites.clear();
      _favorites.addAll(fetchedFavorites);

      notifyListeners();
    } catch (e) {
      rethrow;
    }
  }

  // Add a product to favorites
  Future<void> addFavorite(Favorite favorite, String token) async {
    if (_customerId == null) {
      throw Exception('User not authenticated');
    }

    try {
      await _favoriteService.addFavorite(_customerId!, favorite, token);
      _favorites.add(favorite);
      notifyListeners();
    } catch (e) {
      rethrow;
    }
  }

  // Remove a product from favorites
  Future<void> removeFavorite(Favorite favorite, String token) async {
    if (_customerId == null) {
      throw Exception('User not authenticated');
    }

    try {
      await _favoriteService.removeFavorite(_customerId!, favorite, token);
      _favorites.remove(favorite);
      notifyListeners();
    } catch (e) {
      rethrow;
    }
  }

  bool isFavorite(Favorite favorite) {
    return _favorites.contains(favorite);
  }

  static FavoriteProvider of(BuildContext context, {bool listen = true}) {
    return Provider.of<FavoriteProvider>(context, listen: listen);
  }
}
