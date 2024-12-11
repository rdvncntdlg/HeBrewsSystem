import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:he_brew_app/theme.dart';
import 'package:he_brew_app/screens/cart/order_success.dart';
import 'package:he_brew_app/models/branch_model.dart';

class SelectionScreen extends StatefulWidget {
  final Branch selectedBranch; // Pass the selected branch to this screen

  const SelectionScreen({super.key, required this.selectedBranch});

  @override
  _SelectionScreenState createState() => _SelectionScreenState();
}

class _SelectionScreenState extends State<SelectionScreen> {
  String? selectedOption; // Holds the selected order type
  final TextEditingController addressController = TextEditingController();
  final TextEditingController phoneController = TextEditingController();
  final TextEditingController specialRequestController = TextEditingController();
  bool isCompleteOrderEnabled = false;

  void checkFormCompletion() {
    setState(() {
      isCompleteOrderEnabled = selectedOption != null &&
          (selectedOption != "Delivery" || (addressController.text.isNotEmpty && phoneController.text.isNotEmpty));
    });
  }

  @override
  void initState() {
    super.initState();
    addressController.addListener(checkFormCompletion);
    phoneController.addListener(checkFormCompletion);
  }

  @override
  void dispose() {
    addressController.dispose();
    phoneController.dispose();
    specialRequestController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text(
          "Shipping",
          style: TextStyle(fontFamily: 'Poppins', fontWeight: FontWeight.bold),
        ),
        backgroundColor: primaryColor,
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(20.0),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.start,
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const Text(
              "Select Dining Option",
              style: TextStyle(
                fontFamily: 'Poppins',
                fontWeight: FontWeight.bold,
                fontSize: 16,
              ),
            ),
            const SizedBox(height: 10),
            DropdownButtonFormField<String>(
              decoration: InputDecoration(
                border: OutlineInputBorder(
                  borderRadius: BorderRadius.circular(8),
                ),
              ),
              value: selectedOption,
              items: ["Dine-In", "Take-Out", "Delivery"]
                  .map((option) => DropdownMenuItem(
                        value: option,
                        child: Text(option),
                      ))
                  .toList(),
              onChanged: (value) {
                setState(() {
                  selectedOption = value;
                  if (selectedOption != "Delivery") {
                    addressController.clear();
                    phoneController.clear();
                  }
                });
                checkFormCompletion();
              },
              hint: const Text("Choose an option"),
            ),
            const SizedBox(height: 20),
            const Text(
              "Address",
              style: TextStyle(
                fontFamily: 'Poppins',
                fontWeight: FontWeight.bold,
                fontSize: 16,
              ),
            ),
            const SizedBox(height: 10),
            TextField(
              controller: addressController,
              decoration: InputDecoration(
                hintText: "Enter your address",
                border: OutlineInputBorder(
                  borderRadius: BorderRadius.circular(8),
                ),
              ),
              enabled: selectedOption == "Delivery",
            ),
            const SizedBox(height: 20),
            const Text(
              "Phone Number",
              style: TextStyle(
                fontFamily: 'Poppins',
                fontWeight: FontWeight.bold,
                fontSize: 16,
              ),
            ),
            const SizedBox(height: 10),
            TextField(
              controller: phoneController,
              decoration: InputDecoration(
                hintText: "Enter your phone number (e.g., 09XXXXXXXXX)",
                border: OutlineInputBorder(
                  borderRadius: BorderRadius.circular(8),
                ),
              ),
              keyboardType: TextInputType.phone,
              enabled: selectedOption == "Delivery",
              inputFormatters: [
                FilteringTextInputFormatter.digitsOnly,
                LengthLimitingTextInputFormatter(11),
                FilteringTextInputFormatter.allow(RegExp(r'^\d{0,11}\$')),
              ],
            ),
            const SizedBox(height: 20),
            const Text(
              "Special Request",
              style: TextStyle(
                fontFamily: 'Poppins',
                fontWeight: FontWeight.bold,
                fontSize: 16,
              ),
            ),
            const SizedBox(height: 10),
            TextField(
              controller: specialRequestController,
              decoration: InputDecoration(
                hintText: "Enter any special requests",
                border: OutlineInputBorder(
                  borderRadius: BorderRadius.circular(8),
                ),
              ),
              maxLines: 3,
            ),
          ],
        ),
      ),
      bottomNavigationBar: Padding(
        padding: const EdgeInsets.all(20.0),
        child: ElevatedButton(
          style: ElevatedButton.styleFrom(
            backgroundColor: primaryColor,
            minimumSize: const Size(double.infinity, 55),
          ),
          onPressed: isCompleteOrderEnabled
              ? () {
                  final orderNumber =
                      DateTime.now().millisecondsSinceEpoch.toString();
                  Navigator.pushReplacement(
                    context,
                    MaterialPageRoute(
                      builder: (context) => OrderSuccessScreen(
                        orderNumber: orderNumber,
                        orderType: selectedOption ?? "Unknown",
                        selectedBranch: widget.selectedBranch, // Pass the selected branch
                      ),
                    ),
                  );
                }
              : null,
          child: const Text(
            "Proceed to Payment",
            style: TextStyle(
              fontFamily: 'Poppins',
              fontWeight: FontWeight.bold,
              fontSize: 16,
              color: Colors.white,
            ),
          ),
        ),
      ),
    );
  }
}
