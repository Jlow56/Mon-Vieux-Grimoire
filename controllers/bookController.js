const Book = require("../models/book.js");
const fs = require("fs");
const path = require("path");

exports.getAllBooks = async (req, res, next) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (err) {
    next(err);
  }
};

exports.getBookById = async (req, res, next) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ error: "Livre non trouvé" });
    res.json(book);
  } catch (err) {
    next(err);
  }
};

exports.createBook = async (req, res, next) => {
  try {
    const data = JSON.parse(req.body.book);
    delete data._id;
    delete data._userId;

    const exists = await Book.findOne({
      title: data.title,
      author: data.author,
    });
    if (exists) {
      if (req.file) {
        await fs
          .unlink(path.join(__dirname, "../images", req.file.filename))
          .catch(() => {});
      }
      return res.status(400).json({ error: "Livre déjà existant" });
    }
    const book = new Book({
      ...data,
      userId: req.auth.userId,
      imageUrl: `${req.protocol}://${req.get("host")}/images/${
        req.file.filename
      }`,
    });
    const saved = await book.save();
    res.status(201).json({ message: "Livre enregistré", bookId: saved._id });
  } catch (error) {
    console.log("CREATE BOOK ERROR:", error);
    next(err);
  }
};

exports.updateBook = async (req, res, next) => {
  try {
    const payload = req.file
      ? {
          ...JSON.parse(req.body.book),
          imageUrl: `${req.protocol}://${req.get("host")}/images/${
            req.file.filename
          }`,
        }
      : { ...req.body };

    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ error: "Livre non trouvé" });
    if (book.userId !== req.auth.userId)
      return res.status(403).json({ error: "Non autorisé" });

    // Supprime l’ancienne image si nouvelle fournie :contentReference[oaicite:7]{index=7}
    if (req.file && book.imageUrl) {
      const old = book.imageUrl.split("/images/")[1];
      await fs.unlink(path.join(__dirname, "../images", old)).catch(() => {});
    }

    await Book.updateOne({ _id: book._id }, payload);
    res.json({ message: "Livre modifié" });
  } catch (err) {
    next(err);
  }
};

exports.deleteBook = async (req, res, next) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ error: "Livre non trouvé" });
    if (book.userId !== req.auth.userId)
      return res.status(403).json({ error: "Non autorisé" });

    if (book.imageUrl) {
      const file = book.imageUrl.split("/images/")[1];
      await fs.unlink(path.join(__dirname, "../images", file)).catch(() => {});
    }
    await Book.deleteOne({ _id: book._id });
    res.json({ message: "Livre supprimé" });
  } catch (err) {
    next(err);
  }
};

exports.rateBook = async (req, res, next) => {
  try {
    const rating = Number(req.body.rating);
    if (rating < 0 || rating > 5) {
      return res.status(400).json({ error: "Note entre 0 et 5" });
    }

    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ error: "Livre non trouvé" });
    if (book.ratings.some((r) => r.userId === req.auth.userId)) {
      return res.status(400).json({ error: "Vous avez déjà noté ce livre" });
    }

    book.ratings.push({ userId: req.auth.userId, grade: rating });
    book.calculateAverageRating();
    await book.save();
    res.status(201).json(book);
  } catch (err) {
    next(err);
  }
};

exports.get3BestRatedBooks = async (req, res, next) => {
  try {
    const top3 = await Book.find().sort({ averageRating: -1 }).limit(3);
    res.json(top3);
  } catch (err) {
    next(err);
  }
};
