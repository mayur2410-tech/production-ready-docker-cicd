const Complaint = require('../../../models/user/Complaint Form/complaintModel');
const User = require('../../../models/user');

// Function to handle complaint submission
const submitComplaint = async (req, res) => {
  const { userId, bagNumber, typeOfComplaint, description } = req.body;

  // Basic validation
  if (!userId || !bagNumber || !typeOfComplaint || !description) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  try {
    // Fetch user details (name and address) based on the userId
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    // Create a new complaint
    const newComplaint = new Complaint({
      userId,
      bagNumber,
      typeOfComplaint,
      description,
      userName: user.name,  // Adding user's name to the complaint
      userAddress: `${user.buildingName}, ${user.roomNumber}`, // Adding user's address
    });

    // Save the complaint to the database
    await newComplaint.save();

    res.status(201).json({ message: 'Complaint submitted successfully', complaint: newComplaint });
  } catch (error) {
    res.status(500).json({ message: 'Failed to submit complaint', error: error.message });
  }
};

module.exports = { submitComplaint };
