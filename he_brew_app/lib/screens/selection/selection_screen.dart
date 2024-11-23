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
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            const Text(
              "Choose your order type:",
              style: TextStyle(
                fontFamily: 'Poppins',
                fontWeight: FontWeight.bold,
                fontSize: 20,
              ),
            ),
            const SizedBox(height: 20),
            // Options displayed as boxes with icons and labels
            Expanded(
              child: GridView.count(
                crossAxisCount: 3,
                crossAxisSpacing: 20,
                mainAxisSpacing: 20,
                childAspectRatio: 1.0,
                children: [
                  // Dine-In option box
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
                  // Take-Out option box
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
                  // Delivery option box
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
            ),
            const SizedBox(height: 20),
            // Complete Order Button
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
                            orderType: selectedOption!,
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
            size: 40,
            color: isSelected ? Colors.white : primaryColor,
          ),
          const SizedBox(height: 10),
          Text(
            label,
            style: TextStyle(
              fontFamily: 'Poppins',
              fontSize: 16,
              fontWeight: FontWeight.bold,
              color: isSelected ? Colors.white : Colors.black,
            ),
          ),
        ],
      ),
    );
  }
}
