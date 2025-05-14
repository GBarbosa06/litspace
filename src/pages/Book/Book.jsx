import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import useGoogleBookById from '../../hooks/useGoogleBookById'

const Book = () => {
  const { id } = useParams()
  const { book, loading, error } = useGoogleBookById(id)

  const [cover, setCover] = useState('')
  const [title, setTitle] = useState('')
  const [authors, setAuthors] = useState([])
  const [description, setDescription] = useState('')

  useEffect(() => {
    if (book?.volumeInfo) {
      const info = book.volumeInfo
      setCover(info.imageLinks?.thumbnail || '')
      setTitle(info.title || '')
      setAuthors(info.authors || [])
      setDescription(info.description?.replace(/<[^>]*>/g, '') || '') //regex to exclude html tags in description
    }
  }, [book])

  if (loading) return <p>Carregando...</p>
  if (error) return <p>{error}</p>

  return (
    <div>
      {title && cover && authors.length > 0 && (
        <div>
          <div className='flex flex-col items-center'>
          <img src={cover} alt={title} className='max-h-[500px]' />
          <h2 className='text-[#ffd369] text-2xl font-bold'>{title}</h2>
          <p className='text-xl'>{authors.join(', ')}</p>
      </div>
          <div className="mt-4 px-4">
            <h2 className="text-lg font-bold mb-2">Descrição:</h2>
            <p>{description}</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default Book
