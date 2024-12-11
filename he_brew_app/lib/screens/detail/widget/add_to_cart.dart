import 'package:flutter/material.dart';
import 'package:he_brew_app/theme.dart';
import 'package:he_brew_app/models/product_model.dart';
import 'package:he_brew_app/provider/add_to_cart_provider.dart';
import 'package:he_brew_app/screens/detail/widget/custom_snackbar.dart';

class AddToCart extends StatefulWidget {
  final Product product;
  final String token; // Add token as a parameter
  final Future<void> Function() onAddToOrder; // Add the callback parameter

  const AddToCart({
    super.key,
    required this.product,
    required this.token,
    required this.onAddToOrder, // Pass callback here
  });

  @override
  State<AddToCart> createState() => _AddToCartState();
}

class _AddToCartState extends State<AddToCart> {
  @override
  Widget build(BuildContext context) {
    CartProvider.of(context);

    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 15),
      child: Container(
        height: 85,
        alignment: Alignment.center,
        child: Row(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Expanded(
              child: GestureDetector(
                onTap: () async {
                  // Call the onAddToOrder callback to add the item to the order
                  await widget.onAddToOrder(); // Trigger the callback

                  // Optionally show a snackbar for feedback
                  showCustomSnackbar(context, "Successfully Added");
                },
                child: Container(
                  height: 55,
                  decoration: BoxDecoration(
                    color: primaryColor,
                    borderRadius: BorderRadius.circular(50),
                  ),
                  alignment: Alignment.center,
                  child: const Text(
                    "Add to Cart",
                    style: TextStyle(
                      fontFamily: 'Poppins',
                      color: Colors.white,
                      fontWeight: FontWeight.bold,
                      fontSize: 20,
                    ),
                  ),
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
