import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:he_brew_app/theme.dart';
import 'package:he_brew_app/models/product_model.dart';
import 'package:he_brew_app/screens/detail/widget/add_to_cart.dart';
import 'package:he_brew_app/screens/detail/widget/description.dart';
import 'package:he_brew_app/screens/detail/widget/detail_app_bar.dart';
import 'package:he_brew_app/screens/detail/widget/items_details.dart';
import 'package:he_brew_app/screens/detail/widget/image_view.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:http/http.dart' as http;

class DetailScreen extends StatefulWidget {
  final Product product;
  const DetailScreen({super.key, required this.product});

  @override
  State<DetailScreen> createState() => _DetailScreenState();
}

class _DetailScreenState extends State<DetailScreen>
    with SingleTickerProviderStateMixin {
  int currentImage = 0;
  late AnimationController _animationController;
  late Animation<Offset> _slideAnimation;
  late Animation<double> _fadeAnimation;
  String? _token; // Store the token here
  String? _orderId; // Store the order_id here

  @override
  void initState() {
    super.initState();
    _getToken(); // Fetch the token when the screen is initialized

    _animationController = AnimationController(
      duration: const Duration(milliseconds: 600),
      vsync: this,
    );

    _slideAnimation =
        Tween<Offset>(begin: const Offset(0, 1), end: Offset.zero).animate(
      CurvedAnimation(
        parent: _animationController,
        curve: Curves.easeOut,
      ),
    );

    _fadeAnimation = CurvedAnimation(
      parent: _animationController,
      curve: Curves.easeIn,
    );

    _animationController.forward();
  }

  @override
  void dispose() {
    _animationController.dispose();
    super.dispose();
  }

  // Function to fetch the token from SharedPreferences
  Future<void> _getToken() async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    setState(() {
      _token = prefs.getString('auth_token');
    });

    if (_token != null) {
      // Fetch the order_id when token is available
      await _fetchOrderId();
    }
  }

  // Function to fetch order_id from the backend
  Future<void> _fetchOrderId() async {
    final prefs = await SharedPreferences.getInstance();
    final customerId = prefs
        .getString('customer_id'); // Assuming customer_id is saved in prefs.

    final response = await http.get(
      Uri.parse(
          'https://your-backend-url/api/check-order?customer_id=$customerId'),
      headers: {
        'Authorization': 'Bearer $_token',
      },
    );

    if (response.statusCode == 200) {
      final data = json.decode(response.body);
      if (data['existing_order'] != null) {
        // Use the existing order_id
        setState(() {
          _orderId = data['existing_order'];
        });
      } else {
        // Generate a new order_id
        setState(() {
          _orderId = data['new_order_id'];
        });
      }
    } else {
      // Handle error if request fails
      print('Error fetching order_id');
    }
  }

  // Function to add item to the order
  Future<void> _addItemToOrder() async {
    if (_orderId != null) {
      final response = await http.post(
        Uri.parse('https://your-backend-url/api/add-to-order'),
        headers: {
          'Authorization': 'Bearer $_token',
          'Content-Type': 'application/json',
        },
        body: json.encode({
          'order_id': _orderId,
          'menu_id': widget
              .product.menu_id, // Assuming `menuId` is a property of Product
        }),
      );

      if (response.statusCode == 200) {
        // Successfully added to order
        print('Item added to order');
      } else {
        // Handle error
        print('Error adding item to order');
      }
    } else {
      print('No order_id available');
    }
  }

  @override
  Widget build(BuildContext context) {
    if (_token == null || _orderId == null) {
      return const Scaffold(
        body: Center(child: CircularProgressIndicator()),
      );
    }

    return Scaffold(
      backgroundColor: contentColor,
      floatingActionButton: AddToCart(
          product: widget.product,
          token: _token!,
          onAddToOrder: _addItemToOrder),
      floatingActionButtonLocation: FloatingActionButtonLocation.centerDocked,
      body: SafeArea(
        child: SingleChildScrollView(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              DetailAppBar(
                  product: widget.product,
                  token: _token!), // Pass token to DetailAppBar
              Hero(
                tag: widget.product.image,
                child: ImageView(
                  image: widget.product.image,
                ),
              ),
              Container(
                width: double.infinity,
                decoration: const BoxDecoration(
                  color: Colors.white,
                  borderRadius: BorderRadius.only(
                    topRight: Radius.circular(40),
                    topLeft: Radius.circular(40),
                  ),
                ),
                padding: const EdgeInsets.only(
                  left: 20,
                  right: 20,
                  top: 20,
                  bottom: 300,
                ),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.stretch,
                  children: [
                    SlideTransition(
                      position: _slideAnimation,
                      child: ItemsDetails(product: widget.product),
                    ),
                    const SizedBox(height: 20),
                    FadeTransition(
                      opacity: _fadeAnimation,
                      child: Container(
                        padding: const EdgeInsets.only(bottom: 100),
                        color: Colors.transparent,
                        child: Description(
                          description: widget.product.description,
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
    );
  }
}
