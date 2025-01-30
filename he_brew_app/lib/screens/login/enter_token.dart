import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:he_brew_app/screens/login/set_new_password.dart';
import 'package:http/http.dart' as http;

class EnterToken extends StatefulWidget {
  final String email;

  const EnterToken({super.key, required this.email});
  
  @override
  _EnterTokenState createState() => _EnterTokenState();
}

class _EnterTokenState extends State<EnterToken> {
  final TextEditingController _otpController = TextEditingController();
  bool isLoading = false;

  Future<void> validateOtp() async {
    final otp = _otpController.text;

    final response = await http.post(
      Uri.parse('https://hebrewscafeserver.onrender.com/api/validate-otp'),
      headers: {'Content-Type': 'application/json'},
      body: jsonEncode({'email': widget.email, 'otp': otp}),
    );

    final data = jsonDecode(response.body);

    if (response.statusCode == 200 && data['success']) {
      Navigator.pushReplacement(
        context,
        MaterialPageRoute(builder: (context) => SetNewPassword(email: widget.email)),
      );
    } else {
      // Show error message using SnackBar
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text(data['message'] ?? 'An error occurred')),
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Enter OTP')),
      body: Padding(
        padding: const EdgeInsets.all(20.0),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            const Text(
              'Enter the OTP sent to your email.',
              style: TextStyle(fontSize: 16),
              textAlign: TextAlign.center,
            ),
            const SizedBox(height: 20),
            TextField(
              controller: _otpController,
              decoration: const InputDecoration(
                labelText: 'OTP',
                border: OutlineInputBorder(),
              ),
            ),
            const SizedBox(height: 20),
            isLoading
                ? const CircularProgressIndicator()
                : ElevatedButton(
                    onPressed: validateOtp,
                    child: const Text('Validate OTP'),
                  ),
          ],
        ),
      ),
    );
  }
}
