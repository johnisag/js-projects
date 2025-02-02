const express = require('express');
let books = require("./booksdb.js");
const e = require('express');
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

public_users.post("/register", (req,res) => {
  const username = req.body.username;
  const password = req.body.password;

  // Check if both username and password are provided
  if (username && password) {
      // Check if the user does not already exist
      if (isValid(username)) {
          // Add the new user to the users array
          users.push({"username": username, "password": password});
          return res.status(200).json({message: "User successfully registered. Now you can login"});
      } else {
          return res.status(404).json({message: "User already exists!"});
      }
  } 
  else {
      return res.status(404).json({message: "Error registering user, username or password missing"}); 
  }  
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  let retrievedBooks  = new Promise((resolve, reject) => {
    resolve(books);
  });

  retrievedBooks.then((books) => {
    return res.send(JSON.stringify( books, null, 4));
  })

});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  const isbn = req.params.isbn;

  let retrievedBook = new Promise((resolve, reject) => {
    resolve(books[isbn]);
  });

  retrievedBook.then((book) => {
    if (book){
      return res.send(JSON.stringify(book, null, 4));
    } else {
      return res.status(404).json({message: "Book not found"});
    }
  });
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  const author = req.params.author;

  let booksByAuthor = new Promise((resolve, reject) => {
    let author_books = {};
    for (let i in books){
      if (books[i].author === author){
        author_books[i] = books[i];
      }
    }
    resolve(author_books);
  });

  booksByAuthor.then((author_books) => {
    if (Object.keys(author_books).length > 0){
      return res.send(JSON.stringify(author_books, null, 4));
    } else {
      return res.status(404).json({message: "Author not found"});
    }
  });
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  const title = req.params.title;

  let booksByTitle = new Promise((resolve, reject) => {
    let title_books = {};
    for (let i in books){
      if (books[i].title === title){
        title_books[i] = books[i];
      }
    }
    resolve(title_books);
  });

  booksByTitle.then((title_books) => {
    if (Object.keys(title_books).length > 0){
      return res.send(JSON.stringify(title_books, null, 4));
    } else {
      return res.status(404).json({message: "Title not found"});
    }
  });
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  const isbn = req.params.isbn;
  if (books[isbn]){
    return res.send(JSON.stringify(books[isbn].reviews, null, 4));
  } else {
    return res.status(404).json({message: "Book not found"});
  }
});

module.exports.general = public_users;
