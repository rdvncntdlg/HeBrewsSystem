import 'package:intl/intl.dart';

class HistoryItem {
  final String? date;
  final List<OrderDetail>? orderDetails;
  final double? amount;
  final String? orderID;
  final String? status;
  final String? branchName;

  HistoryItem({
    this.date,
    this.orderDetails,
    this.amount,
    this.orderID,
    this.status,
    this.branchName,
  });

  factory HistoryItem.fromJson(Map<String, dynamic> json) {

    // Parse and format the date to only include YYYY-MM-DD
    String? formattedDate;
    if (json['date'] != null) {
      final DateTime parsedDate = DateTime.parse(json['date']);
      formattedDate = DateFormat('yyyy-MM-dd').format(parsedDate);
    }

    return HistoryItem(
      date: formattedDate,  // Use the formatted date
      orderDetails: _parseOrderDetails(json['orderDetails']),
      amount: json['amount'] == null
          ? null
          : double.tryParse(json['amount'].toString()),  // Parse the amount to double
      orderID: json['orderID'],
      status: json['status'],
      branchName: json['branchname'],
    );
  }

  // Helper method to parse orderDetails safely
  static List<OrderDetail> _parseOrderDetails(dynamic orderDetailsJson) {
    if (orderDetailsJson == null) {
      return [];
    }

    // Check if it's a list or not and then proceed
    if (orderDetailsJson is List) {
      return orderDetailsJson
          .map((detail) => OrderDetail.fromJson(detail))
          .toList();
    }

    // If it's not a list, return an empty list or handle it differently
    print("orderDetails is not a list: $orderDetailsJson");
    return [];
  }
}

class OrderDetail {
  final String item;
  final int quantity;
  final double price;
  final String categoryName;

  OrderDetail({
    required this.item,
    required this.quantity,
    required this.price,
    required this.categoryName,
  });

  factory OrderDetail.fromJson(Map<String, dynamic> json) {
    return OrderDetail(
      item: json['itemName'] ?? '',
      quantity: json['quantity'] ?? 0,
      price: json['priceTotal'] == null
          ? 0.0
          : double.tryParse(json['priceTotal'].toString()) ?? 0.0,
      categoryName: json['categoryName'] ?? '',
    );
  }
}
