import 'package:flutter/material.dart';
import 'package:he_brew_app/models/branch_model.dart';
import 'package:he_brew_app/screens/nav_bar.dart';
import 'package:webview_flutter/webview_flutter.dart';
import 'package:webview_flutter_android/webview_flutter_android.dart';
import 'package:webview_flutter_wkwebview/webview_flutter_wkwebview.dart';
import 'package:flutter/foundation.dart';

class WebviewFeedbackPage extends StatefulWidget {
  final String feedbackUrl;
  final Branch selectedBranch;
  final String orderNumber;
  const WebviewFeedbackPage({required this.feedbackUrl, required this.selectedBranch, required this.orderNumber, super.key});

  @override
  State<WebviewFeedbackPage> createState() => _WebviewFeedbackPageState();
}

class _WebviewFeedbackPageState extends State<WebviewFeedbackPage> {
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
          onPageStarted: (String feedbackUrl) {
            debugPrint('Loading: $feedbackUrl');
          },
          onPageFinished: (String feedbackUrl) {
            debugPrint('Loaded: $feedbackUrl');
          },
          onNavigationRequest: (NavigationRequest request) {
            if (request.url.contains("thank-you")) {
              Future.delayed(const Duration(seconds: 5), () {
                Navigator.pop(context, true);
                Navigator.pushReplacement(
                  context,
                  MaterialPageRoute(
                    builder: (context) => BottomHomeNavBar(
                      selectedBranch: widget.selectedBranch,
                    ),
                  ),
                );
              });
              return NavigationDecision.prevent; // Prevent further navigation
            } else if (request.url.contains("payment-failed")) {
              Navigator.pop(context, false); // Payment failed
              return NavigationDecision.prevent; // Prevent further navigation
            }
            return NavigationDecision.navigate; // Default navigation
          },
        ),
      )
      ..loadRequest(Uri.parse(widget.feedbackUrl));
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text("Feedback Form"),
            Text(
              "Order ID: ${widget.orderNumber}",
              style: TextStyle(fontSize: 16),
            ),
          ],
        ),
        leading: IconButton(
          icon: const Icon(Icons.arrow_back),
          onPressed: () {
            // Navigate to BottomHomeNavBar when back arrow is clicked
            Navigator.pushReplacement(
              context,
              MaterialPageRoute(
                builder: (context) => BottomHomeNavBar(
                  selectedBranch: widget.selectedBranch,
                ),
              ),
            );
          },
        ),
      ),
      body: WebViewWidget(controller: _controller),
    );
  }
}