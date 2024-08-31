const crypto = require("crypto");
const User = require("../../modals/user/user.modal");
const jwt = require("jsonwebtoken");
const sendVerificationEmail = require("../../utils/sendVerificationEmail");

const register = async (req, res) => {
  const { firstName, lastName, email, password, confirmPassword } = req.body;

  if (!firstName || !lastName || !email || !password) {
    return res
      .status(401)
      .json({ msg: "please provide first name,last name, email and password" });
  }
  try {
    const userAlreadyExist = await User.findOne({ email });

    if (userAlreadyExist) {
      // return res.status(404).json({ msg: "email already registered" });
      return res.status(404).json({ msg: "user already exist" });
    }

    if (password !== confirmPassword) {
      return res.status(401).json({ msg: "password does not match" });
    }

    const role = (await User.countDocuments({})) === 0 ? "admin" : "user";

    const verificationToken = crypto.randomBytes(40).toString("hex");

    const user = await User.create({
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      role,
      verificationToken,
    });

    // frontend origin
    // const origin = "https://reader-blogs.onrender.com";
    const origin = "http://localhost:5173";

    await sendVerificationEmail({
      name: `${user?.firstName}} ${user?.lastName}`,
      email: user.email,
      verificationToken: user.verificationToken,
      origin,
    });

    res.status(201).json({
      msg: "Success! Please check your email to verify account",
    });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

const verifyEmail = async (req, res) => {
  const { verificationToken, email } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(401).json({ msg: "Verification Failed" });
  }

  if (user.verificationToken !== verificationToken) {
    return res.status(401).json({ msg: "Verification Failed" });
  }

  user.isVerified = true;
  user.verificationToken = "";

  await user.save();

  res.status(200).json({ msg: "Email Verified" });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(404).json({ msg: "please provide password and email" });
  }
  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ msg: "Invalid Credentials" });
    }

    // compare password

    const isPasswordMatch = await user.comparePassword(password);

    if (!isPasswordMatch) {
      return res.status(404).json({ msg: "wrong password" });
    }

    if (!user.isVerified) {
      return res.status(404).json({ msg: "Please verify your email" });
    }

    const token = await jwt.sign(
      {
        user: user?._id,
        username: user?.name,
        role: user?.role,
        socials: user?.socials,
        bio: user?.bio,
        isVerified: user?.isVerified,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "365d",
      }
    );

    const tokenUser = {
      userId: user._id,
      name: user.name,
      email: user.email,
      bio: user.bio,
      profileImage: user.profileImage,
      role: user.role,
      token: token,
    };

    return res.status(200).json({ user: tokenUser });
  } catch (err) {
    console.log(`err:${err}`);
    res.status(500).json({ msg: err.message });
  }
};

module.exports = {
  register,
  verifyEmail,
  login,
};
