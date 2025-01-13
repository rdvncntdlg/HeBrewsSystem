import 'dart:convert';
import 'package:http/http.dart' as http;
import '../models/product_model.dart'; // Adjust import to your model location

class ProductService {
  final String baseUrl =
      'http://10.0.2.2:3000'; // Replace with your backend URL http://10.0.2.2:3000 https://hebrewscafeserver.onrender.com

  Future<List<Product>> fetchProduct(String branchId) async {
    try {
      final response = await http.get(Uri.parse('$baseUrl/products?branch_id=$branchId'));

      if (response.statusCode == 200) {
        List<dynamic> data = json.decode(response.body);
        return data
            .map((branchData) => Product(
                  menu_id: branchData['menu_id'],
                  name: branchData['name'],
                  description: branchData['description'],
                  image: branchData['image'] ?? '',
                  price: double.parse(branchData['price']
                      .toString()), // Convert String to double
                  category: branchData['category'],
                  quantity: 1, // Default quantity
                ))
            .toList();
      } else {
        throw Exception('Failed to load products');
      }
    } catch (e) {
      throw Exception('Error: $e');
    }
  }

  Future<List<Product>> fetchProductsByCategory(List<Product> allProducts, String category) async {
    if (category == 'Best Sellers') {
      return allProducts;  // Return all products if category is 'Best Sellers'
    } else {
      return allProducts.where((product) => product.category == category).toList();
    }
  }
}
