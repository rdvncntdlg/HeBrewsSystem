import 'package:flutter/material.dart';
import 'package:he_brew_app/provider/add_to_cart_provider.dart';
import 'package:he_brew_app/provider/customer_provider.dart';
import 'package:lottie/lottie.dart';
import 'package:he_brew_app/screens/nav_bar.dart';
import 'package:he_brew_app/models/branch_model.dart'; // Import Branch model
import 'package:http/http.dart' as http;
import 'dart:convert';

import 'package:provider/provider.dart';

class OrderSuccessScreen extends StatefulWidget {
  final String orderNumber;
  final String orderType; // Add this parameter to display the order type
  final Branch selectedBranch; // Pass the selected branch
  final double totalPrice;

  const OrderSuccessScreen({
    super.key,
    required this.orderNumber,
    required this.orderType,
    required this.selectedBranch,
    required this.totalPrice,
  });

  @override
  _OrderSuccessScreenState createState() => _OrderSuccessScreenState();
}

class _OrderSuccessScreenState extends State<OrderSuccessScreen> {
  bool isLoading = false;

  Future<void> sendOrder(String orderNumber, String orderType, String selectedBranch, final cartItems, final userProvider, final cartProvider) async {
    const String url = 'http://10.0.2.2:3000/customer/orders'; // Replace <YOUR_IP_ADDRESS> with your machine's IP

    try {
      setState(() {
        isLoading = true;
      });

      final response = await http.post(
        Uri.parse(url),
        headers: {"Content-Type": "application/json"},
        body: jsonEncode({
          "orderNumber": orderNumber,
          "orderType": orderType,
          "selectedBranch": selectedBranch,
          "cartItems": cartItems,
          "customerId": userProvider.customerId,
          "totalPrice": cartProvider.totalPrice,
        }),
      );

      if (response.statusCode == 201) {
        CartProvider.of(context, listen: false).emptyCart();
        return;
      } else {
        print('Failed to place order. Error: ${response.body}');
      }
    } catch (e) {
      print('An error occurred: $e');
    } finally {
      setState(() {
        isLoading = false;
      });
    }
  }

@override
void initState() {
  super.initState();
  
  WidgetsBinding.instance.addPostFrameCallback((_) {
    final cartProvider = Provider.of<CartProvider>(context, listen: false);
    final userProvider = Provider.of<UserProvider>(context, listen: false);
    final cartItems = cartProvider.cart.map((product) {
      return {
        "menu_id": product.menu_id,  // Assuming this is the unique ID for the product
        "quantity": product.quantity,
        "price": product.price,
      };
    }).toList();

    sendOrder(
      widget.orderNumber,
      widget.orderType,
      widget.selectedBranch.branch_id,
      cartItems,
      userProvider,
      cartProvider,
    );
  });
}

  @override
  Widget build(BuildContext context) {
    double screenWidth = MediaQuery.of(context).size.width;

    return Scaffold(
      backgroundColor: Colors.white,
      body: Center(
        child: Padding(
          padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 40),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              if (isLoading)
                const CircularProgressIndicator()
              else ...[
                // Success Animation
                SizedBox(
                  height: 150,
                  width: 150,
                  child: Lottie.asset('animations/Animation_success.lottie'), // Ensure the file exists
                ),
                const SizedBox(height: 20),

                // Success Message
                Text(
                  "Order Successful!",
                  style: TextStyle(
                    fontSize: screenWidth * 0.06,
                    fontWeight: FontWeight.bold,
                    fontFamily: 'Poppins',
                    color: Colors.green,
                  ),
                  textAlign: TextAlign.center,
                ),
                const SizedBox(height: 10),
                const Text(
                  "Your order has been placed successfully.",
                  style: TextStyle(
                    fontSize: 16,
                    fontWeight: FontWeight.normal,
                    fontFamily: 'Poppins',
                    color: Colors.black87,
                  ),
                  textAlign: TextAlign.center,
                ),
                const SizedBox(height: 20),

                // Order Number and Type
                Text(
                  "Order Number: ${widget.orderNumber}",
                  style: const TextStyle(
                    fontSize: 16,
                    fontWeight: FontWeight.bold,
                    fontFamily: 'Poppins',
                    color: Colors.black,
                  ),
                  textAlign: TextAlign.center,
                ),
                const SizedBox(height: 10),
                Text(
                  "Order Type: ${widget.orderType}",
                  style: const TextStyle(
                    fontSize: 16,
                    fontWeight: FontWeight.bold,
                    fontFamily: 'Poppins',
                    color: Colors.black87,
                  ),
                  textAlign: TextAlign.center,
                ),
                const SizedBox(height: 40),

                // Action Button
                ElevatedButton(
                  style: ElevatedButton.styleFrom(
                    backgroundColor: const Color.fromARGB(255, 67, 69, 49),
                    padding: const EdgeInsets.symmetric(vertical: 15, horizontal: 40),
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(10),
                    ),
                  ),
                  onPressed: () {
                    Navigator.pushReplacement(
                      context,
                      MaterialPageRoute(
                        builder: (context) => BottomHomeNavBar(selectedBranch: widget.selectedBranch),
                      ),
                    );
                  },
                  child: const Text(
                    "Continue Shopping",
                    style: TextStyle(
                      fontFamily: 'Poppins',
                      fontWeight: FontWeight.bold,
                      fontSize: 16,
                    ),
                  ),
                ),
              ],
            ],
          ),
        ),
      ),
    );
  }
}
