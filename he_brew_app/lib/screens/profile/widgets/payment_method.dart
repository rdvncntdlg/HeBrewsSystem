import 'package:flutter/material.dart';
import 'package:he_brew_app/screens/profile/widgets/add_payment_method.dart';

class PaymentMethodsScreen extends StatelessWidget {
  const PaymentMethodsScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Payment Methods'),
        actions: [
          IconButton(
            icon: const Icon(Icons.add),
            onPressed: () {
              Navigator.push(
                context,
                MaterialPageRoute(
                    builder: (context) => const AddPaymentMethodScreen()),
              );
            },
          ),
        ],
      ),
      body: ListView(
        padding: const EdgeInsets.all(16.0),
        children: [
          _buildPaymentMethodTile(
            context: context,
            icon: Icons.credit_card,
            title: 'Sheena Catacutan',
            subtitle: '09234829302',
          ),
          const SizedBox(height: 16),
          _buildPaymentMethodTile(
            context: context,
            icon: Icons.payment,
            title: 'Sean Luis Catacutan',
            subtitle: '09234829302',
          ),
          const SizedBox(height: 16),
          _buildPaymentMethodTile(
            context: context,
            icon: Icons.payment,
            title: 'Gwen Apuli',
            subtitle: '090123456789',
          ),
        ],
      ),
    );
  }

  Widget _buildPaymentMethodTile({
    required BuildContext context,
    required IconData icon,
    required String title,
    required String subtitle,
  }) {
    return ListTile(
      leading: Icon(icon),
      title: Text(title),
      subtitle: Text(subtitle),
      trailing: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          IconButton(
            icon: const Icon(Icons.edit),
            onPressed: () {
              _editPaymentMethod(context, title, subtitle);
            },
          ),
          IconButton(
            icon: const Icon(Icons.delete),
            onPressed: () {
              _deletePaymentMethod(context, title);
            },
          ),
        ],
      ),
    );
  }

  void _editPaymentMethod(BuildContext context, String title, String subtitle) {
    showDialog(
      context: context,
      builder: (BuildContext context) {
        return AlertDialog(
          title: const Text('Edit Payment Method'),
          content: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              TextField(
                decoration: InputDecoration(
                  labelText: 'Name',
                  hintText: title,
                ),
              ),
              TextField(
                decoration: InputDecoration(
                  labelText: 'Phone Number',
                  hintText: subtitle,
                ),
              ),
            ],
          ),
          actions: [
            TextButton(
              onPressed: () {
                Navigator.of(context).pop();
              },
              style: ButtonStyle(
                backgroundColor: WidgetStateProperty.all<Color>(
                    const Color.fromARGB(255, 0, 0, 0)),
                foregroundColor: WidgetStateProperty.all<Color>(Colors.white),
              ),
              child: const Text('Edit'),
            ),
            TextButton(
              onPressed: () {
                Navigator.of(context).pop();
              },
              style: ButtonStyle(
                backgroundColor: WidgetStateProperty.all<Color>(
                    const Color.fromARGB(255, 255, 255, 255)),
                foregroundColor: WidgetStateProperty.all<Color>(Colors.black),
              ),
              child: const Text('Cancel'),
            ),
          ],
        );
      },
    );
  }

  void _deletePaymentMethod(BuildContext context, String title) {
    showDialog(
      context: context,
      builder: (BuildContext context) {
        return AlertDialog(
          title: const Text('Delete Payment Method'),
          content: Text('Are you sure you want to delete $title?'),
          actions: [
            TextButton(
              onPressed: () {
                Navigator.of(context).pop();
              },
              style: ButtonStyle(
                backgroundColor: WidgetStateProperty.all<Color>(
                    const Color.fromARGB(255, 0, 0, 0)),
                foregroundColor: WidgetStateProperty.all<Color>(Colors.white),
              ),
              child: const Text('Delete'),
            ),
            TextButton(
              onPressed: () {
                Navigator.of(context).pop();
              },
              style: ButtonStyle(
                backgroundColor: WidgetStateProperty.all<Color>(
                    const Color.fromARGB(255, 255, 255, 255)),
                foregroundColor: WidgetStateProperty.all<Color>(Colors.black),
              ),
              child: const Text('Cancel'),
            ),
          ],
        );
      },
    );
  }
}
