import 'package:flutter/material.dart';

class TermsDialog extends StatefulWidget {
  final VoidCallback onAccepted;

  const TermsDialog({super.key, required this.onAccepted});

  @override
  _TermsDialogState createState() => _TermsDialogState();
}

class _TermsDialogState extends State<TermsDialog> {
  final ScrollController _scrollController = ScrollController();
  bool hasScrolledToBottom = false;

  @override
  void initState() {
    super.initState();
    _scrollController.addListener(() {
      if (_scrollController.position.pixels >= _scrollController.position.maxScrollExtent) {
        setState(() {
          hasScrolledToBottom = true;
        });
      }
    });
  }

  @override
  void dispose() {
    _scrollController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return AlertDialog(
      title: const Text('Terms of Service'),
      content: SizedBox(
        height: 300,
        child: Scrollbar(
          child: SingleChildScrollView(
            controller: _scrollController,
            child: Padding(
              padding: const EdgeInsets.all(10.0),
              child: RichText(
                textAlign: TextAlign.justify,
                text: const TextSpan(
                  style: TextStyle(color: Colors.black), // Default text style
                  children: [
                    TextSpan(
                      text: "1. Acceptance of Terms \n",
                      style: TextStyle(fontWeight: FontWeight.bold),
                    ),
                    TextSpan(
                      text:
                          "   a. By accessing or using the He Brews Cafe platform, you confirm your agreement to comply with these Terms and Conditions. If you disagree with any portion of these terms, you are prohibited from using or accessing our platform. Your continued use of the platform constitutes your acceptance of any changes or updates made to these terms.\n\n"
                    ),
                    TextSpan(
                      text: "2. About Us\n",
                      style: TextStyle(fontWeight: FontWeight.bold),
                    ),
                    TextSpan(
                      text:
                          "   a. Through our platform, the He Brews Cafe app provides you with a seamless and convenient way to enjoy your favorite coffee, meals, and more. We are dedicated to delivering exceptional service by bringing the cafe experience right to your fingertips. Our app allows you to place orders, track them in real-time, and explore our menu with ease. Whether you're craving a freshly brewed coffee, a hearty snack, or our newest creations, He Brews Cafe ensures that every order is prepared with care and quality. You can choose to have your order for dine-in, takeout, or delivery, making it easy to enjoy our offerings wherever and however you prefer.\n\n"
                    ),
                    TextSpan(
                      text: "3. User Accounts\n",
                      style: TextStyle(fontWeight: FontWeight.bold),
                    ),
                    TextSpan(
                      text: 
                          "   a. To access certain features on our platform, you may need to create an account. During registration for a He Brews Cafe app account, we will ask for personal details such as your full name, email address, phone number, current address, selected username, and a secure password.\n\n"
                          "b. You are responsible for keeping your account information, including your password, confidential and for ensuring that unauthorized individuals do not access your account. By creating an account, you agree to take full responsibility for all activities and transactions that take place under your account, whether initiated by you or another party.\n\n"
                    ),
                    TextSpan(
                      text: "4. Intellectual Property\n",
                      style: TextStyle(fontWeight: FontWeight.bold),
                    ),
                    TextSpan(
                      text:
                          "   a. All content and materials provided through our platform, including but not limited to logos, images, graphics, text, software, and design elements, are the exclusive property of He Brews Cafe and are safeguarded by copyright, trademark, and other applicable intellectual property laws. Unauthorized use, reproduction, or distribution of any content from the platform without prior written consent from He Brews Cafe is strictly prohibited.\n\n"
                          "b. By using our platform, you acknowledge that you do not acquire any rights or ownership over any intellectual property contained within, except for the limited license granted to access and use the platform in accordance with these Terms and Conditions.\n\n"
                    ),
                    TextSpan(
                      text: "5. Orders\n",
                      style: TextStyle(fontWeight: FontWeight.bold),
                    ),
                    TextSpan(
                      text: 
                          "   a. To ensure accurate processing and fulfillment of delivery orders, you must provide a valid delivery address. The He Brews Cafe app uses this information solely for order completion and timely delivery. Once your order is successfully placed, you will receive a confirmation through the app, which will include your order number and the selected order type (dine-in, takeout, or delivery). It is your responsibility to provide accurate delivery and contact details to prevent any delays or failed deliveries. He Brews Cafe will not be held liable for issues caused by incorrect or incomplete information provided by the user.\n\n"
                          "b. Cancellation of Order\n"
                          "      i. All orders placed through the He Brews Cafe app are considered final and cannot be canceled under any circumstances. We encourage users to carefully review their orders—including selected items, quantities, and preferred branch or delivery details—before confirming their purchase.\n\n"
                          "      ii. If an order has been paid for in advance and the user decides to cancel or change their mind, no refunds will be issued. This policy ensures that resources allocated to the preparation and fulfillment of the order are not wasted.\n\n"
                    ),
                    TextSpan(
                      text: "6. Payment Methods\n",
                      style: TextStyle(fontWeight: FontWeight.bold),
                    ),
                    TextSpan(
                      text: 
                          "   a. He Brews Cafe reserves the right to introduce new payment options or discontinue existing ones at any time at its sole discretion. By placing an order through the app, you agree to use the available payment methods provided at the time of your transaction. If you opt for an online payment method, your payment will be securely processed by trusted third-party payment service providers. He Brews Cafe does not collect or store sensitive financial details, such as credit or debit card information, ensuring that your personal data remains protected. \n\n"
                    ),
                    TextSpan(
                      text: "7. Indemnity\n",
                      style: TextStyle(fontWeight: FontWeight.bold),
                    ),
                    TextSpan(
                      text:
                          "   By using the He Brews Cafe app, you agree to take full responsibility for your actions and to indemnify, defend, and hold harmless He Brews Cafe, its employees, partners from any claims, liabilities, damages, losses, expenses, or costs (including reasonable legal fees) that may arise due to:\n"
                          "   ● Misuse of the Platform – Any improper use of the app, breach of these Terms and Conditions, or violation of another party’s rights by you or anyone using your account.\n"
                          "   ● Incorrect or Misleading Information – Any issues resulting from inaccurate, incomplete, or false details you provide (such as delivery address or contact information) that may affect order fulfillment.\n"
                          "   ● Third-Party Services – Any problems or disputes related to third-party payment providers or delivery services that operate independently of He Brews Cafe.\n"
                          "   ● Legal Violations – Any actions taken by you that breach applicable laws or regulations while using the platform.\n\n"
                    ),
                    TextSpan(
                      text: "8. Contact Us\n",
                      style: TextStyle(fontWeight: FontWeight.bold),
                    ),
                    TextSpan(
                      text: 
                          "   a. If you have any questions, concerns, or need assistance, feel free to reach out to us. You can contact our customer support team via email at hebrews.cafe@gmail.com or call us at 0975-255-7104. We are here to assist you and ensure the best possible experience with He Brews Cafe.\n"
                    ),
                  ],
                ),
              ),
            ),
          ),
        ),
      ),
      actions: <Widget>[
        TextButton(
          onPressed: hasScrolledToBottom
              ? () {
                  widget.onAccepted();
                  Navigator.of(context).pop();
                }
              : null, // Disable button until scrolled to bottom
          child: const Text('Accept'),
        ),
      ],
    );
  }
}
