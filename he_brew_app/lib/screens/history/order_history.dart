import 'package:flutter/material.dart';
import 'sample_data.dart';
import 'order_tracking.dart'; // Import the OrderTrackingScreen

class HistoryScreen extends StatelessWidget {
  const HistoryScreen({super.key});

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
      backgroundColor: Colors.white, // Set background color to white
      body: ListView.builder(
        itemCount: sampleHistory.length,
        itemBuilder: (context, index) {
          final item = sampleHistory[index];
          
          // Dynamic status label mapping
          Color statusColor = Colors.black;  // All statuses will have black color
          String displayStatus;

          switch (item.status) {
            case 'Successful':
              displayStatus = 'Completed';
              break;
            case 'Cancelled':
              displayStatus = 'Cancelled';
              break;
            case 'Preparing':
              displayStatus = 'Preparing';
              break;
            case 'Pending':
              displayStatus = 'Pending';
              break;
            default:
              displayStatus = item.status;
          }

          return Card(
            margin: const EdgeInsets.symmetric(horizontal: 12.0, vertical: 10.0),
            child: Padding(
              padding: const EdgeInsets.all(16.0),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  // Row for Order ID and Status
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Text(
                        'Order ID: ${item.orderID}',
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
                    'Date of Order: ${item.date}',
                    style: const TextStyle(
                      fontSize: 14,
                      color: Colors.grey,
                    ),
                  ),
                  const SizedBox(height: 8.0),
                  Text(
                    item.orderDetails,
                    style: const TextStyle(
                      fontSize: 16,
                    ),
                  ),
                  const SizedBox(height: 12.0),
                  Align(
                    alignment: Alignment.centerRight,
                    child: ElevatedButton(
                      onPressed: () {
                        // Navigate to OrderTrackingScreen with the order ID and status
                        Navigator.push(
                          context,
                          MaterialPageRoute(
                            builder: (context) => OrderTrackingScreen(
                              orderId: item.orderID,
                              orderStatus: item.status,
                            ),
                          ),
                        );
                      },
                      style: ElevatedButton.styleFrom(
                        backgroundColor: const Color.fromARGB(255, 255, 255, 255), // Button background color
                        side: const BorderSide(color: Color.fromARGB(255, 32, 32, 32)), // Button border color
                        shape: RoundedRectangleBorder(
                          borderRadius: BorderRadius.circular(10.0), // Rounded corners
                        ),
                        padding: const EdgeInsets.symmetric(
                          horizontal: 16.0,
                          vertical: 10.0,
                        ),
                      ),
                      child: const Text(
                        'Track Order',
                        style: TextStyle(
                          color: Color.fromARGB(255, 32, 32, 32), // Button text color
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
      ),
    );
  }
}
