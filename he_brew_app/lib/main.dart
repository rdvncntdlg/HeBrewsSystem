import 'package:flutter/material.dart';
import 'package:he_brew_app/models/branch_model.dart';
import 'package:he_brew_app/provider/add_to_cart_provider.dart';
import 'package:he_brew_app/provider/favorite_provider.dart';
import 'package:he_brew_app/screens/cart/order_success.dart';
import 'package:he_brew_app/screens/login/login_screen.dart';
import 'package:he_brew_app/screens/login/reg_screen.dart';
import 'package:he_brew_app/screens/nav_bar.dart';
import 'package:provider/provider.dart';
import 'package:he_brew_app/screens/login/welcome_screen.dart';
import 'package:he_brew_app/theme.dart';
import 'dart:io';
import 'package:webview_flutter_android/webview_flutter_android.dart';
import 'package:webview_flutter_wkwebview/webview_flutter_wkwebview.dart';
import 'package:webview_flutter/webview_flutter.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  runApp(const MainApp());
}

class MainApp extends StatelessWidget {
  const MainApp({super.key});

  @override
  Widget build(BuildContext context) => MultiProvider(
        providers: [
          ChangeNotifierProvider(create: (_) => CartProvider()),
          ChangeNotifierProvider(create: (_) => FavoriteProvider()),
        ],
        child: MaterialApp(
          debugShowCheckedModeBanner: false,
          theme: appTheme,
          initialRoute: '/',
          routes: {
            '/': (context) => const WelcomeScreen(),
            '/login': (context) => const LoginScreen(),
            '/signup': (context) => const RegScreen(),
            '/home': (context) {
              final Branch branch =
                  ModalRoute.of(context)!.settings.arguments as Branch;
              return BottomHomeNavBar(selectedBranch: branch);
            },
          },
        ),
      );
}
