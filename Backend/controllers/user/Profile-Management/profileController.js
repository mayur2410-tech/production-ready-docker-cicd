const User = require('../../../models/user');

const getUserProfile = async (req,res) => {
    try {
        const user = await User.findById(req.user.userId)

        if(!user){
           return res.status(404).json({message:"User not found"});
        }

        res.json(user);

    } catch(error){
        res.status(500).json({message:"Server Error"});
    }
};

const updateUserProfile = async (req,res) => {
    try{
        const userId=req.user.userId
        const {phoneNumber,roomNumber,bagNumber,buildingName,address} = req.body;
        // console.log("Received Data:", req.body)

        const user = await User.findById(userId);

        // console.log("User Before Update:", user);
        if(!user){
            return res.status(404).json({message:"User not Found"});
        }

        // find the phone Number is larady in use 

        if(phoneNumber && phoneNumber !== user.phoneNumber){
            const existingNumber = await User.findOne({phoneNumber});
            if(existingNumber){
                return res.status(400).json({message:"Phone Number is alredy in use"});
            }
           
        }

      const updateUser = await User.findByIdAndUpdate(
        userId,
        {
            phoneNumber: phoneNumber || user.phoneNumber,
                bagNumber: bagNumber || user.bagNumber,
                roomNumber: roomNumber || user.roomNumber,
                buildingName: buildingName || user.buildingName,
                address: address || user.address,
            },
            { new: true }
        
      )

    //   console.log("updates user:",updateUser)

        res.status(200).json({message:"Profile Update Successfully",user : updateUser})

    }catch(error){
        console.error("update profile error:",error)
        res.status(500).json({message:"Internal server error ",error:error.message});
    }
}

module.exports = {getUserProfile,updateUserProfile}