import 'package:flutter/material.dart';
import 'package:he_brew_app/models/product_model.dart';
import 'package:provider/provider.dart';

class CartProvider extends ChangeNotifier {
  final List<Product> _cart = [];
  List<Product> get cart => _cart;

  // Modified toggleFavorite method to accept both product and token
  void toggleFavorite(Product product, String token) {
    bool productFound = false;

    // Check if the product is already in the cart
    for (Product element in _cart) {
      if (element.menu_id == product.menu_id) {
        // If the product is already in the cart, increment its quantity
        element.quantity++;
        productFound = true;
        break;
      }
    }

    // If the product wasn't found, add it to the cart
    if (!productFound) {
      _cart.add(product);
    }

    // Optionally handle token logic here if needed (for API calls, etc.)
    // Token could be used for authentication or API calls here if needed

    notifyListeners();  // Notify listeners that the cart has changed
  }

  // Method to increment product quantity at a specific index
  void incrementQtn(int index) {
    _cart[index].quantity++;
    notifyListeners();
  }

  // Method to decrement product quantity at a specific index
  void decrementQtn(int index) {
    if (_cart[index].quantity > 1) {
      _cart[index].quantity--;
    } else {
      removeItem(index);  // If quantity is 1, remove the item
    }
    notifyListeners();
  }

  // Method to remove an item from the cart at a specific index
  void removeItem(int index) {
    _cart.removeAt(index);
    notifyListeners();
  }

  // Method to empty the entire cart
  void emptyCart() {
    _cart.clear();
    notifyListeners();
  }

  // Calculate the total price of all items in the cart
  double get totalPrice {
    double myTotal = 0.00;
    for (Product element in _cart) {
      myTotal += element.price * element.quantity;
    }
    return myTotal;
  }

  // Static method to access the CartProvider from anywhere in the widget tree
  static CartProvider of(BuildContext context, {bool listen = true}) {
    return Provider.of<CartProvider>(context, listen: listen);
  }
}
