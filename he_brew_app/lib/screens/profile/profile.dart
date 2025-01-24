import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:he_brew_app/screens/history/order_history.dart';
import 'package:http/http.dart' as http;
import 'package:he_brew_app/screens/login/login_screen.dart';
import 'package:he_brew_app/theme.dart';
import 'package:he_brew_app/screens/profile/widgets/address.dart';
import 'package:shared_preferences/shared_preferences.dart';

class ProfileScreen extends StatefulWidget {
  const ProfileScreen({super.key});

  @override
  _ProfileScreenState createState() => _ProfileScreenState();
}

class _ProfileScreenState extends State<ProfileScreen> {
  String _firstname = 'Loading...';
  String _lastname = 'Loading...';
  String _username = 'Loading...';
  String? _customerId;


  @override
  void initState() {
    super.initState();
    _fetchUserData();
  }

  Future<void> _fetchUserData() async {
    final url = Uri.parse('https://hebrewscafeserver.onrender.com/api/profile');

    final prefs = await SharedPreferences.getInstance();
    final token = prefs.getString('auth_token');

    if (token == null) {
      Navigator.pushReplacement(context,
          MaterialPageRoute(builder: (context) => const LoginScreen()));
      return;
    }

    try {
      final response = await http.get(
        url,
        headers: {
          'Authorization': 'Bearer $token',
          'Content-Type': 'application/json',
        },
      );

      if (response.statusCode == 200) {
        final data = json.decode(response.body);
        setState(() {
          _firstname = data['user']['firstname'] ?? 'First Name';
          _lastname = data['user']['lastname'] ?? 'Last Name';
          _username = data['user']['username'] ?? 'Username';
          _customerId = data['user']['customer_id'];
        });
      } else {
        throw Exception('Failed to load user data');
      }
    } catch (error) {
      setState(() {
        _firstname = 'Error';
        _lastname = 'Error';
        _username = 'Error';
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
            '$_firstname $_lastname',
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
                            builder: (context) => const HistoryScreen()));
                  },
                ),
                const SizedBox(height: 16),
                _buildFeatureBox(
                  icon: Icons.edit,
                  title: 'Edit Profile',
                  onTap: () {
                    _showEditProfileDialog(context);
                  },
                ),
                const SizedBox(height: 16),
                _buildFeatureBox(
                  icon: Icons.lock,
                  title: 'Change Password',
                  onTap: () {
                    _showChangePasswordDialog(context);
                  },
                ),
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

  void _showEditProfileDialog(BuildContext context) {
    TextEditingController firstnameController =
        TextEditingController(text: _firstname);
    TextEditingController lastnameController =
        TextEditingController(text: _lastname);
    TextEditingController usernameController =
        TextEditingController(text: _username);

    showDialog(
      context: context,
      builder: (BuildContext context) {
        return AlertDialog(
          title: const Text('Edit Profile'),
          content: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              TextField(
                controller: firstnameController,
                decoration: const InputDecoration(labelText: 'First Name'),
              ),
              TextField(
                controller: lastnameController,
                decoration: const InputDecoration(labelText: 'Last Name'),
              ),
              TextField(
                controller: usernameController,
                decoration: const InputDecoration(labelText: 'Username'),
              ),
            ],
          ),
          actions: [
            TextButton(
              onPressed: () => Navigator.pop(context),
              child: const Text('Cancel'),
            ),
            ElevatedButton(
              onPressed: () {
                _updateProfile(
                  firstnameController.text,
                  lastnameController.text,
                  usernameController.text,
                );
                Navigator.pop(context);
              },
              child: const Text('Save'),
            ),
          ],
        );
      },
    );
  }

  Future<void> _updateProfile(
      String firstname, String lastname, String username) async {
    if (_customerId == null) {
      return;
    }

    final url =
        Uri.parse('https://hebrewscafeserver.onrender.com/api/profile/update');
    final response = await http.post(url,
        body: json.encode({
          'firstname': firstname,
          'lastname': lastname,
          'username': username,
          'customer_id': _customerId,
        }),
        headers: {'Content-Type': 'application/json'});

    if (response.statusCode == 200) {
      setState(() {
        _firstname = firstname;
        _lastname = lastname;
        _username = username;
      });

      ScaffoldMessenger.of(context).showSnackBar(
      const SnackBar(
        content: Text('Profile updated successfully!'),
        backgroundColor: Colors.green,
      ),
    );
    } else {
      ScaffoldMessenger.of(context).showSnackBar(
      const SnackBar(
        content: Text('Failed to update profile'),
        backgroundColor: Colors.red,
      ));
    }
  }

  void _showChangePasswordDialog(BuildContext context) {
    TextEditingController currentPasswordController = TextEditingController();
    TextEditingController newPasswordController = TextEditingController();
    TextEditingController confirmPasswordController = TextEditingController();

    showDialog(
      context: context,
      builder: (BuildContext context) {
        return AlertDialog(
          title: const Text('Change Password'),
          content: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              TextField(
                controller: currentPasswordController,
                obscureText: true,
                decoration: const InputDecoration(labelText: 'Current Password'),
              ),
              TextField(
                controller: newPasswordController,
                obscureText: true,
                decoration: const InputDecoration(labelText: 'New Password'),
              ),
              TextField(
                controller: confirmPasswordController,
                obscureText: true,
                decoration: const InputDecoration(
                    labelText: 'Confirm New Password'),
              ),
            ],
          ),
          actions: [
            TextButton(
              onPressed: () => Navigator.pop(context),
              child: const Text('Cancel'),
            ),
            ElevatedButton(
              onPressed: () {
                if (newPasswordController.text ==
                    confirmPasswordController.text) {
                  _changePassword(
                    currentPasswordController.text,
                    newPasswordController.text,
                  );
                  Navigator.pop(context);
                } else {
                  ScaffoldMessenger.of(context).showSnackBar(
                  const SnackBar(
                    content: Text('Password do not match!'),
                    backgroundColor: Colors.red,
                  ));
                }
              },
              child: const Text('Save'),
            ),
          ],
        );
      },
    );
  }

  Future<void> _changePassword(
      String currentPassword, String newPassword) async {
    final url =
        Uri.parse('https://hebrewscafeserver.onrender.com/api/profile/change-password');
    final response = await http.post(url,
        body: json.encode({
          'currentPassword': currentPassword,
          'newPassword': newPassword,
          'customer_id': _customerId,
        }),
        headers: {'Content-Type': 'application/json'});

    if (response.statusCode == 200) {
      ScaffoldMessenger.of(context).showSnackBar(
      const SnackBar(
        content: Text('Password change successfully!'),
        backgroundColor: Colors.green,
      ));
    } else {
      ScaffoldMessenger.of(context).showSnackBar(
      const SnackBar(
        content: Text('Failed to change password'),
        backgroundColor: Colors.red,
      ));
    }
  }

  void _handleLogout(BuildContext context) {
    Navigator.pushAndRemoveUntil(
      context,
      MaterialPageRoute(builder: (context) => const LoginScreen()),
      (Route<dynamic> route) => false,
    );
  }
}
