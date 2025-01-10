import 'package:flutter/material.dart';

class UserProvider extends ChangeNotifier {
  String? _customerId;

  String? get customerId => _customerId;

  void setCustomerId(String id) {
    _customerId = id;
    notifyListeners();
  }
}
