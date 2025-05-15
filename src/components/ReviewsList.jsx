import { useFetchDocuments } from "../hooks/useFetchDocuments";

const ReviewsList = () => {
  const { documents: reviews, loading, error } = useFetchDocuments("reviews");

  if (loading) return <p>Carregando avaliações...</p>;
  if (error) return <p>Erro: {error}</p>;
  if (!reviews || reviews.length === 0) return <p>Nenhuma avaliação ainda.</p>;

  return (
    <div>
      <h2>Avaliações</h2>
      <ul>
        {reviews.map((rev) => (
          <li key={rev.bid} style={{ border: "1px solid #ccc", padding: "10px", margin: "10px 0" }}>
            <h3>{rev.title}</h3>
            <p>Avaliação de: {rev.owner}</p>
            <p>Nota: {rev.rating}/10</p>
            <p>Comentário: {rev.description}</p>
            <small>Registrado em: {rev.createdAt?.toDate().toLocaleString()}</small>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ReviewsList;