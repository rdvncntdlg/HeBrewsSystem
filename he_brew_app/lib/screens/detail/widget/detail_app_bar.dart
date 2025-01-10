import 'package:flutter/material.dart';
import 'package:he_brew_app/models/product_model.dart';
import 'package:he_brew_app/models/favorite_model.dart';
import 'package:he_brew_app/provider/favorite_provider.dart';

class DetailAppBar extends StatelessWidget {
  final Product product;
  final String token;  // Token passed to the widget

  const DetailAppBar({super.key, required this.product, required this.token});

  @override
  Widget build(BuildContext context) {
    final provider = FavoriteProvider.of(context);  // Access the FavoriteProvider
    final favorite = Favorite(
      menu_id: product.menu_id,
      name: product.name,
      price: product.price,
      image: product.image,
      category: product.category,
    );  // Convert product to Favorite

    if (token.isNotEmpty) {
      provider.initialize(token);
    }

    return Padding(
      padding: const EdgeInsets.all(10),
      child: Row(
        children: [
          IconButton(
            style: IconButton.styleFrom(
              backgroundColor: Colors.white,
              padding: const EdgeInsets.all(15),
            ),
            onPressed: () {
              Navigator.pop(context);  // Go back to the previous screen
            },
            icon: const Icon(Icons.arrow_back_ios),
          ),
          const Spacer(),
          IconButton(
            style: IconButton.styleFrom(
              backgroundColor: Colors.white,
              padding: const EdgeInsets.all(15),
            ),
            onPressed: () {
              // Ensure the token is not null before calling toggleFavorite
              if (token.isNotEmpty) {
                if (provider.isFavorite(favorite)) {
                  provider.removeFavorite(favorite, token);  // Remove from favorites
                } else {
                  provider.addFavorite(favorite, token);  // Add to favorites
                }
              } else {
                print('Token is null or empty');  // Handle the case where token is invalid
              }
            },
            icon: Icon(
              provider.isFavorite(favorite) ? Icons.favorite : Icons.favorite_border,
              color: Colors.black,
              size: 25,
            ),
          ),
        ],
      ),
    );
  }
}
