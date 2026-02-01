// controllers/userController.js
const User = require('../../../models/user'); // Import the user schema
const Worker =require('../../../models/Worker/workerModel')
const bcrypt = require('bcryptjs');  // Required for comparing hashed passwords
const jwt = require('jsonwebtoken');
const nodemailer = require("nodemailer");
const user = require('../../../models/user');

const registerUser = async (req, res) => {
  const { name, email, phoneNumber, buildingName, roomNumber,bagNumber, password, confirmPassword } = req.body;

  // Basic validations
  if (!name || !email || !phoneNumber || !buildingName || !roomNumber || !bagNumber || !password || !confirmPassword) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  if (password !== confirmPassword) {
    return res.status(400).json({ message: 'Passwords do not match.' });
  }

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists with this email.' }); 
    }

    const existingNumber = await User.findOne({phoneNumber});
    if(existingNumber){
      return res.status(400).json({message: ' 📞 Phonenumber is already in use'})
    }


    const hashedPassword = await bcrypt.hash(password, 10);

    
    // Create a new user
    const newUser = new User({
      name,
      email,
      phoneNumber,
      buildingName,
      roomNumber,
      bagNumber,
      password: hashedPassword,
      
    

    });

    // Save the user to the database
    await newUser.save();

    res.status(201).json({ success:true,message: 'User registered successfully', user: newUser });
  } catch (error) {
    res.status(500).json({ message: 'Failed to register user', error: error.message });
  }
};


// function for user login
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  console.log("=== LOGIN ATTEMPT ===");
  console.log("Email received:", email);
  console.log("Email type:", typeof email);
  console.log("Email length:", email ? email.length : 0);
  console.log("Password received:", password ? "YES" : "NO");
  console.log("Request body:", JSON.stringify(req.body));

  try {
    // Check if user exists
    const user = await User.findOne({ email });
    console.log("User found in User collection:", user ? "YES" : "NO");
    if (user) console.log("User details:", { id: user._id, email: user.email, name: user.name });
    
    const worker = await Worker.findOne({ email });
    console.log("Worker found in Worker collection:", worker ? "YES" : "NO");
    
    const finalUser = user || worker;

    if (!finalUser) {
      console.log("❌ No user found - returning 400");
      return res.status(400).json({ message: "User not found" });
    }

    console.log("✅ User found, checking password...");

    // Compare password with the hashed password
    const isMatch = await bcrypt.compare(password, finalUser.password);
    console.log("Password match:", isMatch ? "YES" : "NO");
    
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    const token = jwt.sign(
      {
      userId: finalUser._id,
      role: finalUser.role
    },
    process.env.JWT_SECRET, 
    { expiresIn: '1h' }
    );

    console.log("✅ Login successful, sending response");

    // Login successful
    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      name: finalUser.name,
      userId: finalUser._id,
      role: finalUser.role
    });
  } catch (error) {
    console.log("❌ Error:", error.message);
    res.status(500).json({ message: 'Login failed', error: error.message });
  }
};


// function for forgotpassword link

const forgotPassword =  async (req,res) => {
  try{

      const{email} = req.body;
      const user = await User.findOne({email});

      if(!user){
        return res.status(404).json({message:"User not Found"});
      }

      // create a jwt token for resetpassword

      const resetToken = jwt.sign(
        {userId:user._id},
        process.env.JWT_SECRET,
        {expiresIn: '1h'}
      );
      user.resetPasswordToken = resetToken;
      user.resetPasswordExpires = Date.now() + 3*60*1000  // Expire in 3 min;
      await user.save();

      const resetLink = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

      const transporter = nodemailer.createTransport({
        service : "Gmail",
        auth:{
          user:process.env.EMAIL_USER,
          pass:process.env.EMAIL_PASSWORD,
        },

      });

      const mailOption = {
        from: process.env.EMAIL_USER,
        to:user.email,
        subject: "Password Reset Request",
        text:`Hi ${user.name},

We received a request to reset the password for your account associated with this email address.

Please click on the link below to reset your password:

${resetLink}

If you did not request a password reset, please ignore this email.

For security reasons, this link will expire in 5 minutes.

Best regards,
Laundry_Buddy

---

Please do not reply to this email. For any further assistance, contact our support team at laundry@opreator.com
            `,

      };

      //send mail

      await transporter.sendMail(mailOption);

      res.status(200).json({message:"Reset link sent to email",link:resetLink,token:resetToken});
     
  }catch(error){

    res.status(500).json({message:"Server Error" , error:error.message})
  }
}



// Reset Password

const resetPassword = async (req,res) => {
  try{
    const {token} = req.params
    const {newPassword,confirmPassword} = req.body;
    // console.log( typeof token)
    if (newPassword !== confirmPassword){
      return res.status(400).json({message:"Password does not Match"});
    }

    //verify the token

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({_id: decoded.userId, resetPasswordToken: token})
 


if (!user || !user.resetPasswordExpires || user.resetPasswordExpires < Date.now()) {
  return res.status(400).json({ message: "Invalid or expired token" });
    }

    //check if new pass is same as old 
    const isSamePassword = await bcrypt.compare(newPassword, user.password);
    if (isSamePassword) {
      return res.status(400).json({ message: "New password must be different from the old password" });
    }


     //update the userpassword
     const salt = await bcrypt.genSalt(10);
     user.password = await bcrypt.hash(newPassword,salt)

     //clear the reset token and expiration
     user.resetPasswordToken = undefined;
     user.resetPasswordExpires = undefined 
     await user.save();
     
     res.status(200).json({message:"Password Update Successfully"});



  }catch(error){
      res.status(500).json({message:"Server Error",error:error.message});
  }
}


const updatePassword = async (req,res) =>{

  try{

    const {currentPassword,newPassword} = req.body;
    const userId = req.user.userId;

    //fetch user from DB
    const user = await User.findById(userId);
    // console.log("userId",{userId})
    if(!user){
      return res.status(404).json({message:"User not Found"});
    }

    //check the cuurent pass and db pass match 
    const isMatch = await bcrypt.compare(currentPassword,user.password)
    if(!isMatch){
      return res.status(400).json({message:"  Current password is incorrect!"});
    }

    //check new pass and cuurent pass should unique
    if(await bcrypt.compare(newPassword,user.password)){
      return res.status(400).json({message:"😔 New password cannot be same as old password"});
    }

    //hash the new password

    const salt =await bcrypt.genSalt(10);
    user.password =  await bcrypt.hash(newPassword,salt);
    await user.save();

    return res.status(200).json({message:"🎉 Password Update Successfully"})

  }catch(error){
    return res.status(500).json({message:"Server error",error:error.message});
  }
}

module.exports = { registerUser,loginUser,forgotPassword,resetPassword,updatePassword };
