class HistoryItem {
  final String date;
  final String orderDetails;
  final double amount;
  final String orderID; // Add this field
  final String status;  // Add this field

  HistoryItem({
    required this.date,
    required this.orderDetails,
    required this.amount,
    required this.orderID, // Include this in the constructor
    required this.status,  // Include this in the constructor
  });
}
