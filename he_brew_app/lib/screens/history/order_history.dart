import 'package:flutter/material.dart';
import 'sample_data.dart';

class HistoryScreen extends StatelessWidget {
  const HistoryScreen({Key? key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(
          'Order History',
          style: TextStyle(
            fontWeight: FontWeight.bold,
          ),
        ),
      ),
      body: ListView.builder(
        itemCount: sampleHistory.length,
        itemBuilder: (context, index) {
          final item = sampleHistory[index];
          return Card(
            margin: const EdgeInsets.all(8.0),
            child: ListTile(
              title: Text(item.orderDetails),
              subtitle: Text(item.date),
              trailing: Text(
                '₱${item.amount.toStringAsFixed(2)}',
                style: const TextStyle(
                  fontFamily: 'Poppins',
                  fontSize: 15,
                ),
              ),
            ),
          );
        },
      ),
    );
  }
}