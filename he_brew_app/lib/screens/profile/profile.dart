import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'package:he_brew_app/screens/login/login_screen.dart';
import 'package:he_brew_app/theme.dart';
import 'package:he_brew_app/screens/profile/widgets/address.dart';
import 'package:he_brew_app/screens/profile/widgets/order.dart';
import 'package:he_brew_app/screens/profile/widgets/payment_method.dart';
import 'package:shared_preferences/shared_preferences.dart';

class ProfileScreen extends StatefulWidget {
  const ProfileScreen({super.key});

  @override
  _ProfileScreenState createState() => _ProfileScreenState();
}

class _ProfileScreenState extends State<ProfileScreen> {
  String _name = 'Loading...';
  String _username = 'Loading...';

  @override
  void initState() {
    super.initState();
    _fetchUserData();
  }

  Future<void> saveToken(String token) async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.setString('auth_token', token);
  }

  Future<String?> getToken() async {
    final prefs = await SharedPreferences.getInstance();
    return prefs.getString('auth_token');
  }

  Future<void> login(String username, String password) async {
    final url = Uri.parse('http://localhost:3000/profile');

    final response = await http.post(url,
        body: json.encode({
          'username': username,
          'password': password,
        }),
        headers: {
          'Content-Type': 'application/json',
        });

    if (response.statusCode == 200) {
      final data = json.decode(response.body);
       print(data);
      final token = data['token']; // Get the token from response

      // Save token locally (could use shared_preferences)
      await SharedPreferences.getInstance().then((prefs) {
        prefs.setString('auth_token', token);
      });

      // Navigate to profile screen or whatever you need
    } else {
      // Handle login failure
    }
  }

  Future<void> _fetchUserData() async {
    final url = Uri.parse('http://localhost:3000/profile');

    // Get stored token
    final prefs = await SharedPreferences.getInstance();
    final token = prefs.getString('auth_token');

    if (token == null) {
      // Handle the case where there's no token (user is not logged in)
      Navigator.pushReplacement(
          context, MaterialPageRoute(builder: (context) => LoginScreen()));
      return;
    }

    try {
      final response = await http.get(
        url,
        headers: {
          'Authorization': 'Bearer $token', // Use token in Authorization header
          'Content-Type': 'application/json',
        },
      );

      if (response.statusCode == 200) {
        final data = json.decode(response.body);
        setState(() {
          _name =
              '${data['user']['firstname'] ?? 'First Name'} ${data['user']['lastname'] ?? 'Last Name'}';
          _username = data['user']['username'] ?? 'Username';
        });
      } else {
        throw Exception('Failed to load user data');
      }
    } catch (error) {
      print('Error fetching user data: $error');
      setState(() {
        _name = 'Error loading name';
        _username = 'Error loading username';
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        automaticallyImplyLeading: false,
        backgroundColor: contentColor,
        title: const Text(
          "Profile",
          style: TextStyle(fontFamily: 'Poppins', fontWeight: FontWeight.bold),
        ),
        centerTitle: true,
      ),
      body: Column(
        crossAxisAlignment: CrossAxisAlignment.center,
        children: [
          const CircleAvatar(
            radius: 50,
            backgroundImage: AssetImage('images/profile/sheena.jpg'),
          ),
          Text(
            _name,
            style: const TextStyle(fontSize: 24, fontWeight: FontWeight.bold),
          ),
          Text(
            _username,
            style: const TextStyle(fontSize: 16, color: Colors.grey),
          ),
          const SizedBox(height: 16),
          Expanded(
            child: ListView(
              padding: const EdgeInsets.all(16.0),
              children: [
                _buildFeatureBox(
                  icon: Icons.payment,
                  title: 'Payment Methods',
                  subtitle: 'Manage your payment options',
                  onTap: () {
                    Navigator.push(
                      context,
                      MaterialPageRoute(
                          builder: (context) => const PaymentMethodsScreen()),
                    );
                  },
                ),
                const SizedBox(height: 16),
                _buildFeatureBox(
                  icon: Icons.location_on,
                  title: 'Address',
                  subtitle: 'Manage your addresses',
                  onTap: () {
                    Navigator.push(
                        context,
                        MaterialPageRoute(
                            builder: (context) => const AddressScreen()));
                  },
                ),
                const SizedBox(height: 16),
                _buildFeatureBox(
                  icon: Icons.shopping_bag,
                  title: 'My Orders',
                  subtitle: 'View your order history',
                  onTap: () {
                    Navigator.push(
                        context,
                        MaterialPageRoute(
                            builder: (context) => const OrderScreen()));
                  },
                ),
                const SizedBox(height: 16),
                _buildEditProfileButton(context),
                const SizedBox(height: 16),
                _buildFeatureBox(
                  icon: Icons.logout,
                  title: 'Log Out',
                  onTap: () {
                    _handleLogout(context);
                  },
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildFeatureBox(
      {required IconData icon,
      required String title,
      String? subtitle,
      required VoidCallback onTap}) {
    return ListTile(
      leading: Icon(icon),
      title: Text(title),
      subtitle: subtitle != null ? Text(subtitle) : null,
      trailing: const Icon(Icons.arrow_forward_ios),
      onTap: onTap,
    );
  }

  Widget _buildEditProfileButton(BuildContext context) {
    return _buildFeatureBox(
      icon: Icons.edit,
      title: 'Edit Profile',
      onTap: () {
        _showEditProfileDialog(context);
      },
    );
  }

  void _showEditProfileDialog(BuildContext context) {
    TextEditingController nameController = TextEditingController(text: _name);
    TextEditingController usernameController =
        TextEditingController(text: _username);

    showDialog(
      context: context,
      builder: (BuildContext context) {
        return AlertDialog(
          title: const Text('Edit Profile'),
          content: Column(
            mainAxisSize: MainAxisSize.min,
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              TextField(
                controller: nameController,
                decoration: const InputDecoration(labelText: 'Name'),
              ),
              TextField(
                controller: usernameController,
                decoration: const InputDecoration(labelText: 'Username'),
              ),
            ],
          ),
          actions: [
            TextButton(
              onPressed: () {
                Navigator.pop(context);
              },
              child: const Text('Cancel'),
            ),
            ElevatedButton(
              onPressed: () {
                // Save changes and update profile details
                _updateProfile(nameController.text, usernameController.text);
                Navigator.pop(context); // Close the dialog
              },
              child: const Text('Save'),
            ),
          ],
        );
      },
    );
  }

  Future<void> _updateProfile(String newName, String newUsername) async {
    final url = Uri.parse('http://your-backend-api-url/profile/update');
    final response = await http.post(url,
        body: json.encode({
          'name': newName,
          'username': newUsername,
        }),
        headers: {
          'Content-Type': 'application/json',
        });

    if (response.statusCode == 200) {
      // Update local state with new values
      setState(() {
        _name = newName;
        _username = newUsername;
      });
    } else {
      print('Failed to update profile');
    }
  }

  void _handleLogout(BuildContext context) {
    // Perform any necessary cleanup, such as clearing user data
    // Navigate to the sign-in screen and clear the navigation stack
    Navigator.pushAndRemoveUntil(
      context,
      MaterialPageRoute(builder: (context) => const LoginScreen()),
      (Route<dynamic> route) => false,
    );
  }
}
