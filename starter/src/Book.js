import React from "react";

function Book({ book, onShelfChange }) {
  const currentShelf = book.shelf || "none";

  const handleShelfChange = (e) => {
    onShelfChange(book, e.target.value);
  };

  return (
    <div className="book">
      <div className="book-top">
        {book.imageLinks && (
          <div
            className="book-cover"
            style={{
              width: 128,
              height: 193,
              backgroundImage: `url(${book.imageLinks.thumbnail})`,
            }}
          ></div>
        )}
        <div className="book-shelf-changer">
          <select value={currentShelf} onChange={handleShelfChange}>
            <option value="move" disabled>
              Move to...
            </option>
            <option value="currentlyReading">Currently Reading</option>
            <option value="wantToRead">Want to Read</option>
            <option value="read">Read</option>
            <option value="none">None</option>
          </select>
        </div>
      </div>
      <div className="book-title">{book.title}</div>
      {book.authors && (
        <div className="book-authors">{book.authors.join(", ")}</div>
      )}
    </div>
  );
}

export default Book;
