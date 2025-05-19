import React, { useEffect, useState } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import useGoogleBookById from '../../hooks/useGoogleBookById'
import { useFetchDocuments } from '../../hooks/useFetchDocuments'
import { StarRatingShow } from '../../components/StarRatingShow'
import AddOnShelf from '../../components/AddOnShelf'
import { useAuthValue } from '../../context/AuthContext'

const Book = () => {
  const { id } = useParams()
  const { user } = useAuthValue(); //to add on shelf
  const { book, loading: googleLoading, error: googleError } = useGoogleBookById(id)
  const { documents: reviews, loading: fetchLoading, error: fetchError} = useFetchDocuments("reviews", "bid", id)
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

  if (googleLoading) return <p>Carregando...</p>
  if (googleError) return <p>{error}</p>

  return (
    <div>
      {title && cover && authors.length > 0 && (
      <div className='flex flex-row items-center p-10'>
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
              {user && <AddOnShelf uid={user.uid} bid={id} title={title} authors={authors} cover={cover} />}
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
      <div className='border-t-1 border-gray-600 flex flex-col items-center pt-2 mb-10'>
          <h1 className='text-2xl font-bold mb-3'>Avaliações do livro</h1>
          <ul>
            {reviews && reviews?.length > 0 && reviews.map((rev) => (
              <li key={rev.id} className="bg-[#2d2d44] pl-5 pr-10 py-2 mb-5 rounded-2xl max-w-150 flex justify-between gap-4 cursor-pointer hover:-translate-y-1.5 transition duration-150" onClick={() => navigate("/book/" + rev.bid)}>
                <div className="pt-2">
                  <StarRatingShow  rating={rev.rating}/>
                  <h3 className="text-xl font-bold">{rev.title}</h3>
                  <p className="font-bold"><span className="italic">{rev.owner}</span> diz...</p>
                  <p className="flex flex-wrap gap-1">"{rev.description}"</p>
                  <p className="text-sm"> {rev.createdAt?.toDate().toLocaleString()}</p>
                </div>
              </li>
            ))}
          </ul>
          {fetchLoading && <p>Carregando avaliações...</p>}
          {fetchLoading && reviews?.length === 0 && <p>Sem avaliações para esse livro por enquanto</p>}
          {fetchError && <p className='error'>Erro na busca de avaliações</p>}
      </div>
    </div>
  )
}

export default Book
