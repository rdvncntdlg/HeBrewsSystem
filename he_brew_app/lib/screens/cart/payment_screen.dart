import 'package:flutter/material.dart';
import 'package:he_brew_app/models/branch_model.dart';
import 'package:he_brew_app/theme.dart';
import 'package:paymongo_sdk/paymongo_sdk.dart';
import 'package:he_brew_app/screens/cart/webview_payment_page.dart';

class PaymentScreen extends StatefulWidget {
  final String orderNumber;
  final String orderType;
  final Branch selectedBranch;
  final String paymentMethod;
  final double totalPrice;
  final TextEditingController specialRequest;

  const PaymentScreen({
    Key? key,
    required this.orderNumber,
    required this.orderType,
    required this.selectedBranch,
    required this.paymentMethod,
    required this.totalPrice,
    required this.specialRequest,
  }) : super(key: key);

  @override
  State<PaymentScreen> createState() => _PaymentScreenState();
}

class _PaymentScreenState extends State<PaymentScreen> {
  final publicClient = const PaymongoClient<PaymongoPublic>('pk_test_vphudEoxiYsEy1RNcQWtjvaD');
  final secretClient = const PaymongoClient<PaymongoSecret>('sk_test_cvmaoNjHD9CsbQen5RJvTtvU' );

  bool isLoading = false;

  Future<void> handleGcashPayment(String orderNumber, String orderType, Branch selectedBranch, String paymentMethod, double totalPrice, TextEditingController specialRequest) async {
    setState(() {
      isLoading = true;
    });

    try {
      final billing = PayMongoBilling(
        name: "Customer Name", // Replace with customer data
        email: "customer@example.com", // Replace with customer data
        phone: "09123456789", // Replace with customer data
        address: PayMongoAddress(
          line1: "123 Street",
          city: "City",
          state: "State",
          postalCode: "1000",
          country: "PH",
        ),
      );

      final source = SourceAttributes(
        type: "gcash",
        amount: totalPrice, // Replace with actual total amount in cents
        currency: 'PHP',
        redirect: const Redirect(
          success: "https://youtube.com/payment-success",
          failed: "https://he-brews-cancel.com/payment-failed",
        ),
        billing: billing,
      );

      final result = await publicClient.instance.source.create(source);

      if (result.attributes?.redirect.checkoutUrl != null) {
        final paymentUrl = result.attributes!.redirect.checkoutUrl!;
        Navigator.pushReplacement(
          context,
          MaterialPageRoute(
            builder: (context) => WebViewPaymentPage(
              url: paymentUrl,
              orderNumber: orderNumber,
              orderType: orderType,
              selectedBranch: selectedBranch,
              paymentMethod: paymentMethod,
              totalPrice: totalPrice,
              specialRequest: specialRequest,
            ),
          ),
        );
      }
    } catch (e) {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text('Error initiating payment: $e')),
      );
    } finally {
      setState(() {
        isLoading = false;
      });
    }
  }

  @override
  void initState() {
    super.initState();

    // Automatically trigger GCash payment if the paymentMethod is "GCash"
    if (widget.paymentMethod == "GCash") {
      handleGcashPayment(widget.orderNumber, widget.orderType, widget.selectedBranch, widget.paymentMethod, widget.totalPrice, widget.specialRequest);
    }
  }

  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text("${widget.paymentMethod} Payment"),
        backgroundColor: primaryColor,
      ),
      body: Center(
        child: isLoading
            ? const CircularProgressIndicator()  // Show loading while payment is processing
            : widget.paymentMethod == "GCash"
                ? const Text(
                    "Processing your payment...",
                    style: TextStyle(fontSize: 16),
                  )
                : const Text(
                    "Cash payment will be collected at the branch.",
                    style: TextStyle(fontSize: 16),
                  ),
      ),
    );
  }
}
