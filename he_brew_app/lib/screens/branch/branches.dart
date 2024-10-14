import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

class BranchSelection extends StatelessWidget {
  const BranchSelection({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.black,
      appBar: AppBar(
        backgroundColor: Colors.black,
        elevation: 0,
        title: Text(
          'Select a Branch',
          style: GoogleFonts.poppins(color: Colors.white),
        ),
      ),
      body: SingleChildScrollView(
        child: Padding(
          padding: const EdgeInsets.symmetric(horizontal: 16.0, vertical: 20.0),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.center,
            children: [
              // Logo and Title
              Text(
                'HE BREWS CAFE',
                style: GoogleFonts.poppins(
                  color: Colors.white,
                  fontSize: 28,
                  fontWeight: FontWeight.bold,
                ),
              ),
              const SizedBox(height: 20),
              Text(
                'Select a branch:',
                style: GoogleFonts.poppins(
                  color: Colors.white,
                  fontSize: 18,
                  fontWeight: FontWeight.normal,
                ),
              ),
              const SizedBox(height: 30),

              // Branch Cards
              Wrap(
                spacing: 15,  // Reduced spacing between cards
                runSpacing: 15,
                alignment: WrapAlignment.center,
                children: [
                  branchCard(
                    context: context,
                    imageUrl: 'assets/images/lawas_branch.jpg',
                    branchName: 'LAWAS BRANCH',
                    location: 'Malvar St, Lawas',
                  ),
                  branchCard(
                    context: context,
                    imageUrl: 'assets/images/main_branch.jpg',
                    branchName: 'MAIN BRANCH',
                    location: 'ABC St, Telic',
                  ),
                  branchCard(
                    context: context,
                    imageUrl: 'assets/images/bauan_branch.jpg',
                    branchName: 'BAUAN BRANCH',
                    location: 'Bauan St, Lipa',
                  ),
                ],
              ),
            ],
          ),
        ),
      ),
    );
  }

  Widget branchCard({
    required BuildContext context,
    required String imageUrl,
    required String branchName,
    required String location,
  }) {
    final double cardSize = MediaQuery.of(context).size.width * 0.35; // Reduced size to 35% of screen width

    return GestureDetector(
      onTap: () {
        // Show dialog on branch selection
        showDialog(
          context: context,
          builder: (BuildContext context) {
            return AlertDialog(
              title: Text('Confirm Selection', style: GoogleFonts.poppins()),
              content: Text('Do you want to select $branchName?', style: GoogleFonts.poppins()),
              actions: [
                TextButton(
                  onPressed: () {
                    Navigator.of(context).pop();
                  },
                  child: Text('Cancel', style: GoogleFonts.poppins()),
                ),
                TextButton(
                  onPressed: () {
                    // Handle branch selection
                    Navigator.of(context).pop();
                    // Proceed to the next page or functionality here
                    ScaffoldMessenger.of(context).showSnackBar(
                      SnackBar(content: Text('$branchName selected'))
                    );
                  },
                  child: Text('Select', style: GoogleFonts.poppins()),
                ),
              ],
            );
          },
        );
      },
      child: Container(
        width: cardSize,
        height: cardSize, // Make it square
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
                imageUrl,
                width: double.infinity,
                height: cardSize * 0.55, // Adjust image height to 55% of card height
                fit: BoxFit.cover,
              ),
            ),
            Padding(
              padding: const EdgeInsets.all(8.0), // Adjust padding
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    branchName,
                    style: GoogleFonts.poppins(
                      fontSize: 14,  // Reduced font size
                      fontWeight: FontWeight.bold,
                      color: Colors.black,
                    ),
                  ),
                  const SizedBox(height: 3),
                  Text(
                    location,
                    style: GoogleFonts.poppins(
                      fontSize: 12,  // Reduced font size
                      fontWeight: FontWeight.normal,
                      color: Colors.grey[600],
                    ),
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
