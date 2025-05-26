import { useNavigate } from "react-router-dom";
import { useFetchDocuments } from "../hooks/useFetchDocuments";
import { StarRatingShow } from "./StarRatingShow";

import { Pencil ,Trash2, BookOpen } from "lucide-react";
import { useAuthValue } from "../context/AuthContext";
import { useDeleteDocument } from "../hooks/useDeleteDocument";


const ReviewsList = () => {
  const { documents: reviews, loading, error } = useFetchDocuments("reviews");

  const {deleteDocument} = useDeleteDocument("reviews")

  const {user} = useAuthValue()
  
  const navigate = useNavigate();

  if (loading) return <p>Carregando avaliações...</p>;
  if (error) return <p>Erro: {error}</p>;
  if (!reviews || reviews.length === 0) return <p>Nenhuma avaliação ainda.</p>;




  return (
    <div>
      <ul>
        {reviews.map((rev) => (
          <li key={rev.id} className="bg-[#2d2d44] px-5 py-2 mb-5 rounded-2xl max-w-150 flex justify-between gap-4 ">
            <div className="pt-2 flex flex-col justify-between">
              <div>
                <StarRatingShow  rating={rev.rating}/>
                <h3 className="text-xl font-bold">{rev.title}</h3>
                <p className="font-bold"><span className="italic">{rev.owner}</span> diz...</p>
                <p className="flex flex-wrap gap-1">"{rev.description}"</p>
                <p className="text-sm"> {rev.createdAt?.toDate().toLocaleString()}</p>
              </div>
              {user.uid === rev.uid && <div className="flex gap-2 cursor-pointer">
                <Pencil className="hover:-translate-y-0.5" /> {/* not working */}
                <Trash2 className="hover:-translate-y-0.5" onClick={() => {deleteDocument(rev.id)}} />
                <BookOpen className="hover:-translate-y-0.5" onClick={() => navigate("/book/" + rev.bid)}/>
              </div>}
            </div>
            <img src={rev.cover} onClick={() => navigate("/book/" + rev.bid)} className="hover:-translate-y-1.5 transition duration-150 cursor-pointer" />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ReviewsList;