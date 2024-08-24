const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "plz prvide name"],
    minlength: 3,
    maxlength: 20,
  },
  email: {
    type: String,
    required: [true, "plz prvide email"],
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "plz provide valid email address",
    ],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "plz prvide password"],
    minlength: 6,
  },
  confirmPassword: {
    type: String,
    required: [true, "plz provide confirm Password"],
  },
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
  },
  bio: {
    type: String,
    default: "",
  },
  isVerified: {
    type: Boolean,
    default: true,
  },
  socials: [
    {
      meta: {
        type: String,
        default: "",
      },
      linkdein: {
        type: String,
        default: "",
      },
      github: {
        type: String,
        default: "",
      },
      x: {
        type: String,
        default: "",
      },
    },
  ],
  profileImage: {
    type: String,
    default: "https://svgsilh.com/svg/659651.svg",
  },
});

userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(this.password, salt);
  this.password = hashedPassword;
});

userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model("user", userSchema);
