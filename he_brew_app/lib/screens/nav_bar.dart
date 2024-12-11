import 'package:flutter/material.dart';
import 'package:he_brew_app/models/branch_model.dart'; // Import the Branch model
import 'package:he_brew_app/screens/cart/carts_screen.dart';
import 'package:he_brew_app/screens/favorite/favorite.dart';
import 'package:he_brew_app/screens/home/home_screen.dart';
import 'package:he_brew_app/screens/history/order_history.dart';
import 'package:he_brew_app/screens/profile/profile.dart';
import 'package:he_brew_app/theme.dart';

class BottomNavBar extends StatefulWidget {
  final Branch selectedBranch; // Required parameter

  const BottomNavBar({super.key, required this.selectedBranch});

  @override
  State<BottomNavBar> createState() => _BottomNavBarState();
}

class _BottomNavBarState extends State<BottomNavBar> {
  int currentInd = 0;

  // Remove const from this list
  late List<Widget> screens;

  @override
  void initState() {
    super.initState();

    // Initialize screens list with dynamic data
    screens = [
      HomeScreen(selectedBranch: widget.selectedBranch),  // Pass selectedBranch here
      const FavoriteScreen(),
      CartScreen(selectedBranch: widget.selectedBranch), // Pass selectedBranch here
      const HistoryScreen(),
      const ProfileScreen(),
    ];
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      floatingActionButton: FloatingActionButton(
        onPressed: () {
          setState(() {
            currentInd = 2;
          });
        },
        shape: const CircleBorder(),
        backgroundColor: primaryColor,
        child: const Icon(
          Icons.shopping_cart,
          color: Colors.white,
          size: 35,
        ),
      ),
      floatingActionButtonLocation: FloatingActionButtonLocation.centerDocked,
      bottomNavigationBar: BottomAppBar(
        elevation: 1,
        height: 60,
        color: Colors.white,
        shape: const CircularNotchedRectangle(),
        notchMargin: 10,
        clipBehavior: Clip.antiAliasWithSaveLayer,
        child: Row(
          mainAxisSize: MainAxisSize.max,
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            IconButton(
              onPressed: () {
                setState(() {
                  currentInd = 0;
                });
              },
              icon: Icon(
                Icons.home,
                size: 30,
                color: currentInd == 0 ? primaryColor : Colors.grey.shade400,
              ),
            ),
            IconButton(
              onPressed: () {
                setState(() {
                  currentInd = 1;
                });
              },
              icon: Icon(
                Icons.favorite,
                size: 30,
                color: currentInd == 1 ? primaryColor : Colors.grey.shade400,
              ),
            ),
            const SizedBox(
              width: 15,
            ),
            IconButton(
              onPressed: () {
                setState(() {
                  currentInd = 3;
                });
              },
              icon: Icon(
                Icons.history,
                size: 30,
                color: currentInd == 3 ? primaryColor : Colors.grey.shade400,
              ),
            ),
            IconButton(
              onPressed: () {
                setState(() {
                  currentInd = 4;
                });
              },
              icon: Icon(
                Icons.person,
                size: 30,
                color: currentInd == 4 ? primaryColor : Colors.grey.shade400,
              ),
            ),
          ],
        ),
      ),
      body: screens[currentInd],  // Display the selected screen
    );
  }
}