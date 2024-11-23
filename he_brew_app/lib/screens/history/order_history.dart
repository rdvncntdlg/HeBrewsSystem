import 'package:flutter/material.dart';
import 'package:he_brew_app/models/order_item.dart';
class HistoryScreen extends StatefulWidget {
  const HistoryScreen({super.key});

  @override
  _HistoryScreenState createState() => _HistoryScreenState();
}

class _HistoryScreenState extends State<HistoryScreen> {
  // A list of sample orders
  final List<OrderItem> orders = [
    OrderItem(orderNumber: 'ORD123', orderDetails: 'Coffee, Sandwich', amount: 150.00, status: 'Pending'),
    OrderItem(orderNumber: 'ORD124', orderDetails: 'Tea, Bagel', amount: 120.00, status: 'Preparing'),
    OrderItem(orderNumber: 'ORD125', orderDetails: 'Juice, Muffin', amount: 100.00, status: 'Completed'),
    OrderItem(orderNumber: 'ORD126', orderDetails: 'Salad, Smoothie', amount: 180.00, status: 'Cancelled'),
  ];

  // Function to simulate order status change (for demonstration purposes)
  void changeOrderStatus(OrderItem order, String newStatus) {
    setState(() {
      order.updateStatus(newStatus);
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text(
          'Order History',
          style: TextStyle(
            fontWeight: FontWeight.bold,
          ),
        ),
      ),
      body: ListView.builder(
        itemCount: orders.length,
        itemBuilder: (context, index) {
          final item = orders[index];
          return Card(
            margin: const EdgeInsets.all(8.0),
            child: ListTile(
              title: Text(item.orderDetails),
              subtitle: Text('Order Number: ${item.orderNumber}'),
              trailing: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Text(
                    '₱${item.amount.toStringAsFixed(2)}',
                    style: const TextStyle(
                      fontFamily: 'Poppins',
                      fontSize: 15,
                    ),
                  ),
                  const SizedBox(height: 10),
                  // Show the order status
                  Text(
                    item.status,
                    style: TextStyle(
                      fontWeight: FontWeight.bold,
                      color: getStatusColor(item.status),
                    ),
                  ),
                ],
              ),
              onTap: () {
                // Example: Show action to change the status
                _showChangeStatusDialog(item);
              },
            ),
          );
        },
      ),
    );
  }

  // Method to show a dialog where you can change the order status
  void _showChangeStatusDialog(OrderItem order) {
    showDialog(
      context: context,
      builder: (BuildContext context) {
        return AlertDialog(
          title: Text('Update Status for Order ${order.orderNumber}'),
          content: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              ListTile(
                title: const Text('Pending'),
                onTap: () {
                  changeOrderStatus(order, 'Pending');
                  Navigator.of(context).pop();
                },
              ),
              ListTile(
                title: const Text('Preparing'),
                onTap: () {
                  changeOrderStatus(order, 'Preparing');
                  Navigator.of(context).pop();
                },
              ),
              ListTile(
                title: const Text('Completed'),
                onTap: () {
                  changeOrderStatus(order, 'Completed');
                  Navigator.of(context).pop();
                },
              ),
              ListTile(
                title: const Text('Cancelled'),
                onTap: () {
                  changeOrderStatus(order, 'Cancelled');
                  Navigator.of(context).pop();
                },
              ),
            ],
          ),
        );
      },
    );
  }

  // Function to determine the color based on the status
  Color getStatusColor(String status) {
    switch (status) {
      case 'Pending':
        return Colors.orange;
      case 'Preparing':
        return Colors.blue;
      case 'Completed':
        return Colors.green;
      case 'Cancelled':
        return Colors.red;
      default:
        return Colors.black;
    }
  }
}
