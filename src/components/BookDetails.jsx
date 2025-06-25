//Details rendered when details button is pressed
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const BookDetail = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await fetch(`/books/${id}`);
        if (!response.ok) {
          throw new Error("Error fetching book details");
        }
        const data = await response.json();
        setBook(data);
      } catch (error) {
        console.error("Error fetching book details:", error);
      }
    };

    fetchBook();
  }, [id]);

  if (!book) return <p>Loading...</p>;

  return (
    <div>
      <h1>{book.title}</h1>
      <p><strong>Author:</strong> {book.author}</p>
      <p><strong>Description:</strong> {book.description}</p>
    </div>
  );
};

export default BookDetail;