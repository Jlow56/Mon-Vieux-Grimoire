const User = require("../models/User.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

class UserController {
  async findUserByEmail(email) {
    return User.findOne({ email });
  }

  async findUser(req, res) {
    const { email } = req.body;
    try {
      const user = await this.findUserByEmail(email);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      return res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }

  async login(req, res) {
    const { email, password } = req.body;
    try {
      const user = await this.findUserByEmail(email);

      if (!user) {
        return res.status(401).json({ error: "Mail ou mot de passe incorrect" });
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ error: "Mail ou mot de passe incorrect" });
      }

      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
        expiresIn: "24h",
      });

      return res.status(200).json({ userId: user._id, token });
    } catch (error) {
      console.error("LOGIN ERROR:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }

  async signup(req, res) {
    try {
      const { email, password } = req.body;

      const bcryptSalt = 10;
      const hashedPassword = await bcrypt.hash(password, bcryptSalt);

      const newUser = new User({ email, password: hashedPassword,});
      await newUser.save();

      res.status(201).json({ message: "User created successfully" });
    } catch (error) {
       if (error.name === 'ValidationError' && error.errors.email) {
      return res.status(409 ).json({ error: "Cet e-mail est déjà utilisé." });
    }
      res.status(500).json({ error: "Internal server error" });
    }
  }
}

module.exports = new UserController();
  
