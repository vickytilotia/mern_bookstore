import React from "react";
import { useState } from "react";

const AddBooks = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publishYear, setPublishYear] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const body = { title: title, author: author, publishYear: publishYear };
      const response = await fetch("http://127.0.0.1:5000/books", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(body),
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="container my-5">
      <h2>Add a Book</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="col">
            <input
              type="text"
              className="form-control"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
              placeholder="Title"
            />
          </div>
          <div className="col">
            <input
              type="text"
              className="form-control"
              value={author}
              onChange={(e) => {
                setAuthor(e.target.value);
              }}
              placeholder="Author"
            />
          </div>
          <div className="col">
            <input
              type="text"
              value={publishYear}
              onChange={(e) => {
                setPublishYear(e.target.value);
              }}
              className="form-control"
              placeholder="PublishYear"
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Add
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddBooks;
