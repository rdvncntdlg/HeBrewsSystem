import 'package:flutter/material.dart';
import 'package:lottie/lottie.dart';
import 'package:he_brew_app/screens/home/home_screen.dart'; // Import HomeScreen
import 'package:he_brew_app/models/branch_model.dart'; // Import Branch model

class OrderSuccessScreen extends StatelessWidget {
  final String orderNumber; // Pass the order number or ID
  final String orderType; // Add this parameter to display the order type
  final Branch selectedBranch; // Pass the selected branch

  const OrderSuccessScreen({
    Key? key,
    required this.orderNumber,
    required this.orderType,
    required this.selectedBranch,
  }) : super(key: key);

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
              Text(
                "Your order has been placed successfully.",
                style: const TextStyle(
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
                "Order Number: $orderNumber",
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
                "Order Type: $orderType",
                style: const TextStyle(
                  fontSize: 16,
                  fontWeight: FontWeight.bold,
                  fontFamily: 'Poppins',
                  color: Colors.black87, // Adjusted to ensure visibility
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
                      builder: (context) => HomeScreen(selectedBranch: selectedBranch),
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
          ),
        ),
      ),
    );
  }
}