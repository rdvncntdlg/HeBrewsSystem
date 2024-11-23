import 'package:flutter/material.dart';
import 'package:he_brew_app/provider/add_to_cart_provider.dart';
import 'package:he_brew_app/screens/cart/order_success.dart';
import 'package:he_brew_app/event_handler.dart';
import 'package:he_brew_app/theme.dart';
import 'package:provider/provider.dart';

class CheckOutBox extends StatefulWidget {
  const CheckOutBox({super.key});

  @override
  _CheckOutBoxState createState() => _CheckOutBoxState();
}

class _CheckOutBoxState extends State<CheckOutBox> with PaymongoEventHandler {
  @override
  Widget build(BuildContext context) {
    final provider = Provider.of<CartProvider>(context, listen: true);
    final isCartEmpty = provider.cart.isEmpty;

    return Container(
      height: 300,
      margin: const EdgeInsets.only(bottom: 20),
      width: double.infinity,
      decoration: const BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.only(
          topRight: Radius.circular(30),
          bottomLeft: Radius.circular(30),
        ),
      ),
      padding: const EdgeInsets.all(20),
      child: Column(
        children: [
          const Center(
            child: Text(
              "Summary",
              style: TextStyle(
                fontFamily: 'Poppins',
                fontWeight: FontWeight.bold,
                fontSize: 24,
              ),
            ),
          ),
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
                "₱${provider.totalPrice.toStringAsFixed(2)}",
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
                "₱${provider.totalPrice.toStringAsFixed(2)}",
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
                : () async {
                    bool proceedToPayment = false;
                    await showDialog(
                      context: context,
                      builder: (context) => AlertDialog(
                        title: const Text('Confirm Order'),
                        content: const Text(
                            'Are you sure you want to place this order?'),
                        actions: [
                          TextButton(
                            onPressed: () {
                              Navigator.pop(context, false);
                            },
                            child: const Text('No'),
                          ),
                          TextButton(
                            onPressed: () {
                              proceedToPayment = true;
                              Navigator.pop(context, true); // Close the dialog
                            },
                            child: const Text('Yes'),
                          ),
                        ],
                      ),
                    );

                    if (proceedToPayment) {
                      await gcashPayment(provider.cart); // Call gcashPayment with the cart items
                      provider.emptyCart();

                      // Generate a random order number for the example
                      final orderNumber =
                          DateTime.now().millisecondsSinceEpoch.toString();

                      Navigator.push(
                        context,
                        MaterialPageRoute(
                          builder: (context) =>
                              OrderSuccessScreen(orderNumber: orderNumber),
                        ),
                      );
                    }
                  },
            child: const Text(
              "Proceed to Order",
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
