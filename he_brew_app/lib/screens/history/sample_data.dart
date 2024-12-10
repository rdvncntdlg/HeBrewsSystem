import 'history_item.dart';
import 'package:flutter/material.dart';

final List<HistoryItem> sampleHistory = [
  HistoryItem(
    restaurant: 'Karam Beirut',
    dateTime: '22 May 2024 - 10:00 PM',
    orderId: '#20654834',
    status: 'Successful',
    statusColor: Colors.green,
    amount: 85.00,
  ),
  HistoryItem(
    restaurant: 'Karam Beirut',
    dateTime: '21 May 2024 - 09:00 PM',
    orderId: '#20654835',
    status: 'Canceled',
    statusColor: Colors.red,
    amount: 90.00,
  ),
  HistoryItem(
    restaurant: 'Karam Beirut',
    dateTime: '20 May 2024 - 08:30 PM',
    orderId: '#20654836',
    status: 'Successful',
    statusColor: Colors.green,
    amount: 95.00,
  ),
  HistoryItem(
    restaurant: 'Karam Beirut',
    dateTime: '19 May 2024 - 07:45 PM',
    orderId: '#20654837',
    status: 'Successful',
    statusColor: Colors.green,
    amount: 92.00,
  ),
];
