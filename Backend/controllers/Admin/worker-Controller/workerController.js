const Worker = require("../../../models/Worker/workerModel");
const bcrypt = require("bcryptjs");

const createWorker = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Email and password are required." });
  }

  try {
    const existingWorker = await Worker.findOne({ email });
    if (existingWorker) {
      return res
        .status(400)
        .json({ message: "Worker already exists with this email." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newWorker = new Worker({
      email,
      password: hashedPassword,
    });
    await newWorker.save();

    res
      .status(201)
      .json({ message: "Worker added successfully", worker: newWorker });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating worker", error: error.message });
  }
};



module.exports = { createWorker  };