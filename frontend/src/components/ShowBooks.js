import React from "react";
import { useState, useEffect } from "react";

const ShowBooks = () => {
  const [books, setBooks] = useState([]);

  const getBooks = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5000/books");
      const jsonData = await response.json();
      setBooks(jsonData);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getBooks();
    console.log(books);
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://127.0.0.1:5000/books/${id}`, {
        method: "DELETE",
      });
      console.log("book deleted");
      setBooks(books.filter((book) => book._id !== id));
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="container my-5">
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Title</th>
            <th scope="col">Author</th>
            <th scope="col">PublishYear</th>
            <th scope="col">Edit</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book._id}>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>{book.publishYear}</td>
              <td>
                <button type="button" className="btn btn-success">
                  Edit
                </button>
              </td>
              <td>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => handleDelete(book._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ShowBooks;
