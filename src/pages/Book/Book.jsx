import React, { useEffect, useState } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import useGoogleBookById from '../../hooks/useGoogleBookById'

const Book = () => {
  const { id } = useParams()
  const { book, loading, error } = useGoogleBookById(id)

  const navigate = useNavigate();

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
      <div className='w-screen flex flex-row items-center p-10'>
        <div className='flex flex-col items-center w-[40%]'>
          <img src={cover} alt={title} className='max-h-[500px]' />
          <h2 className='text-[#ffd369] text-2xl font-bold'>{title}</h2>
          <p className='text-xl'>{authors.join(', ')}</p>
        </div>
        <div className="mt-4 px-4 pb-5 w-[60%]">
            {description && <>
              <h2 className="text-lg font-bold mb-2">Descrição:</h2>
              <p className='border-b-1 pb-5 border-gray-600 '>{description}</p>
            </>}
            {!description && <h3 className="text-lg font-bold pb-5 border-b-1 border-gray-600 ">Descrição indisponível</h3>}
            <div className='mt-5 flex flex-col items-center gap-2'>
              <button className='p-3 bg-[#ffd369] hover:bg-amber-400 transition-colors duration-150 w-80 rounded-2xl cursor-pointer'>Adicionar à estante</button>
              <button className='p-3 bg-red-400 hover:bg-red-500 transition-colors duration-150 w-80 rounded-2xl cursor-pointer' onClick={() => navigate(`/review/${id}`)}>Avaliar</button>
            </div>
        </div>
      </div>
      )}
      {!(title && cover && authors.length > 0) && 
        <div className=' text-center mt-10 min-h-screen'>
          <h2 className='font-bold text-xl mb-3'>Não encontrado</h2>
        <button onClick={() => navigate('/')} className='btn'>Voltar</button>  
        </div>
        
      }
      
    </div>
  )
}

export default Book
