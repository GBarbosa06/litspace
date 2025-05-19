import { useInsertDocument } from '../hooks/useInsertDocument'

const AddOnShelf = ({uid, bid, title, authors, cover}) => {

    const {insertDocument, response} = useInsertDocument("users/" + uid + "/books")

    const handleAddOnShelf = () => {
        insertDocument({
            bid,
            title,
            authors,
            cover
        })
        alert("Livro adicionado")
    }

  return (
    <button 
        className='p-3 bg-[#ffd369] hover:bg-amber-400 transition-colors duration-150 w-80 rounded-2xl cursor-pointer'
        onClick={handleAddOnShelf}
        >Adicionar à estante</button>
  )
}

export default AddOnShelf