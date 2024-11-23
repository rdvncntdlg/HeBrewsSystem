import 'package:flutter/material.dart';
import 'package:he_brew_app/theme.dart';
import 'package:he_brew_app/screens/cart/order_success.dart';

class SelectionScreen extends StatefulWidget {
  const SelectionScreen({super.key});

  @override
  _SelectionScreenState createState() => _SelectionScreenState();
}

class _SelectionScreenState extends State<SelectionScreen> {
  String? selectedOption; // Holds the selected order type

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text(
          "Order Type",
          style: TextStyle(fontFamily: 'Poppins', fontWeight: FontWeight.bold),
        ),
        backgroundColor: primaryColor,
      ),
      body: Padding(
        padding: const EdgeInsets.all(20.0),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center, // Center content vertically
          children: [
            // First row with Dine-In and Take-Out boxes centered
            Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                GestureDetector(
                  onTap: () {
                    setState(() {
                      selectedOption = "Dine-In";
                    });
                  },
                  child: OptionBox(
                    icon: Icons.restaurant,
                    label: "Dine-In",
                    isSelected: selectedOption == "Dine-In",
                  ),
                ),
                const SizedBox(width: 30), // Increased space between the boxes
                GestureDetector(
                  onTap: () {
                    setState(() {
                      selectedOption = "Take-Out";
                    });
                  },
                  child: OptionBox(
                    icon: Icons.takeout_dining,
                    label: "Take-Out",
                    isSelected: selectedOption == "Take-Out",
                  ),
                ),
              ],
            ),
            const SizedBox(height: 40), // Increased space between rows

            // Second row with Delivery box centered
            Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                GestureDetector(
                  onTap: () {
                    setState(() {
                      selectedOption = "Delivery";
                    });
                  },
                  child: OptionBox(
                    icon: Icons.delivery_dining,
                    label: "Delivery",
                    isSelected: selectedOption == "Delivery",
                  ),
                ),
              ],
            ),
            const SizedBox(height: 50), // Space between the options and the button

            // Spacer to push the button to the bottom
            const Spacer(),

            // Complete Order Button pinned to the bottom
            ElevatedButton(
              style: ElevatedButton.styleFrom(
                backgroundColor: primaryColor,
                minimumSize: const Size(double.infinity, 55),
              ),
              onPressed: selectedOption == null
                  ? null // Disable if no option is selected
                  : () {
                      // Navigate to Order Success Screen
                      final orderNumber =
                          DateTime.now().millisecondsSinceEpoch.toString();

                      Navigator.pushReplacement(
                        context,
                        MaterialPageRoute(
                          builder: (context) => OrderSuccessScreen(
                            orderNumber: orderNumber,
                            orderType: selectedOption ?? "Unknown", // Default value if null
                          ),
                        ),
                      );
                    },
              child: const Text(
                "Complete Order",
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
      ),
    );
  }
}

class OptionBox extends StatelessWidget {
  final IconData icon;
  final String label;
  final bool isSelected;

  const OptionBox({
    required this.icon,
    required this.label,
    required this.isSelected,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      width: 150, // Increased width for larger boxes
      height: 150, // Increased height for larger boxes
      decoration: BoxDecoration(
        color: isSelected ? primaryColor : Colors.white,
        borderRadius: BorderRadius.circular(12),
        border: Border.all(
          color: isSelected ? primaryColor : Colors.grey,
          width: 2,
        ),
      ),
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Icon(
            icon,
            size: 60, // Increased icon size to match box size
            color: isSelected ? Colors.white : primaryColor,
          ),
          const SizedBox(height: 12),
          Text(
            label,
            style: TextStyle(
              fontFamily: 'Poppins',
              fontSize: 18, // Adjusted font size for better alignment
              fontWeight: FontWeight.bold,
              color: isSelected ? Colors.white : Colors.black,
            ),
          ),
        ],
      ),
    );
  }
}
