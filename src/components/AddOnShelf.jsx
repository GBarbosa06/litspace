import { useNavigate } from 'react-router-dom'
import { useInsertDocument } from '../hooks/useInsertDocument'

const AddOnShelf = ({uid, bid, title, authors, cover}) => {

    const navigate = useNavigate();

    const {insertDocument, response} = useInsertDocument(`users/${uid}/books`)

    const handleAddOnShelf = () => {
        insertDocument({
            bid,
            title,
            authors,
            cover,
            status: "to-read"
        })
        alert("Livro adicionado");
        navigate('/shelf')
    }

  return (
    <div>
      <button
          className='p-3 bg-[#ffd369] hover:bg-amber-400 transition-colors duration-150 w-80 rounded-2xl cursor-pointer'
          onClick={handleAddOnShelf}
          >Fazer Emprestimo</button>
          <button
          className='p-3 bg-[#ffd369] hover:bg-amber-400 transition-colors duration-150 w-80 rounded-2xl cursor-pointer'
          onClick={handleAddOnShelf}
          >Reservar</button>
    </div>
    )
}

export default AddOnShelf