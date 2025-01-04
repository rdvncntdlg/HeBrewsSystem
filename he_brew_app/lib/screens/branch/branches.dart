import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:he_brew_app/models/branch_model.dart';
import 'package:he_brew_app/screens/branch/branch_card.dart';
import 'package:he_brew_app/services/branch_service.dart'; // Import the BranchService

class BranchSelection extends StatelessWidget {
  const BranchSelection({super.key});

  @override
  Widget build(BuildContext context) {
    final branchService = BranchService();

    return Scaffold(
      backgroundColor: Colors.black,
      appBar: AppBar(
        backgroundColor: Colors.black,
        elevation: 0,
        automaticallyImplyLeading: false, // Remove the back button
      ),
      body: FutureBuilder<List<Branch>>(
        future: branchService.fetchBranches(), // Fetch the branch data
        builder: (context, snapshot) {
          if (snapshot.connectionState == ConnectionState.waiting) {
            return const Center(child: CircularProgressIndicator());
          } else if (snapshot.hasError) {
            return Center(child: Text('Error: ${snapshot.error}'));
          } else if (!snapshot.hasData || snapshot.data!.isEmpty) {
            return const Center(child: Text('No branches found.'));
          } else {
            final branches = snapshot.data!;

            return Padding(
              padding: const EdgeInsets.symmetric(horizontal: 16.0, vertical: 20.0),
              child: SingleChildScrollView(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.center,
                  children: [
                    // Reduced Logo Size
                    Padding(
                      padding: const EdgeInsets.symmetric(vertical: 20.0),
                      child: Image.asset(
                        'images/cream_logo.png', // Path to the logo image
                        width: MediaQuery.of(context).size.width * 0.4, // Reduced width for the logo
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
                    // Display branches in a grid or list
                    GridView.builder(
                      shrinkWrap: true, // To make the grid view fit within the single child scroll view
                      physics: const NeverScrollableScrollPhysics(), // Prevent scrolling within the grid
                      gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
                        crossAxisCount: 2, // Two cards per row
                        crossAxisSpacing: 20.0,
                        mainAxisSpacing: 20.0,
                      ),
                      itemCount: branches.length,
                      itemBuilder: (context, index) {
                        return BranchCard(branch: branches[index]);
                      },
                    ),
                  ],
                ),
              ),
            );
          }
        },
      ),
    );
  }
}