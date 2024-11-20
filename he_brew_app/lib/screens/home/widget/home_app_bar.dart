import 'package:flutter/material.dart';
// ignore: unused_import
class HomeAppBar extends StatelessWidget {
  final String branchName; // Add the branchName parameter

  const HomeAppBar({super.key, required this.branchName}); // Required parameter

  @override
  Widget build(BuildContext context) {
    return Row(
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      children: [
        // Image logo
        const Image(
          image: AssetImage("images/cream_logo.png"),
          height: 50,
        ),
        // Display the branch name
        Text(
          branchName, // Display the branch name here
          style: const TextStyle(
            fontSize: 20,
            fontWeight: FontWeight.bold,
          ),
        ),
      ],
    );
  }
}
