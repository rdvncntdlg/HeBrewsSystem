import 'package:flutter/material.dart';
import 'package:he_brew_app/provider/add_to_cart_provider.dart';
import 'package:he_brew_app/screens/cart/carts_screen.dart';
import 'package:he_brew_app/screens/cart/payment_screen.dart';
import 'package:he_brew_app/screens/cart/selection_screen.dart';
import 'package:he_brew_app/theme.dart';
import 'package:provider/provider.dart';
import 'package:he_brew_app/models/branch_model.dart';

class CheckOutBox extends StatefulWidget {
  final Branch selectedBranch; // Add selectedBranch as a parameter

  const CheckOutBox({super.key, required this.selectedBranch});

  @override
  _CheckOutBoxState createState() => _CheckOutBoxState();
}

class _CheckOutBoxState extends State<CheckOutBox> {
  @override
  Widget build(BuildContext context) {
    final provider = Provider.of<CartProvider>(context, listen: true);
    final isCartEmpty = provider.cart.isEmpty;
    final totalPrice = provider.totalPrice; // Extract the total price

    return Container(
      height: 300,
      margin: const EdgeInsets.only(bottom: 20),
      width: double.infinity,
      decoration: const BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.only(
          topRight: Radius.circular(12),
          bottomLeft: Radius.circular(12),
        ),
      ),
      padding: const EdgeInsets.all(20),
      child: Column(
        children: [
          const SizedBox(height: 30),
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              const Text(
                "SubTotal",
                style: TextStyle(
                  fontFamily: 'Poppins',
                  fontWeight: FontWeight.bold,
                  color: Colors.grey,
                  fontSize: 16,
                ),
              ),
              Text(
                "₱${totalPrice.toStringAsFixed(2)}",
                style: const TextStyle(
                  fontFamily: 'Poppins',
                  fontWeight: FontWeight.bold,
                  fontSize: 16,
                ),
              )
            ],
          ),
          const SizedBox(height: 10),
          const Divider(),
          const SizedBox(height: 10),
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              const Text(
                "Total",
                style: TextStyle(
                  fontFamily: 'Poppins',
                  fontWeight: FontWeight.bold,
                  fontSize: 18,
                ),
              ),
              Text(
                "₱${totalPrice.toStringAsFixed(2)}",
                style: const TextStyle(
                  fontFamily: 'Poppins',
                  fontWeight: FontWeight.bold,
                  fontSize: 18,
                ),
              )
            ],
          ),
          const SizedBox(height: 20),
          ElevatedButton(
            style: ElevatedButton.styleFrom(
              backgroundColor: primaryColor,
              minimumSize: const Size(double.infinity, 55),
            ),
            onPressed: isCartEmpty
                ? null
                : () {
                    Navigator.push(
                      context,
                      MaterialPageRoute(
                        builder: (context) => SelectionScreen(
                          totalPrice: totalPrice,
                          selectedBranch: widget.selectedBranch,
                        ),
                      ),
                    );
                  },
            child: const Text(
              "Proceed to Checkout",
              style: TextStyle(
                fontFamily: 'Poppins',
                fontWeight: FontWeight.bold,
                fontSize: 16,
                color: Colors.white,
              ),
            ),
          ),
        ],
      ),
    );
  }
}
