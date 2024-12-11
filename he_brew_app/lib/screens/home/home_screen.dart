import 'package:flutter/material.dart';
import 'package:he_brew_app/models/branch_model.dart';
import 'package:he_brew_app/screens/home/widget/product_card.dart';
import 'package:he_brew_app/screens/home/widget/home_app_bar.dart'; // Import the new file
import 'package:he_brew_app/screens/home/widget/search_bar.dart';
import 'package:he_brew_app/models/product_model.dart';
import 'package:he_brew_app/theme.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';// Import the service to fetch products
import 'package:he_brew_app/services/product_service.dart'; // Import the service to fetch products

class HomeScreen extends StatefulWidget {
  final Branch selectedBranch;

  const HomeScreen({Key? key, required this.selectedBranch}) : super(key: key);

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  int selectedIndex = 0;
  late Future<List<Product>> products;

  // Category data moved outside of build() method
  final List<String> categoryTitles = [
    "Best Sellers",
    "Iced Drinks",
    "Blended Coffee",
    "Milkshakes",
    "Fruit Slush",
    "Iced Tea",
    "Big Plates",
    "Snacks",
    "Pasta",
    "Sandwiches",
  ];

  final List<IconData> categoryIcons = [
    FontAwesomeIcons.fireFlameCurved,
    FontAwesomeIcons.diceD6,
    FontAwesomeIcons.mugHot,
    FontAwesomeIcons.blender,
    FontAwesomeIcons.appleWhole,
    FontAwesomeIcons.martiniGlassCitrus,
    FontAwesomeIcons.utensils,
    Icons.fastfood,
    FontAwesomeIcons.bowlFood,
    FontAwesomeIcons.breadSlice,
  ];

  // Fetching the products when the screen is loaded
  @override
  void initState() {
    super.initState();
    products = ProductService().fetchProduct(widget.selectedBranch.branch_id); // Fetch products from API
  }

  @override
  Widget build(BuildContext context) {
    double screenWidth = MediaQuery.of(context).size.width;
    int crossAxisCount = screenWidth ~/ 200;

    return Scaffold(
      backgroundColor: Colors.white,
      body: SingleChildScrollView(
        child: Padding(
          padding: const EdgeInsets.symmetric(vertical: 20, horizontal: 40),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.center,
            children: [
              const SizedBox(height: 35),
              HomeAppBar(branchName: widget.selectedBranch.name), // Corrected usage
              const SizedBox(height: 20),
              const MySearchBar(),
              const SizedBox(height: 20),
              categoryItems(),
              const SizedBox(height: 20),
              Row(
                mainAxisAlignment: MainAxisAlignment.start,
                children: [
                  Icon(categoryIcons[selectedIndex]),
                  Text(
                    categoryTitles[selectedIndex],
                    style: const TextStyle(
                      fontFamily: 'Poppins',
                      fontSize: 25,
                      fontWeight: FontWeight.w800,
                    ),
                  ),
                ],
              ),
              const SizedBox(height: 10),
              FutureBuilder<List<Product>>(
                future: products,
                builder: (context, snapshot) {
                  if (snapshot.connectionState == ConnectionState.waiting) {
                    return Center(child: CircularProgressIndicator());
                  } else if (snapshot.hasError) {
                    return Center(child: Text('Error: ${snapshot.error}'));
                  } else if (!snapshot.hasData || snapshot.data!.isEmpty) {
                    return Center(child: Text('No products available'));
                  } else {
                    // Get products based on selected category
                    List<Product> categoryProducts = snapshot.data!;
                    return GridView.builder(
                      padding: EdgeInsets.zero,
                      physics: const NeverScrollableScrollPhysics(),
                      shrinkWrap: true,
                      gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
                        crossAxisCount: crossAxisCount,
                        childAspectRatio: 0.75,
                        crossAxisSpacing: 20,
                        mainAxisSpacing: 20,
                        mainAxisExtent: 300,
                      ),
                      itemCount: categoryProducts.length,
                      itemBuilder: (context, index) {
                        return ProductCard(
                          product: categoryProducts[index],
                          selectedBranch: widget.selectedBranch, // Pass selectedBranch here
                        );
                      },
                    );
                  }
                },
              ),
            ],
          ),
        ),
      ),
    );
  }

  // Corrected categoryItems method to use categoryTitles and categoryIcons properly
  SizedBox categoryItems() {
    return SizedBox(
      height: 150,
      child: ListView.builder(
        scrollDirection: Axis.horizontal,
        itemCount: categoryTitles.length, // Use categoryTitles length
        physics: const BouncingScrollPhysics(),
        itemBuilder: (context, index) {
          return GestureDetector(
            onTap: () {
              setState(() {
                selectedIndex = index;
              });
            },
            child: Container(
              width: 125,
              padding: const EdgeInsets.all(5),
              decoration: BoxDecoration(
                borderRadius: BorderRadius.circular(15),
                color: selectedIndex == index
                    ? primaryColor
                    : Colors.transparent,
              ),
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Container(
                    height: 80,
                    width: 80,
                    decoration: BoxDecoration(
                      borderRadius: BorderRadius.circular(10),
                      image: DecorationImage(
                        image: AssetImage('assets/icons/${categoryIcons[index]}.png'), // Add proper icon path
                        fit: BoxFit.cover,
                      ),
                    ),
                  ),
                  const SizedBox(height: 5),
                  Text(
                    categoryTitles[index],
                    textAlign: TextAlign.center,
                    style: TextStyle(
                      fontFamily: 'Poppins',
                      fontSize: 14,
                      fontWeight: FontWeight.bold,
                      color: selectedIndex == index
                          ? contentColor
                          : Colors.black,
                    ),
                  ),
                ],
              ),
            ),
          );
        },
      ),
    );
  }
}