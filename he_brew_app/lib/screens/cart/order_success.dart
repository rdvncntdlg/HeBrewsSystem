import 'package:flutter/material.dart';

class OrderSuccessScreen extends StatelessWidget {
  const OrderSuccessScreen({super.key, required this.orderNumber});

  final String orderNumber;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Padding(
          padding: const EdgeInsets.all(20.0),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              const Icon(
                Icons.check_circle,
                color: Color.fromARGB(255, 12, 12, 12),
                size: 100,
              ),
              const SizedBox(height: 30),
              const Text(
                "Order Success",
                style: TextStyle(
                  fontFamily: 'Poppins',
                  fontWeight: FontWeight.bold,
                  fontSize: 24,
                ),
              ),
              const SizedBox(height: 10),
              Text(
                "Your Order Number: $orderNumber",
                style: const TextStyle(
                  fontFamily: 'Poppins',
                  fontSize: 18,
                ),
              ),
              const SizedBox(height: 30),
              ElevatedButton(
            onPressed: () {
              Navigator.pushReplacementNamed(
                                  context,
                                  '/home',
                                );
            },
            style: ButtonStyle(
              backgroundColor: WidgetStateProperty.all<Color>(Colors.black),
              minimumSize: WidgetStateProperty.all<Size>(const Size(50, 60)),
            ),
            child: const Text(
              'OKAY',
              style: TextStyle(
                fontFamily: 'Poppins',
                fontWeight: FontWeight.bold,
                fontSize: 18,
                color: Colors.white,
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
