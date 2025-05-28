const { body, validationResult } = require('express-validator');

exports.validateSignup = [
  body('email').isEmail().withMessage("Email invalide"),
//   body('password').isLength({ min: 8 }).withMessage("Mot de passe trop court"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];