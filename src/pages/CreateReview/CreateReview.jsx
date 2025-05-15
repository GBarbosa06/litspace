import { useState, useEffect } from "react";
import StarRating from "../../components/StarRating"
import useGoogleBookById from "../../hooks/useGoogleBookById";
import { useParams } from "react-router-dom";

const CreateReview = () => {
    const {id} = useParams()
    const { book, loading, error: hookError } = useGoogleBookById(id)
    const [rating, setRating] = useState(0)
    const [error, setError] = useState(null)

      const [cover, setCover] = useState('')
      const [title, setTitle] = useState('')
    
      useEffect(() => {
        if (book?.volumeInfo) {
          const info = book.volumeInfo
          setCover(info.imageLinks?.thumbnail || '')
          setTitle(info.title || '')
        }
      }, [book])
    
      if (loading) return <p>Carregando...</p>
      if (error) return <p>{error}</p>


    const handleRating = (value) => {
        console.log("Nota escolhida: ", value)
        setRating(value);
    };

    const handleSubmit = (event) => {
        event.preventDefault()
        if (rating === 0) {
            setError("Faça uma avaliação")
        }
    }

    return (
    <div className="flex flex-row items-start justify-center mt-20 mb-30">
            <div>
                {title && <h1 className="text-3xl font-bold">{title}</h1>}
                {!title && <h1 className="text-3xl font-bold">Livro</h1>}

                <form onSubmit={handleSubmit} className="flex flex-col w-100 items-center">
                    <label className="my-5 w-full">
                    <h3 className="text-xl">Avaliação:</h3>
                    <StarRating onRate={handleRating} /></label>
                    <label className="mb-5 w-full">
                        <h3 className="text-xl">Opinião:</h3>
                        <textarea
                            id="opinion"
                            name="opinion"
                            placeholder="Escreva sua opinião sobre o livro"
                            required
                            className="w-full outline-0"/>
                    </label>
                    <button onClick={handleSubmit} className="btn mb-5">Avaliar!</button>
                    {error && <p className="error">É necessário uma nota de 1 à 5</p>}
                </form>
            </div>
            <img src={cover} alt="title" />
    </div>
  )
}

export default CreateReview