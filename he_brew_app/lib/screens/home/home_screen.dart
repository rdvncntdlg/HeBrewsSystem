import 'package:flutter/material.dart';
import 'package:he_brew_app/models/branch_model.dart';
import 'package:he_brew_app/provider/customer_provider.dart';
import 'package:he_brew_app/screens/home/widget/product_card.dart';
import 'package:he_brew_app/screens/home/widget/home_app_bar.dart';
import 'package:he_brew_app/screens/home/widget/recommend_card.dart';
import 'package:he_brew_app/screens/home/widget/search_bar.dart';
import 'package:he_brew_app/models/product_model.dart';
import 'package:he_brew_app/services/recommend_service.dart';
import 'package:he_brew_app/theme.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';
import 'package:he_brew_app/services/product_service.dart';
import 'package:provider/provider.dart';

class HomeScreen extends StatefulWidget {
  final Branch selectedBranch;

  const HomeScreen({super.key, required this.selectedBranch});

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  int selectedIndex = 0;
  late Future<List<Product>> products;
  late Future<List<Product>> recommend;
  late Future<List<Product>> filteredProducts;
  List<Product> filteredSearchProducts = [];
  final TextEditingController _searchController = TextEditingController();

  final List<String> categoryTitles = [
    "Best Sellers",
    "Coffee Creations",
    "Cold Brew",
    "Blended Drinks",
    "Fruit Slush",
    "Fizzy Pop",
    "Non-Coffee Delights",
    "Big Plates",
    "Snacks",
    "Pasta",
    "Platter",
    "Sandwiches",
  ];

  final List<IconData> categoryIcons = [
    FontAwesomeIcons.fireFlameCurved,
    FontAwesomeIcons.diceD6,
    FontAwesomeIcons.snowflake,
    FontAwesomeIcons.blender,
    FontAwesomeIcons.lemon,
    FontAwesomeIcons.mugHot,
    FontAwesomeIcons.martiniGlassCitrus,
    Icons.fastfood,
    FontAwesomeIcons.cookieBite,
    FontAwesomeIcons.utensils,
    FontAwesomeIcons.bowlFood,
    FontAwesomeIcons.breadSlice,
  ];

  @override
  void initState() {
    super.initState();
    products = ProductService().fetchProduct(widget.selectedBranch.branch_id);
    filteredProducts = products;
    String? customerId = Provider.of<UserProvider>(context, listen: false).customerId;
    recommend = RecommendService().fetchRecommend(customerId ?? '', widget.selectedBranch.branch_id);
  }

  void _handleSearch(String query) {
    if (query.isEmpty) {
      setState(() {
        filteredProducts = products;
      });
      return;
    }

    setState(() {
      products.then((productList) {
        final filteredList = productList
            .where((product) =>
                product.name.toLowerCase().contains(query.toLowerCase()))
            .toList();
        filteredProducts = Future.value(filteredList);
      });
    });
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
              MySearchBar(
                controller: _searchController,
                onSearch: _handleSearch,
              ),
              const SizedBox(height: 20),
              buildRecommendSection(),
              const SizedBox(height: 20),
              categoryItems(),
              const SizedBox(height: 20),
              buildCategoryHeader(),
              const SizedBox(height: 10),
              buildProductGrid(crossAxisCount),
            ],
          ),
        ),
      ),
    );
  }

  void _fetchCategory(String category) async {
    // Fetch the filtered products
    List<Product> filtered = await ProductService().fetchProductsByCategory(await products, category);

    // Update the state with the filtered products
    setState(() {
      filteredProducts = Future.value(filtered);  // Wrap the filtered list in a Future
    });
  }

  Widget buildRecommendSection() {
    return FutureBuilder<List<Product>>(
      future: recommend,
      builder: (context, snapshot) {
        if (snapshot.connectionState == ConnectionState.waiting) {
          return const Center(child: CircularProgressIndicator());
        } else if (snapshot.hasError) {
          return Center(child: Text('Error: ${snapshot.error}'));
        } else if (!snapshot.hasData || snapshot.data!.isEmpty) {
          return const Center(child: Text('No products to recommend'));
        } else {
          List<Product> categoryProducts = snapshot.data!;
          return Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              const Text(
                'You might like',
                textAlign: TextAlign.left,
                style: TextStyle(
                  fontFamily: 'Poppins',
                  fontSize: 24,
                  fontWeight: FontWeight.bold,
                ),
              ),
              const SizedBox(height: 10),
              Padding(
                padding: const EdgeInsets.only(bottom: 5), // Add padding to the bottom
                child: SizedBox(
                  height: 300, // Height for horizontal scrolling items
                  child: ListView.builder(
                    padding: EdgeInsets.zero,
                    scrollDirection: Axis.horizontal,
                    physics: const BouncingScrollPhysics(),
                    itemCount: categoryProducts.length,
                    itemBuilder: (context, index) {
                      return Padding(
                        padding: const EdgeInsets.only(right: 20, bottom: 20), // Space between cards
                        child: RecommendCard(
                          recommend: categoryProducts[index],
                          selectedBranch: widget.selectedBranch,
                        ),
                      );
                    },
                  ),
                ),
              ),
            ],
          );
        }
      },
    );
  }

  Widget buildCategoryHeader() {
    return Row(
      mainAxisAlignment: MainAxisAlignment.start,
      children: [
        Icon(categoryIcons[selectedIndex]),
        const SizedBox(width: 10),
        Text(
          categoryTitles[selectedIndex],
          style: const TextStyle(
            fontFamily: 'Poppins',
            fontSize: 25,
            fontWeight: FontWeight.w800,
          ),
        ),
      ],
    );
  }

  Widget buildProductGrid(int crossAxisCount) {
    return FutureBuilder<List<Product>>(
      future: filteredProducts,
      builder: (context, snapshot) {
        if (snapshot.connectionState == ConnectionState.waiting) {
          return const Center(child: CircularProgressIndicator());
        } else if (snapshot.hasError) {
          return Center(child: Text('Error: ${snapshot.error}'));
        } else if (!snapshot.hasData || snapshot.data!.isEmpty) {
          return const Center(child: Text('No products available'));
        } else {
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
                selectedBranch: widget.selectedBranch,
              );
            },
          );
        }
      },
    );
  }

  SizedBox categoryItems() {
    return SizedBox(
      height: 150,
      child: ListView.builder(
        scrollDirection: Axis.horizontal,
        itemCount: categoryTitles.length,
        physics: const BouncingScrollPhysics(),
        itemBuilder: (context, index) {
          return GestureDetector(
            onTap: () {
              setState(() {
                selectedIndex = index;
                _searchController.clear();
                _handleSearch(''); 
                _fetchCategory(categoryTitles[index]);
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
                  Icon(
                    categoryIcons[index],
                    size: 40,
                    color: selectedIndex == index
                        ? contentColor
                        : Colors.black,
                  ),
                  const SizedBox(height: 10),
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
