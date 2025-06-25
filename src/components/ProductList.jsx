//ProductList:

//Fetch and display all products
//Each links to its /products/:id detail page through a button
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const BooksList = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch("/books");
        if (!response.ok) {
          throw new Error("Error fetching books");
        }
        const data = await response.json();
        setBooks(data);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };

    fetchBooks();
  }, []);

  return (
    <div>
      <h1>Books List</h1>
      <ul>
        {books.map((book) => (
          <li key={book.id}>
            <h3>{book.title}</h3>
            <p>{book.author}</p>
            {/* Button linking to book detail page */}
            <Link to={`/products/${book.id}`}>
              <button>View Details</button>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BooksList;