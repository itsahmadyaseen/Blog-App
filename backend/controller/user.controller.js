import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import bcrypt from "bcrypt";

export const signupUser = async (req, res) => {
  const { username, fullname, password } = req.body;
  if (!username || !fullname || !password) {
    console.log("Provide all details", username, fullname, password);
    return res.status(400).json({ message: "Provide all details" });
  }

  try {
    const existingUser = await User.findOne({ username: username });
    if (existingUser) {
      console.log("User already exist", existingUser);
      return res
        .status(400)
        .json({ message: "User already exist", data: existingUser });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username: username,
      fullname: fullname,
      password: hashedPassword,
    });

    await newUser.save();
    console.log("Signup successfull", newUser);
    res.status(201).json({ message: "Signup successfull", data: newUser });
  } catch (error) {
    console.log("Error signing up", error);
    return res.status(500).json({ message: "Error signing up", data: error });
  }
};

export const loginUser = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    console.log("Provide all details", username, password);
    return res.status(400).json({ message: "Provide all details" });
  }

  try {
    const existingUser = await User.findOne({ username: username });
    if (!existingUser) {
      console.log("User does not exist", existingUser);
      return res
        .status(404)
        .json({ message: "User does not exist", data: null });
    }

    bcrypt.compare(password, existingUser.password, (err, data) => {
      if (data) {
        const authClaims = { id: existingUser.id, username: username };
        const token = jwt.sign(authClaims, process.env.SECRET_KEY, {
          expiresIn: "1d",
        });
        console.log("token ", token);
        console.log("Login successfull");
        return res.status(200).json({ id: existingUser.id, token: token });
      } else {
        console.log("Invalid password", err);
        return res.status(500).json({ message: "Invalid password", data: err });
      }
    });
  } catch (error) {
    console.log("Error logging in", error);
    return res.status(500).json({ message: "Error logging in", data: error });
  }
};

export const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    console.log(users);
    if (!users) {
      console.log("Cannot find user", users);
      return res.status(400).json({ message: "Cannot find user", data: users });
    }
    console.log("Users fetched", users);
    return res.status(200).json({ message: "Users fetched", data: users });
  } catch (error) {
    console.log("Error fetching users", error);
    return res
      .status(500)
      .json({ message: "Error fetching users", data: error });
  }
};

export const getUserById = async (req, res) => {
  try {
    const id = req.params.id;
    console.log(id);
    const getBlog = await User.findById(id);
    if (!getBlog) {
      console.log("User fetch failed ", getBlog);
      return res.status(404).json({ message: "User fetch failed" });
    }
    console.log("User fetched", getBlog);
    return res.status(200).json({ message: "User fetched", data: getBlog });
  } catch (error) {
    console.log("User fetch failed ", error);
    return res.status(500).json({ message: "User fetch failed", data: error });
  }
};


