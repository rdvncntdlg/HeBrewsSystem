import 'package:flutter/material.dart';
import 'track_order.dart'; // Import TrackOrder screen

class OrderHistorySample extends StatelessWidget {
  final List<Map<String, dynamic>> orders = [
    {
      'restaurant': 'Karam Beirut',
      'dateTime': '22 May 2020 - 10:00 PM',
      'orderId': '#20654834',
      'status': 'Successful',
      'statusColor': Colors.green,
    },
    {
      'restaurant': 'Karam Beirut',
      'dateTime': '22 May 2020 - 10:00 PM',
      'orderId': '#20654835',
      'status': 'Canceled',
      'statusColor': Colors.red,
    },
    {
      'restaurant': 'Karam Beirut',
      'dateTime': '22 May 2020 - 10:00 PM',
      'orderId': '#20654836',
      'status': 'Successful',
      'statusColor': Colors.green,
    },
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: Colors.white,
        elevation: 0,
        centerTitle: true,
        title: const Text(
          'My Orders',
          style: TextStyle(color: Colors.black, fontSize: 20, fontWeight: FontWeight.bold),
        ),
        iconTheme: const IconThemeData(color: Colors.black),
      ),
      body: ListView.builder(
        itemCount: orders.length,
        itemBuilder: (context, index) {
          final order = orders[index];
          bool isSuccessful = order['status'] == 'Successful';

          return Padding(
            padding: const EdgeInsets.symmetric(horizontal: 16.0, vertical: 8.0),
            child: Card(
              elevation: 2,
              shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
              child: Padding(
                padding: const EdgeInsets.all(16.0),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    // Restaurant Logo
                    Row(
                      children: [
                        CircleAvatar(
                          backgroundColor: Colors.grey.shade200,
                          radius: 28,
                          child: Text(
                            order['restaurant'][0],
                            style: const TextStyle(fontSize: 20, fontWeight: FontWeight.bold),
                          ),
                        ),
                        const SizedBox(width: 16),
                        // Order Details
                        Expanded(
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Text(
                                order['restaurant'],
                                style: const TextStyle(fontSize: 16, fontWeight: FontWeight.bold),
                              ),
                              const SizedBox(height: 4),
                              Text(
                                order['dateTime'],
                                style: TextStyle(color: Colors.grey.shade600, fontSize: 14),
                              ),
                              const SizedBox(height: 4),
                              Text(
                                'Order ID: ${order['orderId']}',
                                style: TextStyle(color: Colors.grey.shade600, fontSize: 14),
                              ),
                            ],
                          ),
                        ),
                      ],
                    ),
                    const SizedBox(height: 8),
                    // Status
                    Text(
                      order['status'],
                      style: TextStyle(
                        color: order['statusColor'],
                        fontSize: 14,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                    const SizedBox(height: 8),
                    // Track Order Button for Successful Orders only
                    if (isSuccessful)
                      Align(
                        alignment: Alignment.centerRight,
                        child: OutlinedButton(
                          onPressed: () {
                            // Navigate to the TrackOrder screen with the required parameters
                            Navigator.push(
                              context,
                              MaterialPageRoute(
                                builder: (context) => TrackOrder(
                                  orderId: order['orderId'],
                                  restaurant: order['restaurant'],
                                  estimatedPickupTime: '22 May 2020 - 10:00 PM', // Example, replace with dynamic value
                                  location: '928 Lehner Junction Riyadh, Saudi Arabia', // Example location
                                  totalCost: 220.00, // Example cost, replace with dynamic value
                                ),
                              ),
                            );
                          },
                          style: OutlinedButton.styleFrom(
                            padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
                          ),
                          child: const Text(
                            'Track Order',
                            style: TextStyle(fontSize: 14),
                          ),
                        ),
                      ),
                  ],
                ),
              ),
            ),
          );
        },
      ),
    );
  }
}

void main() {
  runApp(MaterialApp(
    home: OrderHistorySample(),
    debugShowCheckedModeBanner: false,
  ));
}
