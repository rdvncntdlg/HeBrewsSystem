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
  const BranchSelection({super.key});

  @override
  Widget build(BuildContext context) {
    // Sample branch data
    final List<Branch> branches = [
      Branch(
          imageUrl: 'images/branches/lawas.jpg',
          name: 'LAWAS BRANCH',
          location: 'Malvar St, Lawas'),
      Branch(
          imageUrl: 'images/branches/burgos.jpg',
          name: 'MAIN BRANCH',
          location: 'ABC St, Telic'),
      Branch(
          imageUrl: 'images/branches/bauan.jpg',
          name: 'BAUAN BRANCH',
          location: 'Bauan St, Lipa'),
    ];

    return Scaffold(
      backgroundColor: Colors.black,
      appBar: AppBar(
        backgroundColor: Colors.black,
        elevation: 0,
      ),
      body: SingleChildScrollView(
        child: Padding(
          padding: const EdgeInsets.symmetric(horizontal: 16.0, vertical: 20.0),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.center,
            children: [
              // Reduced Logo Size
              Padding(
                padding: const EdgeInsets.symmetric(vertical: 20.0),
                child: Image.asset(
                  'images/cream_logo.png', // Path to the logo image
                  width: MediaQuery.of(context).size.width *
                      0.4, // Reduced width for the logo
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
              // Layout without the "Select a branch" title
              LayoutBuilder(
                builder: (context, constraints) {
                  double screenWidth = constraints.maxWidth;

                  // For screen widths above 600, we will show the last card below the first two
                  bool isWideScreen = screenWidth > 600;

                  return Column(
                    crossAxisAlignment: CrossAxisAlignment.center,
                    children: [
                      Row(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: [
                          // First and second cards in a row
                          branchCard(context: context, branch: branches[0]),
                          const SizedBox(width: 20),
                          branchCard(context: context, branch: branches[1]),
                        ],
                      ),
                      const SizedBox(height: 30),
                      // Third card below the row (stacked)
                      if (isWideScreen)
                        branchCard(context: context, branch: branches[2])
                      else
                        Column(
                          children: [
                            const SizedBox(height: 20),
                            branchCard(context: context, branch: branches[2]),
                          ],
                        ),
                    ],
                  );
                },
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
    final double cardWidth =
        MediaQuery.of(context).size.width * 0.4; // 40% of screen width
    final double cardHeight = cardWidth * 1.1; // Maintain a good aspect ratio

    return GestureDetector(
      onTap: () {
        // Show dialog on branch selection
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
                  child: Text('Cancel', style: GoogleFonts.poppins()),
                ),
                TextButton(
                  onPressed: () {
                    // Close dialog and navigate to NavBar
                    Navigator.of(context).pop();
                    Navigator.push(
                      context,
                      MaterialPageRoute(
                        builder: (context) =>
                            const BottomNavBar(), // Redirect to NavBar
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
                height: cardHeight * 0.6, // Responsive image height
                fit: BoxFit.cover,
                errorBuilder: (context, error, stackTrace) {
                  return Container(
                    color:
                        Colors.grey, // Placeholder color if image fails to load
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
              padding: const EdgeInsets.all(
                  10.0), // Increased padding for better text spacing
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    branch.name,
                    style: GoogleFonts.poppins(
                      fontSize: 14, // Adjusted font size for branch name
                      fontWeight: FontWeight.bold,
                      color: Colors.black,
                    ),
                  ),
                  const SizedBox(height: 3),
                  Text(
                    branch.location,
                    style: GoogleFonts.poppins(
                      fontSize: 12, // Adjusted font size for location
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
