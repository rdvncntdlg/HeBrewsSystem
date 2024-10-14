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
                spacing: 20,
                runSpacing: 20,
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
    final Size size = MediaQuery.of(context).size;

    return Container(
      width: size.width * 0.4, // Responsive width
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(15.0),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          ClipRRect(
            borderRadius: BorderRadius.only(
              topLeft: Radius.circular(15),
              topRight: Radius.circular(15),
            ),
            child: Image.asset(
              imageUrl,
              width: double.infinity,
              height: size.height * 0.2, // Adjust image height
              fit: BoxFit.cover,
            ),
          ),
          Padding(
            padding: const EdgeInsets.all(10.0),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  branchName,
                  style: GoogleFonts.poppins(
                    fontSize: 16,
                    fontWeight: FontWeight.bold,
                    color: Colors.black,
                  ),
                ),
                const SizedBox(height: 5),
                Text(
                  location,
                  style: GoogleFonts.poppins(
                    fontSize: 14,
                    fontWeight: FontWeight.normal,
                    color: Colors.grey[600],
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
