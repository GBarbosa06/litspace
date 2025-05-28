import { useState, useEffect } from "react";
import StarRating from "../../components/StarRating"
import useGoogleBookById from "../../hooks/useGoogleBookById";
import { useNavigate, useParams } from "react-router-dom";
import { useAuthValue } from "../../context/AuthContext";
import { useFetchDocuments } from "../../hooks/useFetchDocuments";
import { useFetchDocument } from "../../hooks/useFetchDocument";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/config";

const EditReview = () => {
    const {id} = useParams()
    const {document: review, loading, error: fetchError} = useFetchDocument("reviews", id);

    
    const { book, loading: bookLoading, error: bookError } = useGoogleBookById(review?.bid)
    const [rating, setRating] = useState(0);
    const [description, setDescription] = useState("");
    const [error, setError] = useState(null)

      const [cover, setCover] = useState('')
      const [title, setTitle] = useState('')

      const navigate = useNavigate();
    
      const {user} = useAuthValue()
    
      useEffect(() => {
        if (book?.volumeInfo) {
          const info = book.volumeInfo
          setCover(info.imageLinks?.thumbnail || '')
          setTitle(info.title || '')
        }
      }, [book])

      useEffect(() => {
        if (review && rating === 0) {
          setRating(review.rating || 0);
          setDescription(review.description || "");
          setCover(review.cover || '');
          setTitle(review.title || '');
        }
      }, [review])
    
      if (loading || bookLoading ) return <p>Carregando...</p>
      if (error || bookError) return <p>{error || bookError}</p>


      const updateReview = async (rating, description) => {
        try {
          const reviewRef = doc(db, `reviews`, id);
          await updateDoc(reviewRef, {
            rating,
            description,
          })
        }
          catch (error){
            console.log("Erro ao atualizar a avaliação", error)
          }
      }

      const handleRating = (value) => {
        console.log("Nota escolhida: ", value)
        setRating(value);
    };

    const handleSubmit = (e) => {
        e.preventDefault()
        if (user.uid !== review.uid) {
            setError("Você não pode editar essa avaliação")
            return
        }
        if (rating === 0) {
            setError("Faça uma avaliação")
        }
        updateReview(rating, description)
        setError(null)
        alert("Edição feita!")
        navigate("/")
    }

    return (
    <div className="flex flex-row items-start justify-center mt-20 mb-30">
            <div>
                {title && <h1 className="text-3xl font-bold">{title}</h1>}
                {!title && <h1 className="text-3xl font-bold">Livro</h1>}

                <form onSubmit={handleSubmit} className="flex flex-col w-100 items-center">
                    <label className="my-5 w-full">
                    <h3 className="text-xl">Avaliação:</h3>
                    <StarRating onRate={handleRating} initialRate={rating} /></label>
                    <label className="mb-5 w-full">
                        <h3 className="text-xl">Opinião:</h3>
                        <textarea
                            id="opinion"
                            name="opinion"
                            placeholder="Escreva sua opinião sobre o livro"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                            className="w-full outline-0"/>
                    </label>
                    <button onClick={handleSubmit} className="btn mb-5">Pronto!</button>
                    {error && <p className="error">É necessário uma nota de 1 à 5</p>}
                </form>
            </div>
            {cover && <img src={cover} alt="title" />}
    </div>
  )
}

export default EditReview