import 'package:flutter/material.dart';
import 'package:he_brew_app/models/product_model.dart';
import 'package:he_brew_app/provider/favorite_provider.dart';

class DetailAppBar extends StatelessWidget {
  final Product product;
  final String token;  // Token passed to the widget

  const DetailAppBar({super.key, required this.product, required this.token});

  @override
  Widget build(BuildContext context) {
    final provider = FavoriteProvider.of(context);  // Access the FavoriteProvider
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
              // Print the token value for debugging
              print('Token value: $token');  // Debug print

              // Ensure the token is not null before calling toggleFavorite
              if (token.isNotEmpty) {
                provider.toggleFavorite(product, token);  // Toggle favorite with the token
              } else {
                print('Token is null or empty');  // Handle the case where token is invalid
              }
            },
            icon: Icon(
              provider.isFavorite(product) ? Icons.favorite : Icons.favorite_border,
              color: Colors.black,
              size: 25,
            ),
          ),
        ],
      ),
    );
  }
}