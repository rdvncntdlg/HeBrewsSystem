import 'package:flutter/material.dart';
import 'package:he_brew_app/models/branch_model.dart';
import 'package:he_brew_app/screens/cart/carts_screen.dart';
import 'package:he_brew_app/screens/cart/order_success.dart';
import 'package:he_brew_app/screens/nav_bar.dart';
import 'package:webview_flutter/webview_flutter.dart';
import 'package:webview_flutter_android/webview_flutter_android.dart';
import 'package:webview_flutter_wkwebview/webview_flutter_wkwebview.dart';
import 'package:flutter/foundation.dart';


class WebViewPaymentPage extends StatefulWidget {
  final String url;
  final String orderNumber;
  final String orderType;
  final Branch selectedBranch;
  final String paymentMethod;
  final double totalPrice;
  final TextEditingController specialRequest;

  const WebViewPaymentPage({
    Key? key, 
    required this.url,
    required this.orderNumber,
    required this.orderType,
    required this.selectedBranch,
    required this.paymentMethod,
    required this.totalPrice,
    required this.specialRequest,
    }) : super(key: key);

  @override
  State<WebViewPaymentPage> createState() => _WebViewPaymentPageState();
}

class _WebViewPaymentPageState extends State<WebViewPaymentPage> {
  late final WebViewController _controller;

  @override
  void initState() {
    super.initState();

    // Ensure WebViewPlatform is initialized
    if (WebViewPlatform.instance == null) {
      if (defaultTargetPlatform == TargetPlatform.android) {
        WebViewPlatform.instance = AndroidWebViewPlatform();
      } else if (defaultTargetPlatform == TargetPlatform.iOS) {
        WebViewPlatform.instance = WebKitWebViewPlatform();
      }
    }

    // Initialize WebViewController
    _controller = WebViewController()
      ..setJavaScriptMode(JavaScriptMode.unrestricted)
      ..setNavigationDelegate(
        NavigationDelegate(
          onPageStarted: (String url) {
            print('Loading: $url');
          },
          onPageFinished: (String url) {
            print('Loaded: $url');
          },
          onNavigationRequest: (NavigationRequest request) {
            if (request.url.contains("payment-success")) {
              Navigator.pop(context, true); 
              Navigator.pushReplacement(
                context,
                MaterialPageRoute(
                  builder: (context) => OrderSuccessScreen(
                    orderNumber: widget.orderNumber,
                    orderType: widget.orderType ?? "Unknown",
                    selectedBranch: widget.selectedBranch,
                    totalPrice: widget.totalPrice,
                    specialRequest: widget.specialRequest,
                  ),
                ),
              );
            } else if (request.url.contains("payment-failed")) {
              Navigator.pop(context, false); // Payment failed
            }
            return NavigationDecision.navigate;
          },
        ),
      )
      ..loadRequest(Uri.parse(widget.url));
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text("Payment Gateway")),
      body: WebViewWidget(controller: _controller),
    );
  }
}
