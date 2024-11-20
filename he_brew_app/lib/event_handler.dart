import 'package:he_brew_app/models/product_model.dart';
import 'package:he_brew_app/provider/add_to_cart_provider.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/foundation.dart';
import 'package:paymongo_sdk/paymongo_sdk.dart';
import 'checkout.dart';

const publicKey = String.fromEnvironment(
  'PUBLIC_KEY',
  defaultValue: 'pk_test_UreFG8bMTRwjAGkaQ5DUvCHN',
);
const secretKey = String.fromEnvironment(
  'SECRET_KEY',
  defaultValue: 'sk_test_ju9zFwNKzeeEHTCJ2NCJ3buf',
);
 // Import this to use kIsWeb

mixin PaymongoEventHandler<T extends StatefulWidget> on State<T> {
  final publicClient = const PaymongoClient<PaymongoPublic>(publicKey);
  final secretClient = const PaymongoClient<PaymongoSecret>(secretKey);
  final billing = const PayMongoBilling(
    name: 'Vince',
    email: "vince@gmail.com",
    phone: "09555841041",
    address: PayMongoAddress(
      line1: "test address",
      line2: "test 2 address",
      city: "Cotabato City",
      state: "Maguindanao",
      postalCode: "9600",
      country: "PH",
    ),
  );

  // If currentUrl isn't defined elsewhere, use this fallback or define it in your app.
  String get currentUrl => kIsWeb ? Uri.base.toString() : 'https://your-default-url.com';

  Future<void> gcashPayment(List<Product> cart) async {
    final provider = CartProvider.of(context, listen: true);
    final url = kIsWeb ? currentUrl : 'https://google.com'; // Use currentUrl if on web
    final source = SourceAttributes(
      type: "gcash",
      amount: provider.totalPrice,
      currency: 'PHP',
      redirect: Redirect(
        success: "${url}success",
        failed: "${url}failed",
      ),
      billing: billing,
    );
    final result = await publicClient.instance.source.create(source);
    final paymentUrl = result.attributes?.redirect.checkoutUrl ?? '';
    final successLink = result.attributes?.redirect.success ?? '';
    if (paymentUrl.isNotEmpty) {
      final response = await Navigator.push(
        context,
        CupertinoPageRoute(
          builder: (context) => CheckoutPage(
            url: paymentUrl,
            returnUrl: successLink,
            iFrameMode: !kIsWeb,
          ),
        ),
      );
      if (response) {
        final paymentSource = PaymentSource(id: result.id, type: "source");
        final paymentAttr = CreatePaymentAttributes(
          amount: provider.totalPrice,
          currency: 'PHP',
          description: "test gcash",
          source: paymentSource,
        );
        final createPayment =
            await secretClient.instance.payment.create(paymentAttr);
        debugPrint("==============================");
        debugPrint("||$createPayment||");
        debugPrint("==============================");
      }
    }
  }
}
