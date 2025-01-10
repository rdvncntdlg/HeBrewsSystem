import 'dart:convert';
import 'package:http/http.dart' as http;
import '../models/branch_model.dart';  // Adjust import to your model location

class BranchService {
  final String baseUrl = 'http://10.0.2.2:3000'; // Replace with your backend URL https://hebrewscafeserver.onrender.com

  Future<List<Branch>> fetchBranches() async {
    try {
      final response = await http.get(Uri.parse('$baseUrl/branches-app'));

      if (response.statusCode == 200) {
        List<dynamic> data = json.decode(response.body);
        return data.map((branchData) => Branch(
          branch_id: branchData['branch_id'],
          imageUrl: branchData['image_url'] ?? '',
          name: branchData['branchname'],
          location: branchData['branchlocation'],
        )).toList();
      } else {
        throw Exception('Failed to load branches');
      }
    } catch (e) {
      throw Exception('Error: $e');
    }
  }
}
