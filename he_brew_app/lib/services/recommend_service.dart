import 'dart:convert';
import 'package:http/http.dart' as http;
import '../models/product_model.dart'; // Adjust import to your model location

class RecommendService {
  final String baseUrl =
      'https://hebrewscafeserver.onrender.com'; // Replace with your backend URL http://10.0.2.2:3000 https://hebrewscafeserver.onrender.com

  Future<List<Product>> fetchRecommend(String? customerId, String branchId) async {

    try {
      final response = await http.post(
        Uri.parse('$baseUrl/api/recommend'),
        headers: {
          'Content-Type': 'application/json', // Ensure you're sending JSON
        },
        body: json.encode({
          'branch_id': branchId,
          'customer_id': customerId,
        }),
      );

      if (response.statusCode == 200) {
        Map<String, dynamic> data = json.decode(response.body);
        List<dynamic> recommendations = data['recommendations'];
        return recommendations
            .map((branchData) => Product(
                  menu_id: branchData['menu_id'] ?? '',
                  name: branchData['itemname'] ?? '',
                  description: branchData['description'] ?? '',
                  image: branchData['imageurl'] ?? 'th',
                  price: double.parse(branchData['price']
                      .toString() ?? '0.0'), // Convert String to double
                  category: branchData['category'] ?? '',
                  quantity: 1, // Default quantity
                ))
            .toList();
      } else {
        throw Exception('Failed to load products');
      }
    } catch (e) {
      throw Exception('Errors: $e');
    }
  }
}