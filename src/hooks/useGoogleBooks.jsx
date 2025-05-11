import { useState, useEffect } from "react";

const useGoogleBooks = (query) => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!query) return;

    const fetchBooks = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(
          `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}`
        );
        const data = await res.json();
        setBooks(data.items || []);
      } catch (err) {
        setError("Erro ao buscar livros.");
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [query]);

  return { books, loading, error };
};

export default useGoogleBooks;
