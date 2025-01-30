import 'package:flutter/material.dart';
import 'package:he_brew_app/screens/login/terms_dialog.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';
import 'package:he_brew_app/screens/branch/branches.dart';

class RegScreen extends StatelessWidget {
  const RegScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        leading: IconButton(
          icon: const Icon(Icons.arrow_back),
          onPressed: () {
            Navigator.pushReplacementNamed(context, '/');
          },
        ),
        title: const Text('Sign Up'),
      ),
      body: const SingleChildScrollView(
        child: Padding(
          padding: EdgeInsets.all(20.0),
          child: RegistrationForm(),
        ),
      ),
    );
  }
}

class RegistrationForm extends StatefulWidget {
  const RegistrationForm({super.key});

  @override
  _RegistrationFormState createState() => _RegistrationFormState();
}

class _RegistrationFormState extends State<RegistrationForm> {
  final _formKey = GlobalKey<FormState>();
  final TextEditingController _firstNameController = TextEditingController();
  final TextEditingController _lastNameController = TextEditingController();
  final TextEditingController _emailController = TextEditingController();
  final TextEditingController _passwordController = TextEditingController();
  final TextEditingController _confirmPasswordController = TextEditingController();
  final TextEditingController _usernameController = TextEditingController();
  final TextEditingController _addressController = TextEditingController();
  final TextEditingController _phoneController = TextEditingController();
  bool _agreedToTerms = false;

  @override
  void dispose() {
    _firstNameController.dispose();
    _lastNameController.dispose();
    _emailController.dispose();
    _passwordController.dispose();
    _confirmPasswordController.dispose();
    _usernameController.dispose();
    _addressController.dispose();
    _phoneController.dispose();
    super.dispose();
  }

  Future<void> _register() async {
    if (_formKey.currentState!.validate() && _agreedToTerms) {
      final response = await http.post(
        Uri.parse('https://hebrewscafeserver.onrender.com/api/register'),
        headers: {'Content-Type': 'application/json'},
        body: jsonEncode({
          'firstName': _firstNameController.text,
          'lastName': _lastNameController.text,
          'email': _emailController.text,
          'username': _usernameController.text,
          'password': _passwordController.text,
          'address': _addressController.text,
          'phone': _phoneController.text,
        }),
      );

      final data = jsonDecode(response.body);

      if (response.statusCode == 200 && data['success']) {
        Navigator.pushReplacement(
          context,
          MaterialPageRoute(builder: (context) => const BranchSelection()),
        );
      } else {
        _showErrorDialog(data['message'] ?? 'An unknown error occurred');
      }
    }
  }

  void _showErrorDialog(String message) {
    showDialog(
      context: context,
      builder: (BuildContext context) {
        return AlertDialog(
          title: const Text('Error'),
          content: Text(message),
          actions: <Widget>[
            TextButton(
              child: const Text('OK'),
              onPressed: () {
                Navigator.of(context).pop();
              },
            ),
          ],
        );
      },
    );
  }

  void _showTermsDialog() {
    showDialog(
      context: context,
      builder: (BuildContext context) {
        return TermsDialog(
          onAccepted: () {
            setState(() {
              _agreedToTerms = true; // Mark as accepted
            });
          },
        );
      },
    );
  }

  @override
  Widget build(BuildContext context) {
    return Form(
      key: _formKey,
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          const Center(
            child: Image(
              image: AssetImage('images/login/ye.png'),
              height: 150.0,
              width: 150.0,
            ),
          ),
          const SizedBox(height: 10),
          const Text(
            'Create Your Account',
            style: TextStyle(
              fontFamily: 'Poppins',
              fontSize: 25,
              color: Colors.black,
              fontWeight: FontWeight.bold,
            ),
            textAlign: TextAlign.center,
          ),
          const SizedBox(height: 20),
          TextFormField(
            controller: _firstNameController,
            decoration: const InputDecoration(labelText: 'First Name', border: OutlineInputBorder()),
            validator: (value) => value!.isEmpty ? 'Please enter your first name' : null,
          ),
          const SizedBox(height: 10),
          TextFormField(
            controller: _lastNameController,
            decoration: const InputDecoration(labelText: 'Last Name', border: OutlineInputBorder()),
            validator: (value) => value!.isEmpty ? 'Please enter your last name' : null,
          ),
          const SizedBox(height: 10),
          TextFormField(
            controller: _emailController,
            decoration: const InputDecoration(labelText: 'Email', border: OutlineInputBorder()),
            validator: (value) => value!.isEmpty ? 'Please enter an email address' : null,
          ),
          const SizedBox(height: 10),
          TextFormField(
            controller: _usernameController,
            decoration: const InputDecoration(
              labelText: 'Username',
              border: OutlineInputBorder(),
            ),
            validator: (value) {
              if (value == null || value.isEmpty) {
                return 'Please enter a username';
              }
              return null;
            },
          ),
          const SizedBox(height: 10),
          TextFormField(
            controller: _passwordController,
            obscureText: true,
            decoration: const InputDecoration(
              labelText: 'Password',
              border: OutlineInputBorder(),
            ),
            validator: (value) {
              if (value == null || value.isEmpty) {
                return 'Please enter a password';
              }
              return null;
            },
          ),
          const SizedBox(height: 10),
          TextFormField(
            controller: _confirmPasswordController,
            obscureText: true,
            decoration: const InputDecoration(
              labelText: 'Confirm Password',
              border: OutlineInputBorder(),
            ),
            validator: (value) {
              if (value != _passwordController.text) {
                return 'Passwords do not match';
              }
              return null;
            },
          ),
          const SizedBox(height: 10),
          TextFormField(
            controller: _addressController,
            maxLines: 3,
            decoration: const InputDecoration(
              labelText: 'Address',
              border: OutlineInputBorder(),
            ),
            validator: (value) {
              if (value == null || value.isEmpty) {
                return 'Please enter your address';
              }
              return null;
            },
          ),
          const SizedBox(height: 10),
          TextFormField(
            controller: _phoneController,
            decoration: const InputDecoration(
              labelText: 'Phone Number',
              border: OutlineInputBorder(),
            ),
            keyboardType: TextInputType.phone,
            validator: (value) {
              if (value == null || value.isEmpty) {
                return 'Please enter your phone number';
              }
              return null;
            },
          ),
          const SizedBox(height: 10),
          CheckboxListTile(
            title: GestureDetector(
              onTap: _showTermsDialog,
              child: const Text(
                'I agree to the Terms of Service',
              ),
            ),
            value: _agreedToTerms,
            onChanged: (bool? value) {
              _showTermsDialog();
            },
          ),
          const SizedBox(height: 20),
          ElevatedButton(
            onPressed: _agreedToTerms ? _register : null,
            style: ButtonStyle(
              backgroundColor: WidgetStateProperty.all<Color>(_agreedToTerms ? Colors.black : Colors.grey),
              minimumSize: WidgetStateProperty.all<Size>(const Size(50, 60)),
            ),
            child: const Text(
              'SIGN UP',
              style: TextStyle(fontFamily: 'Poppins', fontWeight: FontWeight.bold, fontSize: 18, color: Colors.white),
            ),
          ),
        ],
      ),
    );
  }
}
