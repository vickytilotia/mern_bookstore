// import express from "express";
const express = require("express");
const dotenv = require("dotenv").config();
const connectDB = require("./config");
const Book = require("./models/bookModel");
const cors = require("cors");

// Init db
connectDB();
// Init express
const app = express();

// middlewares
app.use(express.json());
app.use(cors());

// homepage
app.get("/", (req, res) => {
  return res.status(404).send("hello");
});

// save a new book
app.post("/books", async (req, res) => {
  try {
    if (!req.body.title || !req.body.author || !req.body.publishYear) {
      return res.status(400).send("send all fields");
    } else {
      const newBook = {
        title: req.body.title,
        author: req.body.author,
        publishYear: req.body.publishYear,
      };

      const book = await Book.create(newBook);
      return res.status(201).send(book);
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

// get all books
app.get("/books", async (req, res) => {
  try {
    const book = await Book.find({});
    res.status(200).send(book);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

// get book by id
app.get("/books/:id", async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    res.status(200).send(book);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

// update the book
app.put("/books/:id", async (req, res) => {
  try {
    if (!req.body.title || !req.body.author || !req.body.publishYear) {
      return res.status(400).send("send all fields");
    } else {
      const newBook = {
        title: req.body.title,
        author: req.body.author,
        publishYear: req.body.publishYear,
      };

      const result = await Book.findByIdAndUpdate(req.params.id, newBook);

      if (!result) {
        return res.status(404).send("book not found");
      }
      return res.status(201).send("book updated !");
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

// delete a book
app.delete("/books/:id", async (req, res) => {
  try {
    const result = await Book.findByIdAndDelete(req.params.id);

    if (!result) {
      return res.send("book not found");
    }
    return res.status(200).send("book deleted");
  } catch (error) {
    console.log(error.message);
  }
});

// server
const PORT = 5000;
app.listen(PORT, () => {
  console.log("the server is running");
});
