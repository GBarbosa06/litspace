import { useFetchDocuments } from "../hooks/useFetchDocuments";

const ReviewsList = () => {
  const { documents: reviews, loading, error } = useFetchDocuments("reviews");

  if (loading) return <p>Carregando avaliações...</p>;
  if (error) return <p>Erro: {error}</p>;
  if (!reviews || reviews.length === 0) return <p>Nenhuma avaliação ainda.</p>;

  return (
    <div>
      <ul>
        {reviews.map((rev) => (
          <li key={rev.bid} className="bg-">
            <h3 className="text-xl font-bold">{rev.title}</h3>
            <p>Avaliação de: {rev.owner}</p>
            <p>Nota: {rev.rating}/5</p>
            <p>Comentário: {rev.description}</p>
            <small>Registrado em: {rev.createdAt?.toDate().toLocaleString()}</small>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ReviewsList;