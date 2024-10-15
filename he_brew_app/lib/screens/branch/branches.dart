import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:he_brew_app/screens/nav_bar.dart'; // Import the nav_bar.dart

class Branch {
  final String imageUrl;
  final String name;
  final String location;

  Branch({required this.imageUrl, required this.name, required this.location});
}

class BranchSelection extends StatelessWidget {
  const BranchSelection({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    // Sample branch data
    final List<Branch> branches = [
      Branch(imageUrl: 'images/branches/lawas.jpg', name: 'LAWAS BRANCH', location: 'Malvar St, Lawas'),
      Branch(imageUrl: 'images/branches/burgos.jpg', name: 'MAIN BRANCH', location: 'ABC St, Telic'),
      Branch(imageUrl: 'images/branches/bauan.jpg', name: 'BAUAN BRANCH', location: 'Bauan St, Lipa'),
    ];

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
              // Logo
              Padding(
                padding: const EdgeInsets.symmetric(vertical: 20.0),
                child: Image.asset(
                  'images/cream_logo.png', // Path to the logo image
                  width: 150, // Adjust width as necessary
                  errorBuilder: (context, error, stackTrace) {
                    return Container(
                      color: Colors.grey,
                      child: Center(
                        child: Text(
                          'Logo not available',
                          style: GoogleFonts.poppins(color: Colors.white),
                        ),
                      ),
                    );
                  },
                ),
              ),
              Text(
                'Select a branch:',
                style: GoogleFonts.poppins(
                  color: Colors.white,
                  fontSize: 18,
                  fontWeight: FontWeight.normal,
                ),
              ),
              const SizedBox(height: 30),

              // Centering the Branch Cards
              Center(
                child: Wrap(
                  spacing: 15, // Spacing between cards
                  runSpacing: 15,
                  alignment: WrapAlignment.center,
                  children: branches.map((branch) {
                    return branchCard(
                      context: context,
                      branch: branch,
                    );
                  }).toList(),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }

  Widget branchCard({
    required BuildContext context,
    required Branch branch,
  }) {
    final double cardSize = MediaQuery.of(context).size.width * 0.20; // Size of the card

    return GestureDetector(
      onTap: () {
        // Show dialog on branch selection
        showDialog(
          context: context,
          builder: (BuildContext context) {
            return AlertDialog(
              title: Text('Confirm Selection', style: GoogleFonts.poppins()),
              content: Text('Do you want to select ${branch.name}?', style: GoogleFonts.poppins()),
              actions: [
                TextButton(
                  onPressed: () {
                    Navigator.of(context).pop();
                  },
                  child: Text('Cancel', style: GoogleFonts.poppins()),
                ),
                TextButton(
                  onPressed: () {
                    // Close dialog and navigate to NavBar
                    Navigator.of(context).pop();
                    Navigator.push(
                      context,
                      MaterialPageRoute(
                        builder: (context) => const BottomNavBar(), // Redirect to NavBar
                      ),
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
        height: cardSize * 1.05, // Slightly taller for better aspect ratio
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
                height: cardSize * 0.65,
                fit: BoxFit.cover,
                errorBuilder: (context, error, stackTrace) {
                  return Container(
                    color: Colors.grey, // Placeholder color if image fails to load
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
            Padding(
              padding: const EdgeInsets.all(6.0),
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
