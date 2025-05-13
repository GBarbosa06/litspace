import React from 'react'
import useGoogleBooks from '../../hooks/useGoogleBooks'
import { useParams } from 'react-router-dom'

const Book = () => {
    const { id } = useParams();
    const { books, loading, error } = useGoogleBooks(id);
    console.log(books);
  return (
    <div>Book</div>
  )
}

export default Book