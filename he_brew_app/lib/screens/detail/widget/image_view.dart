import 'package:flutter/material.dart';

class ImageView extends StatelessWidget {
  final String image;
  const ImageView({
    super.key,
    required this.image,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: const BoxDecoration(
        image: DecorationImage(
          image: AssetImage('images/background.jpg'),
          fit: BoxFit.cover,
        ),
      ),
      child: Center(
        child: SizedBox(
          height: 250,
          child: SizedBox(
            child: Image.network(
                'https://hebrewscafeserver.onrender.com/${image}'),
          ),
        ),
      ),
    );
  }
}
