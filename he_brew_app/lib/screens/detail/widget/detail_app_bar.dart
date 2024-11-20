import 'package:flutter/material.dart';
import 'package:he_brew_app/models/product_model.dart';
import 'package:he_brew_app/provider/favorite_provider.dart';

class DetailAppBar extends StatelessWidget {
  final Product product;
  final String token;  // Add the token parameter

  const DetailAppBar({super.key, required this.product, required this.token});

  @override
  Widget build(BuildContext context) {
    final provider = FavoriteProvider.of(context);
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
              Navigator.pop(context);
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
              // Use the token in your toggleFavorite method
              provider.toggleFavorite(product, token);
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
