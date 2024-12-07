import React, { useState, useEffect } from "react";
import { getAll, search, update } from "./BooksAPI";
import Search from "./Search";
import Bookshelf from "./Bookshelf";
import "./App.css";

function App() {
  const [showSearchPage, setShowSearchPage] = useState(false);
  const [books, setBooks] = useState([]); 
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    getAll().then((books) => setBooks(books));
  }, []);

  const handleSearch = (query) => {
    if (query.trim()) {
      search(query).then((result) => setSearchResults(result));
    } else {
      setSearchResults([]);
    }
  };

  const handleShelfChange = (book, shelf) => {
    update(book, shelf).then(() => {
      getAll().then((books) => setBooks(books));
    });
  };

  return (
    <div className="app">
      {showSearchPage ? (
        <Search
          query={searchResults.query}
          onSearch={handleSearch}
          onClose={() => setShowSearchPage(false)}
          searchResults={searchResults}
          onShelfChange={handleShelfChange}
        />
      ) : (
        <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>
          <div className="list-books-content">
            <Bookshelf
              shelf="currentlyReading"
              books={books}
              onShelfChange={handleShelfChange}
            />
            <Bookshelf
              shelf="wantToRead"
              books={books}
              onShelfChange={handleShelfChange}
            />
            <Bookshelf
              shelf="read"
              books={books}
              onShelfChange={handleShelfChange}
            />
          </div>
          <div className="open-search">
            <a onClick={() => setShowSearchPage(true)}>Add a book</a>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
