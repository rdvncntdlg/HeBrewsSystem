import 'package:flutter/material.dart';
import 'package:he_brew_app/theme.dart';
import 'package:http/http.dart' as http;
import 'package:shared_preferences/shared_preferences.dart';
import 'dart:convert';

class LoginScreen extends StatelessWidget {
  const LoginScreen({super.key});

  @override
  Widget build(BuildContext context) {
    TextEditingController usernameController = TextEditingController();
    TextEditingController passwordController = TextEditingController();

    bool isValid() {
      return usernameController.text.isNotEmpty &&
          passwordController.text.isNotEmpty;
    }

    Future<void> signIn() async {
      if (isValid()) {
        final response = await http.post(
          Uri.parse('http://localhost:3000/login'),
          headers: {'Content-Type': 'application/json'},
          body: jsonEncode({
            'username': usernameController.text,
            'password': passwordController.text,
          }),
        );
        final data = jsonDecode(response.body);

        if (response.statusCode == 200 && data['success']) {
          // Extract the token from the response
          String token = data['token'];

          // Save the token using SharedPreferences
          final prefs = await SharedPreferences.getInstance();
          await prefs.setString('auth_token', token); // Save the token locally

          // Navigate to the home screen (or profile)
          Navigator.pushReplacementNamed(context, '/home');
        } else {
          showDialog(
            context: context,
            builder: (BuildContext context) {
              return AlertDialog(
                title: const Text('Error'),
                content: Text(data['message'] ?? 'An unknown error occurred'),
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
      } else {
        showDialog(
          context: context,
          builder: (BuildContext context) {
            return AlertDialog(
              title: const Text('Error'),
              content: const Text('Please enter both username and password.'),
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
    }

    return Scaffold(
      appBar: AppBar(
        backgroundColor: primaryColor,
        leading: IconButton(
          icon: const Icon(Icons.arrow_back),
          color: Colors.white,
          onPressed: () {
            Navigator.pushReplacementNamed(context, '/');
          },
        ),
      ),
      body: Container(
        color: primaryColor,
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            const Center(
              child: Image(
                image: AssetImage('images/logo-white.png'),
                height: 300.0,
                width: 300.0,
              ),
            ),
            Expanded(
              child: Container(
                decoration: const BoxDecoration(
                  borderRadius: BorderRadius.only(
                    topLeft: Radius.circular(20),
                    topRight: Radius.circular(20),
                  ),
                  color: Colors.white,
                ),
                child: Padding(
                  padding: const EdgeInsets.symmetric(
                    horizontal: 30.0,
                    vertical: 40.0,
                  ),
                  child: Column(
                    mainAxisAlignment: MainAxisAlignment.start,
                    children: [
                      TextFormField(
                        controller: usernameController,
                        decoration: const InputDecoration(
                          labelText: 'Username',
                          border: OutlineInputBorder(),
                        ),
                      ),
                      const SizedBox(height: 20),
                      TextFormField(
                        controller: passwordController,
                        obscureText: true,
                        decoration: const InputDecoration(
                          suffixIcon: Icon(
                            Icons.visibility_off,
                            color: primaryColor,
                          ),
                          labelText: 'Password',
                          border: OutlineInputBorder(),
                        ),
                      ),
                      Align(
                        alignment: Alignment.centerRight,
                        child: TextButton(
                          onPressed: () {
                            showDialog(
                              context: context,
                              builder: (BuildContext context) {
                                return AlertDialog(
                                  title: const Text('Forgot Password'),
                                  content: TextField(
                                    controller: usernameController,
                                    decoration: const InputDecoration(
                                      labelText: 'Email',
                                      labelStyle: TextStyle(
                                        fontFamily: 'Poppins',
                                        fontWeight: FontWeight.bold,
                                        color: primaryColor,
                                      ),
                                    ),
                                  ),
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
                          },
                          child: const Text(
                            'Forgot Password?',
                            style: TextStyle(
                              fontFamily: 'Poppins',
                              fontWeight: FontWeight.bold,
                              fontSize: 13,
                              color: Colors.grey,
                            ),
                          ),
                        ),
                      ),
                      const SizedBox(height: 20),
                      GestureDetector(
                        onTap: signIn,
                        child: Container(
                          height: 45,
                          width: 150,
                          decoration: BoxDecoration(
                            borderRadius: BorderRadius.circular(30),
                            color: primaryColor,
                          ),
                          child: const Center(
                            child: Text(
                              'LOG IN',
                              style: TextStyle(
                                fontFamily: 'Poppins',
                                fontWeight: FontWeight.bold,
                                fontSize: 18,
                                color: contentColor,
                              ),
                            ),
                          ),
                        ),
                      ),
                      const SizedBox(height: 20),
                      Align(
                        alignment: Alignment.center,
                        child: Column(
                          mainAxisAlignment: MainAxisAlignment.center,
                          crossAxisAlignment: CrossAxisAlignment.center,
                          children: [
                            const Text(
                              "Don't have an account?",
                              style: TextStyle(
                                fontFamily: 'Poppins',
                                fontWeight: FontWeight.bold,
                                color: Colors.grey,
                              ),
                            ),
                            GestureDetector(
                              onTap: () {
                                Navigator.pushReplacementNamed(
                                  context,
                                  '/signup',
                                );
                              },
                              child: const Text(
                                "Sign up",
                                style: TextStyle(
                                  fontFamily: 'Poppins',
                                  fontWeight: FontWeight.bold,
                                  fontSize: 14,
                                  color: Colors.black,
                                ),
                              ),
                            ),
                          ],
                        ),
                      ),
                    ],
                  ),
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
