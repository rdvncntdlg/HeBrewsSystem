import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'package:he_brew_app/provider/customer_provider.dart';
import 'package:provider/provider.dart';
import 'package:he_brew_app/screens/history/history_item.dart';

class HistoryService {
  // Method to fetch order history
  Future<List<HistoryItem>> fetchOrderHistory(final customerId) async {
    final url = 'https://hebrewscafeserver.onrender.com/customer/order-history/$customerId'; // Replace with your API URL
    final response = await http.get(Uri.parse(url));

    if (response.statusCode == 200) {
      List<dynamic> jsonResponse = json.decode(response.body);
      return jsonResponse.map((data) => HistoryItem.fromJson(data)).toList();
    } else {
      throw Exception('Failed to load order history');
    }
  }
}

class OrderHistoryFetcher {
  // Fetch order history from the API using the customer ID
  Future<List<HistoryItem>> fetchHistory(BuildContext context) async {
    final userProvider = Provider.of<UserProvider>(context, listen: false); // Get the UserProvider
    final customerId = userProvider.customerId; // Get customer ID

    final historyService = HistoryService(); // Instantiate HistoryService
    return await historyService.fetchOrderHistory(customerId); // Fetch data
  }
}
