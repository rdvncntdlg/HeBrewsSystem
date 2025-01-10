import 'package:flutter/material.dart';
import 'package:he_brew_app/theme.dart';
import 'package:he_brew_app/provider/favorite_provider.dart';
import 'package:provider/provider.dart';
import 'package:shared_preferences/shared_preferences.dart';

class FavoriteScreen extends StatefulWidget {
  const FavoriteScreen({super.key});

  @override
  State<FavoriteScreen> createState() => _FavoriteScreenState();
}

class _FavoriteScreenState extends State<FavoriteScreen> {
  late FavoriteProvider provider;

  @override
  Future<void> didChangeDependencies() async {
    super.didChangeDependencies();
    provider = FavoriteProvider.of(context);

    final prefs = await SharedPreferences.getInstance();
    final token = prefs.getString('auth_token');

    // Ensure token is not null and not empty
    if (token != null && token.isNotEmpty) {
      await provider.initialize(token); // Make sure the initialization is awaited
    } else {
      // Handle the case where token is null or empty (optional)
      print('Token is not available');
    }
  }

  @override
  Widget build(BuildContext context) {
    return Consumer<FavoriteProvider>(
      builder: (context, provider, child) {
        final finalList = provider.favorites;

        return Scaffold(
          backgroundColor: contentColor,
          appBar: AppBar(
            backgroundColor: contentColor,
            title: const Text(
              "Favorites",
              style: TextStyle(fontFamily: 'Poppins', fontWeight: FontWeight.bold),
            ),
            centerTitle: true,
          ),
          body: finalList.isEmpty
              ? Center(child: Text("No favorites yet"))
              : ListView.builder(
                  itemCount: finalList.length,
                  itemBuilder: (context, index) {
                    final favoriteItem = finalList[index];

                    return Stack(
                      children: [
                        Padding(
                          padding: const EdgeInsets.all(15),
                          child: Container(
                            padding: const EdgeInsets.all(10),
                            width: double.infinity,
                            decoration: BoxDecoration(
                              borderRadius: BorderRadius.circular(20),
                              color: Colors.white,
                            ),
                            child: Row(
                              children: [
                                Container(
                                  padding: const EdgeInsets.all(10),
                                  width: 85,
                                  height: 85,
                                  decoration: BoxDecoration(
                                    color: contentColor,
                                    borderRadius: BorderRadius.circular(20),
                                  ),
                                  child: Image.network('https://hebrewscafeserver.onrender.com/${favoriteItem.image}'),
                                ),
                                const SizedBox(width: 10),
                                Column(
                                  crossAxisAlignment: CrossAxisAlignment.start,
                                  children: [
                                    Text(
                                      favoriteItem.name,
                                      style: const TextStyle(
                                        fontFamily: 'Poppins',
                                        fontWeight: FontWeight.bold,
                                        fontSize: 16,
                                      ),
                                    ),
                                    const SizedBox(height: 5),
                                    Text(
                                      favoriteItem.category,
                                      style: TextStyle(
                                        fontFamily: 'Poppins',
                                        fontWeight: FontWeight.bold,
                                        color: Colors.grey.shade400,
                                        fontSize: 16,
                                      ),
                                    ),
                                    const SizedBox(height: 10),
                                    Text(
                                      "₱${favoriteItem.price}0",
                                      style: const TextStyle(
                                        fontFamily: 'Poppins',
                                        fontWeight: FontWeight.bold,
                                        fontSize: 14,
                                      ),
                                    ),
                                  ],
                                )
                              ],
                            ),
                          ),
                        ),
                        Positioned(
                          top: 50,
                          right: 35,
                          child: GestureDetector(
                            onTap: () async {
                              final prefs = await SharedPreferences.getInstance();
                              final token = prefs.getString('auth_token'); // Fetch the token from SharedPreferences

                              if (token != null && token.isNotEmpty) {
                                // Proceed to remove the favorite with the valid token
                                await provider.removeFavorite(favoriteItem, token);
                              } else {
                                // Handle the case where token is null or empty
                                print('Token is not available');
                              }
                            },
                            child: const Icon(
                              Icons.delete,
                              color: Colors.red,
                              size: 25,
                            ),
                          ),
                        ),
                      ],
                    );
                  },
                ),
        );
      },
    );
  }
}
