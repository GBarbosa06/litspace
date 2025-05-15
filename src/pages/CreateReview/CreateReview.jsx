import { useState } from "react";
import StarRating from "../../components/StarRating"

const CreateReview = () => {
    const [rating, setRating] = useState(0)
    const [error, setError] = useState(null)

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
                <h1 className="text-3xl font-bold">Livro:</h1>
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
                        className="w-full"/>
                </label>
                <button onClick={handleSubmit} className="btn mb-5">Avaliar!</button>
                {error && <p className="error">É necessário uma nota de 1 à 5</p>}
                        </form>
            </div>
            <div className="h-50 w-40 bg-amber-400">
                capa
            </div>
    </div>
  )
}

export default CreateReview