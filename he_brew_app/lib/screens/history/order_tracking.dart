import 'package:flutter/material.dart';
import 'package:intl/intl.dart';
import 'package:http/http.dart' as http;

class OrderTrackingScreen extends StatelessWidget {
  final String orderId;
  final String orderStatus;
  final String branchName;
  final double amount;

  const OrderTrackingScreen({
    required this.orderId,
    required this.orderStatus,
    required this.branchName,
    required this.amount,
    super.key,
  });

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Track your order'),
        leading: const BackButton(),
      ),
      backgroundColor: Colors.white,
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            _buildOrderIdBox(),
            const SizedBox(height: 16),
            _buildOrderDetails(),
            const SizedBox(height: 32),
            _buildOrderProgress(),
            const Spacer(),
            _buildReceiveOrderButton(context),
          ],
        ),
      ),
    );
  }

  Widget _buildOrderIdBox() {
    return Container(
      padding: const EdgeInsets.symmetric(vertical: 16.0, horizontal: 24.0),
      decoration: BoxDecoration(
        color: const Color.fromARGB(255, 255, 255, 255),
        borderRadius: BorderRadius.circular(12),
        boxShadow: [
          BoxShadow(
            color: Colors.grey.withOpacity(0.2),
            blurRadius: 8,
            offset: const Offset(0, 4),
          ),
        ],
      ),
      child: Row(
        children: [
          const Icon(Icons.shopping_bag_outlined, size: 32, color: Color.fromARGB(255, 67, 69, 49)),
          const SizedBox(width: 16),
          Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              const Text(
                'Order Number',
                style: TextStyle(fontSize: 14, color: Colors.grey),
              ),
              Text(
                orderId,
                style: const TextStyle(fontSize: 24, fontWeight: FontWeight.bold, color: Colors.black),
              ),
            ],
          ),
        ],
      ),
    );
  }

  Widget _buildOrderDetails() {
    final formatter = NumberFormat('###,###.00');
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        _buildDetailRow(Icons.location_pin, 'Pick Up Location', branchName),
        const SizedBox(height: 16),
        _buildDetailRow(Icons.attach_money, 'Total cost', formatter.format(amount)),
      ],
    );
  }

  Widget _buildDetailRow(IconData icon, String label, String value) {
    return Row(
      children: [
        Icon(icon, size: 24, color: const Color.fromARGB(255, 67, 69, 49)),
        const SizedBox(width: 12),
        Expanded(
          child: Text(
            '$label: $value',
            style: const TextStyle(fontSize: 16, color: Colors.black),
          ),
        ),
      ],
    );
  }

  Widget _buildOrderProgress() {
    final List<Map<String, dynamic>> stages = [
      {'label': 'Received', 'icon': Icons.assignment_turned_in},
      {'label': 'Preparing', 'icon': Icons.kitchen},
      {'label': 'Ready', 'icon': Icons.check_circle_outline},
    ];
    int currentStage = stages.indexWhere((stage) => stage['label'] == orderStatus);

    return Column(
      children: List.generate(stages.length, (index) {
        final isCompleted = index <= currentStage;
        return Column(
          children: [
            Row(
              crossAxisAlignment: CrossAxisAlignment.center,
              children: [
                Container(
                  width: 30,
                  height: 30,
                  decoration: BoxDecoration(
                    shape: BoxShape.circle,
                    color: isCompleted
                        ? const Color.fromARGB(255, 67, 69, 49)
                        : Colors.grey.shade300,
                  ),
                  child: Icon(
                    stages[index]['icon'],
                    size: 18,
                    color: isCompleted ? Colors.white : Colors.grey,
                  ),
                ),
                const SizedBox(width: 12),
                Expanded(
                  child: Text(
                    stages[index]['label'],
                    style: TextStyle(
                      fontSize: 16,
                      fontWeight: isCompleted ? FontWeight.bold : FontWeight.normal,
                      color: isCompleted ? Colors.black : Colors.grey,
                    ),
                  ),
                ),
              ],
            ),
            if (index < stages.length - 1)
              Padding(
                padding: const EdgeInsets.symmetric(horizontal: 14),
                child: Container(
                  height: 40,
                  width: 2,
                  color: isCompleted
                      ? const Color.fromARGB(255, 67, 69, 49)
                      : Colors.grey.shade300,
                ),
              ),
          ],
        );
      }),
    );
  }

  Widget _buildReceiveOrderButton(BuildContext context) {
    bool isReady = orderStatus == 'Ready';
    bool isCompleted = orderStatus == 'Completed';

    return ElevatedButton(
      onPressed: isReady && !isCompleted ? () async {
        await _updateOrderStatusToCompleted(orderId);
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(content: Text('Order Received')),
        );
        Navigator.pop(context, true);
      }
      : null,
      style: ElevatedButton.styleFrom(
        padding: const EdgeInsets.symmetric(vertical: 20),
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(12),
        ),
        backgroundColor: const Color.fromARGB(255, 67, 69, 49),
      ),
      child: Center(
        child: Text(
          isCompleted ? 'Order Received' : 'Receive Order',
          style: const TextStyle(fontSize: 18, color: Colors.white),
        ),
      ),
    );
  }
}

Future<void> _updateOrderStatusToCompleted(String orderId) async {
  final url = Uri.parse('http://10.0.2.2:3000/api/order-received/$orderId');

  try {
    final response = await http.put(
      url,
      headers: {'Content-Type': 'application/json'},
      body: '{"status": "Completed"}', // Adjust body based on your backend API
    );

    if (response.statusCode == 200) {
      print('Order $orderId status updated to Completed.');
    } else {
      print('Failed to update order status. Error: ${response.body}');
    }
  } catch (e) {
    print('Error updating order status: $e');
  }
}
