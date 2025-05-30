import { useState, useEffect } from "react";
import StarRating from "../../components/StarRating"
import useGoogleBookById from "../../hooks/useGoogleBookById";
import { useNavigate, useParams } from "react-router-dom";
import { useInsertDocument } from "../../hooks/useInsertDocument";
import { useAuthValue } from "../../context/AuthContext";

const CreateReview = () => {
    const {id} = useParams()
    const { book, loading, error: hookError } = useGoogleBookById(id)
    const [rating, setRating] = useState(0)
    const [description, setDescription] = useState("");
    const [error, setError] = useState(null)

      const [cover, setCover] = useState('')
      const [title, setTitle] = useState('')

      const navigate = useNavigate();
    
      const {insertDocument, response} = useInsertDocument("reviews");

      const {user} = useAuthValue()
    
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

    const handleSubmit = (e) => {
        e.preventDefault()
        if (rating === 0) {
            setError("Faça uma avaliação")
        }
        //! verify if already has this book on shelf page
        insertDocument({
          bid: id,
          rating,
          description,
          title,
          cover,
          owner: user.displayName,
          uid: user.uid
        });
        alert("Avaliação feita!")
        navigate("/")
    }

    return (
    <div className="flex flex-col sm:flex-row items-center sm:items-start justify-center m-10 sm:mt-20 mb-20 sm:mb-30 gap-5">
            <div className="w-full sm:w-auto">
                {title && <h1 className="text-3xl font-bold">{title}</h1>}
                {!title && <h1 className="text-3xl font-bold">Livro</h1>}

                <form onSubmit={handleSubmit} className="flex flex-col w-full items-center sm:items-start">
                    <label className="my-5 w-full">
                    <h3 className="text-lg sm:text-xl">Avaliação:</h3>
                    <StarRating onRate={handleRating} /></label>
                    <label className="mb-5 w-full">
                        <h3 className="text-lg sm:text-xl">Opinião:</h3>
                        <textarea
                            id="opinion"
                            name="opinion"
                            placeholder="Escreva sua opinião sobre o livro"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                            className="w-full outline-0"/>
                    </label>
                    <button onClick={handleSubmit} className="btn mb-5">Avaliar!</button>
                    {error && <p className="error">É necessário uma nota de 1 à 5</p>}
                </form>
            </div>
            {cover && <img src={cover} alt="title" className="w-full sm:w-auto max-w-xs rounded" />}
    </div>
  )
}

export default CreateReview