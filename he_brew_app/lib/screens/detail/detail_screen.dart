import 'package:flutter/material.dart';
import 'package:he_brew_app/theme.dart';
import 'package:he_brew_app/models/product_model.dart';
import 'package:he_brew_app/screens/detail/widget/add_to_cart.dart';
import 'package:he_brew_app/screens/detail/widget/description.dart';
import 'package:he_brew_app/screens/detail/widget/detail_app_bar.dart';
import 'package:he_brew_app/screens/detail/widget/items_details.dart';
import 'package:he_brew_app/screens/detail/widget/image_view.dart';
import 'package:shared_preferences/shared_preferences.dart';

class DetailScreen extends StatefulWidget {
  final Product product;
  const DetailScreen({super.key, required this.product});

  @override
  State<DetailScreen> createState() => _DetailScreenState();
}

class _DetailScreenState extends State<DetailScreen> with SingleTickerProviderStateMixin {
  int currentImage = 0;
  late AnimationController _animationController;
  late Animation<Offset> _slideAnimation;
  late Animation<double> _fadeAnimation;
  String? _token;  // Store the token here

  @override
  void initState() {
    super.initState();
    _getToken();  // Fetch the token when the screen is initialized

    _animationController = AnimationController(
      duration: const Duration(milliseconds: 600),
      vsync: this,
    );

    _slideAnimation = Tween<Offset>(begin: const Offset(0, 1), end: Offset.zero).animate(
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
      _token = prefs.getString('token');  // Retrieve the saved token
    });
  }

  @override
  Widget build(BuildContext context) {
    if (_token == null) {
      return Scaffold(
        body: Center(child: CircularProgressIndicator()), // Show loading indicator while token is being fetched
      );
    }

    return Scaffold(
      backgroundColor: contentColor,
      floatingActionButton: AddToCart(product: widget.product, token: _token!),  // Pass token to AddToCart
      floatingActionButtonLocation: FloatingActionButtonLocation.centerDocked,
      body: SafeArea(
        child: SingleChildScrollView(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              DetailAppBar(product: widget.product, token: _token!),  // Pass token to DetailAppBar
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