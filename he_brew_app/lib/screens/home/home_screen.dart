import 'package:flutter/material.dart';
import 'package:he_brew_app/models/branch_model.dart';
import 'package:he_brew_app/models/category.dart';
import 'package:he_brew_app/screens/home/widget/product_card.dart';
import 'package:he_brew_app/screens/home/widget/home_app_bar.dart';
import 'package:he_brew_app/screens/home/widget/search_bar.dart';
import 'package:he_brew_app/models/product_model.dart';
import 'package:he_brew_app/theme.dart';
import 'package:he_brew_app/services/category_service.dart';
import 'package:he_brew_app/services/product_service.dart';

class HomeScreen extends StatefulWidget {
  final Branch selectedBranch;

  const HomeScreen({Key? key, required this.selectedBranch}) : super(key: key);

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  int selectedIndex = 0;
  late Future<List<Product>> products;
  late Future<List<Category>> categories;

  // Fetching the products and categories when the screen is loaded
  @override
  void initState() {
    super.initState();
    products = ProductService().fetchProduct(
        widget.selectedBranch.branch_id); // Fetch products from API
    categories =
        CategoryService().fetchCategories(); // Fetch categories from API
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
              HomeAppBar(branchName: widget.selectedBranch.name),
              const SizedBox(height: 20),
              const MySearchBar(),
              const SizedBox(height: 20),
              categoryItems(),
              const SizedBox(height: 20),
              Row(
                mainAxisAlignment: MainAxisAlignment.start,
                children: [
                  FutureBuilder<List<Category>>(
                    future: categories,
                    builder: (context, snapshot) {
                      if (snapshot.connectionState == ConnectionState.waiting) {
                        return const CircularProgressIndicator();
                      } else if (snapshot.hasError) {
                        return Text('Error: ${snapshot.error}');
                      } else if (!snapshot.hasData || snapshot.data!.isEmpty) {
                        return const Text('No categories available');
                      } else {
                        List<Category> categoryList = snapshot.data!;
                        return Text(
                          categoryList[selectedIndex].title,
                          style: const TextStyle(
                            fontFamily: 'Poppins',
                            fontSize: 25,
                            fontWeight: FontWeight.w800,
                          ),
                        );
                      }
                    },
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
                    List<Product> categoryProducts = snapshot.data!;
                    // Filter the products based on selected category id
                    List<Product> filteredProducts = categoryProducts
                        .where((product) =>
                            product.category ==
                            snapshot.data![selectedIndex].category)
                        .toList();

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
                      itemCount: filteredProducts.length,
                      itemBuilder: (context, index) {
                        return ProductCard(
                          product: filteredProducts[index],
                          selectedBranch: widget.selectedBranch,
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

  // Updated categoryItems method to use categoryTitles and categoryIcons properly
  SizedBox categoryItems() {
    return SizedBox(
      height: 150,
      child: FutureBuilder<List<Category>>(
        future: categories,
        builder: (context, snapshot) {
          if (snapshot.connectionState == ConnectionState.waiting) {
            return Center(child: CircularProgressIndicator());
          } else if (snapshot.hasError) {
            return Center(child: Text('Error: ${snapshot.error}'));
          } else if (!snapshot.hasData || snapshot.data!.isEmpty) {
            return Center(child: Text('No categories available'));
          } else {
            List<Category> categoryList = snapshot.data!;
            return ListView.builder(
              scrollDirection: Axis.horizontal,
              itemCount: categoryList.length,
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
                        const SizedBox(height: 5),
                        Text(
                          categoryList[index].title,
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
            );
          }
        },
      ),
    );
  }
}
