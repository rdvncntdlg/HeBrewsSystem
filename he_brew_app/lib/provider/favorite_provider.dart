import 'package:flutter/material.dart';
import 'package:he_brew_app/models/product_model.dart';
import 'package:he_brew_app/services/favorite_service.dart';
import 'package:provider/provider.dart';

class FavoriteProvider extends ChangeNotifier {
  final List<Product> _favorites = [];
  List<Product> get favorites => _favorites;

  final FavoriteService _favoriteService = FavoriteService();
  int? _customerId;

  int? get customerId => _customerId;

  // Initialize by fetching profile and favorites
Future<void> initialize(String token) async {
  if (token.isEmpty) {
    throw Exception('Token is empty');
  }

  try {
    final profile = await _favoriteService.fetchProfile(token);

    if (profile.containsKey('user')) {
      final user = profile['user'];
      if (user is Map<String, dynamic> && user.containsKey('customer_id')) {
        _customerId = user['customer_id'];
      } else {
        throw Exception('Invalid profile structure: Missing "customer_id"');
      }
    } else {
      throw Exception('Profile does not contain "user" key');
    }

    if (_customerId != null) {
      final fetchedFavorites = await _favoriteService.fetchFavorites(_customerId!, token);
      _favorites.clear();
      _favorites.addAll(fetchedFavorites);
    }

    notifyListeners();
  } catch (e) {
    throw Exception('Error initializing favorites: $e');
  }
}

  // Toggle favorite
  Future<void> toggleFavorite(Product product, String token) async {
    if (customerId == null) throw Exception('User not authenticated');

    try {
      if (isFavorite(product)) {
        await _favoriteService.removeFavorite(_customerId!, product, token);
        _favorites.remove(product);
      } else {
        await _favoriteService.addFavorite(_customerId!, product, token);
        _favorites.add(product);
      }
      notifyListeners();
    } catch (e) {
      throw Exception('Error toggling favorite: $e');
    }
  }

  // Check if a product is a favorite
  bool isFavorite(Product product) {
    return _favorites.contains(product);
  }

  // Add the 'of' method here for easier access to the provider in widgets
  static FavoriteProvider of(BuildContext context, {bool listen = true}) {
    return Provider.of<FavoriteProvider>(context, listen: listen);
  }
}
