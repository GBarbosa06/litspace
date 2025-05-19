import { useNavigate } from "react-router-dom";
import {useFetchDocuments} from "../../hooks/useFetchDocuments"
import { useAuthValue } from "../../context/AuthContext";
import { useEffect, useState } from "react";

const Shelf = () => {
  const [showName, setShowName] = useState(true);
  const [showCover, setShowCover] = useState(true);
  const [showDate, setShowDate] = useState(false);

  const { user } = useAuthValue();
  const { documents: books, loading, error } = useFetchDocuments(`users/${user.uid}/books`);
  const navigate = useNavigate();

  if (loading) return <p>Carregando estante...</p>;
  if (error) return <p>Erro: {error}</p>;
  if (!books || books.length === 0) return <p>Nenhum livro na estante ainda.</p>;


    if (!showName && !showCover) {
      alert("Ative pelo menos o título ou a capa")
      setShowName(true);

    }
  

  return (
    <div className='min-h-screen p-5'>
      <form className="flex flex-row  text-xl">
        <label className="checkbox-wrapper gap-2 border-r border-gray-600 mr-1">
          Nome
          <input type="checkbox" name="showName" id="showName" checked={showName} onChange={() => {setShowName(!showName)}} />
          <span className="custom-checkbox"></span>
        </label>
        <label className="checkbox-wrapper gap-2 border-r border-gray-600 mr-1">
          Capa
          <input type="checkbox" name="showCover" id="showCover" checked={showCover} onChange={() => {setShowCover(!showCover)}} />
          <span className="custom-checkbox"></span>
        </label>
        <label className="checkbox-wrapper gap-2">
          Data
          <input type="checkbox" name="showDate" id="showDate" checked={showDate} onChange={() => {setShowDate(!showDate)}} />
          <span className="custom-checkbox"></span>
        </label>
      </form>


        <ul className=" flex">
        {books.map((rev) => (
          <li key={rev.id} className="bg-[#2d2d44] px-5 py-5 m-5 rounded-2xl w-50 flex flex-col justify-between items-center gap-4 cursor-pointer hover:-translate-y-1.5 transition duration-150" onClick={() => navigate("/book/" + rev.bid)}>
            
            {showName && <h3 className="text-xl font-bold">{rev.title}</h3>}
            {showCover && <img src={rev.cover}/>}
            {showDate && <p className="text-sm">Adicionado em: {rev.createdAt?.toDate().toLocaleString()}</p>}
            
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Shelf


