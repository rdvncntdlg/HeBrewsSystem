import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:he_brew_app/models/branch_model.dart'; // Import the Branch model
import 'package:he_brew_app/screens/nav_bar.dart'; // Import the BottomNavBar screen

class BranchCard extends StatelessWidget {
  final Branch branch;

  const BranchCard({super.key, required this.branch});

  @override
  Widget build(BuildContext context) {
    const double cardWidth = 200.0;
    const double cardHeight = 250.0;
    final double imageHeight = cardHeight * 0.6;

    return GestureDetector(
      onTap: () {
        showDialog(
          context: context,
          builder: (BuildContext context) {
            return AlertDialog(
              title: Text('Confirm Selection', style: GoogleFonts.poppins()),
              content: Text('Do you want to select ${branch.name}?',
                  style: GoogleFonts.poppins()),
              actions: [
                TextButton(
                  onPressed: () {
                    Navigator.of(context).pop();
                  },
                  style: TextButton.styleFrom(
                    textStyle: GoogleFonts.poppins(color: Colors.black), // Set text color to black
                  ),
                  child: const Text('Cancel'),
                ),
                TextButton(
                  onPressed: () {
                    Navigator.push(
                      context,
                      MaterialPageRoute(
                        builder: (context) => BottomHomeNavBar(
                          selectedBranch: branch, // Passing the selected branch
                        ),
                      ),
                    );
                  },
                  style: TextButton.styleFrom(
                    textStyle: GoogleFonts.poppins(color: Colors.black), // Set text color to black
                  ),
                  child: const Text('Select'),
                ),
              ],
            );
          },
        );
      },
      child: Container(
        width: cardWidth,
        height: cardHeight,
        decoration: BoxDecoration(
          color: Colors.white,
          borderRadius: BorderRadius.circular(15.0),
        ),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            ClipRRect(
              borderRadius: const BorderRadius.only(
                topLeft: Radius.circular(15),
                topRight: Radius.circular(15),
              ),
              child: Image.asset(
                branch.imageUrl,
                width: double.infinity,
                height: imageHeight,
                fit: BoxFit.cover,
                errorBuilder: (context, error, stackTrace) {
                  return Container(
                    color: Colors.grey,
                    child: Center(
                      child: Text(
                        'Image not available',
                        style: GoogleFonts.poppins(color: Colors.white),
                      ),
                    ),
                  );
                },
              ),
            ),
            const Spacer(),
            Padding(
              padding: const EdgeInsets.all(10.0),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    branch.name,
                    style: GoogleFonts.poppins(
                      fontSize: 14,
                      fontWeight: FontWeight.bold,
                      color: Colors.black,
                    ),
                  ),
                  const SizedBox(height: 3),
                  Text(
                    branch.location,
                    style: GoogleFonts.poppins(
                      fontSize: 12,
                      color: Colors.grey[600],
                    ),
                    overflow: TextOverflow.ellipsis,
                    maxLines: 1,
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}
