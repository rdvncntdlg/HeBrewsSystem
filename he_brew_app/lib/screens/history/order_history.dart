import 'dart:async';
import 'package:flutter/material.dart';
import 'package:he_brew_app/provider/customer_provider.dart';
import 'package:he_brew_app/screens/history/history_item.dart'; 
import 'package:he_brew_app/services/history_service.dart'; 
import 'package:provider/provider.dart';
import 'order_tracking.dart';

class HistoryScreen extends StatelessWidget {
  const HistoryScreen({super.key});

  Future<List<HistoryItem>> fetchHistory(BuildContext context) async {
    final userProvider = Provider.of<UserProvider>(context, listen: false);
    final historyService = HistoryService();
    return historyService.fetchOrderHistory(userProvider.customerId);
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text(
          'Order History',
          style: TextStyle(fontWeight: FontWeight.bold),
        ),
      ),
      backgroundColor: Colors.white,
      body: FutureBuilder<List<HistoryItem>>(
        future: fetchHistory(context),
        builder: (context, snapshot) {
          if (snapshot.connectionState == ConnectionState.waiting) {
            return const Center(child: CircularProgressIndicator());
          } else if (snapshot.hasError) {
            return Center(child: Text('Error: ${snapshot.error}'));
          } else if (!snapshot.hasData || snapshot.data!.isEmpty) {
            return const Center(child: Text('No order history available.'));
          } else {
            final historyList = snapshot.data!;
            return ListView.builder(
              itemCount: historyList.length,
              itemBuilder: (context, index) {
                final item = historyList[index];

                Color statusColor;
                String displayStatus;

                switch (item.status ?? '') {
                  case 'Successful':
                    statusColor = Colors.green;
                    displayStatus = 'Completed';
                    break;
                  case 'Cancelled':
                    statusColor = Colors.red;
                    displayStatus = 'Cancelled';
                    break;
                  case 'Preparing':
                    statusColor = Colors.orange;
                    displayStatus = 'Preparing';
                    break;
                  case 'Pending':
                    statusColor = Colors.blue;
                    displayStatus = 'Pending';
                    break;
                  default:
                    statusColor = Colors.black;
                    displayStatus = item.status ?? 'Unknown';
                }

                return Card(
                  margin: const EdgeInsets.symmetric(horizontal: 12.0, vertical: 10.0),
                  child: Padding(
                    padding: const EdgeInsets.all(16.0),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Row(
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          children: [
                            Text(
                              'Order ID: ${item.orderID ?? 'Unknown'}',
                              style: const TextStyle(
                                fontWeight: FontWeight.bold,
                                fontSize: 16,
                              ),
                            ),
                            Text(
                              displayStatus,
                              style: TextStyle(
                                color: statusColor,
                                fontWeight: FontWeight.bold,
                              ),
                            ),
                          ],
                        ),
                        const SizedBox(height: 8.0),
                        Text(
                          'Date of Order: ${item.date ?? 'Unknown'}',
                          style: const TextStyle(
                            fontSize: 14,
                            color: Colors.grey,
                          ),
                        ),
                        const SizedBox(height: 8.0),

                        Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: item.orderDetails?.map((detail) {
                                return Text(
                                  '${detail.quantity} x ${detail.item} - \$${detail.price.toStringAsFixed(2)}',
                                  style: const TextStyle(fontSize: 14),
                                );
                              }).toList() ??
                              [const Text('No order details available')],
                        ),
                        const SizedBox(height: 12.0),

                        Align(
                          alignment: Alignment.centerRight,
                          child: ElevatedButton(
                            onPressed: () {
                              Navigator.push(
                                context,
                                MaterialPageRoute(
                                  builder: (context) => OrderTrackingScreen(
                                    orderId: item.orderID ?? '',
                                    orderStatus: item.status ?? 'Unknown',
                                    branchName: item.branchName ?? 'Unknown',
                                    amount: item.amount ?? 0.0,
                                  ),
                                ),
                              );
                            },
                            style: ElevatedButton.styleFrom(
                              backgroundColor: Colors.white,
                              side: const BorderSide(color: Colors.black),
                              shape: RoundedRectangleBorder(
                                borderRadius: BorderRadius.circular(10.0),
                              ),
                              padding: const EdgeInsets.symmetric(
                                horizontal: 16.0,
                                vertical: 10.0,
                              ),
                            ),
                            child: const Text(
                              'Track Order',
                              style: TextStyle(
                                color: Colors.black,
                                fontWeight: FontWeight.bold,
                              ),
                            ),
                          ),
                        ),
                      ],
                    ),
                  ),
                );
              },
            );
          }
        },
      ),
    );
  }
}
