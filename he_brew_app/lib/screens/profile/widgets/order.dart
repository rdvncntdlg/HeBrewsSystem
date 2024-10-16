import 'package:flutter/material.dart';

class OrderScreen extends StatelessWidget {
  const OrderScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('My Orders'),
      ),
      body: ListView(
        padding: const EdgeInsets.all(16.0),
        children: [
          _buildOrderTile(
            orderId: 'Order #12345',
            totalAmount: '\$100.00',
            onCancel: () {
              _handleCancelOrder(context, 'Order #12345');
            },
          ),
          const SizedBox(height: 16),
          _buildOrderTile(
            orderId: 'Order #67890',
            totalAmount: '\$50.00',
            onCancel: () {
              _handleCancelOrder(context, 'Order #67890');
            },
          ),
        ],
      ),
    );
  }

  Widget _buildOrderTile({
    required String orderId,
    required String totalAmount,
    required VoidCallback onCancel,
  }) {
    return ListTile(
      title: Text(orderId),
      subtitle: Text('Total: $totalAmount'),
      trailing: ElevatedButton(
        onPressed: onCancel,
        style: ButtonStyle(
          backgroundColor: WidgetStateProperty.all<Color>(
              const Color.fromARGB(255, 0, 0, 0)),
          foregroundColor: WidgetStateProperty.all<Color>(Colors.white),
        ),
        child: const Text('Cancel'),
      ),
    );
  }

  void _handleCancelOrder(BuildContext context, String orderId) {
    showDialog(
      context: context,
      builder: (BuildContext context) {
        return AlertDialog(
          title: const Text('Cancel Order'),
          content: Text('Are you sure you want to cancel order: $orderId?'),
          actions: [
            TextButton(
              onPressed: () {
                _performCancelOrder(context, orderId);
              },
              style: ButtonStyle(
                backgroundColor: WidgetStateProperty.all<Color>(
                    const Color.fromARGB(255, 0, 0, 0)),
                foregroundColor: WidgetStateProperty.all<Color>(
                    const Color.fromARGB(255, 255, 255, 255)),
              ),
              child: const Text('Yes'),
            ),
            TextButton(
              onPressed: () {
                Navigator.pop(context);
              },
              style: ButtonStyle(
                backgroundColor: WidgetStateProperty.all<Color>(
                    const Color.fromARGB(255, 255, 255, 255)),
                foregroundColor: WidgetStateProperty.all<Color>(Colors.black),
              ),
              child: const Text('No'),
            ),
          ],
        );
      },
    );
  }

  void _performCancelOrder(BuildContext context, String orderId) {
    Navigator.pop(context);
  }
}
