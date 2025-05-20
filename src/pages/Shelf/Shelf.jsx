import { useNavigate } from "react-router-dom";
import { useFetchDocuments } from "../../hooks/useFetchDocuments";
import { useAuthValue } from "../../context/AuthContext";
import { useEffect, useRef, useState } from "react";


//? for future updates, it's needed to put all the '.map's in a component apart

const Shelf = () => {
  const [showName, setShowName] = useState(true);
  const [showCover, setShowCover] = useState(true);
  const [showDate, setShowDate] = useState(false);
  const [openMenuId, setOpenMenuId] = useState(null);

  const menuRef = useRef(null);

  const { user } = useAuthValue();
  const {
    documents: books,
    loading,
    error,
  } = useFetchDocuments(`users/${user.uid}/books`);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpenMenuId(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  if (loading) return <p>Carregando estante...</p>;
  if (error) return <p>Erro: {error}</p>;
  if (!books || books.length === 0)
    return <p>Nenhum livro na estante ainda.</p>;

  if (!showName && !showCover) {
    alert("Ative pelo menos o título ou a capa");
    setShowName(true);
  }

  // ! to change the book status on firestore
  const handleMove = (bookId, status) => {
    console.log(`Mover livro ${bookId} para:`, status);
    setOpenMenuId(null);
  };

  return (
    <div className="min-h-screen p-5">
      <h1 className="text-center text-3xl font-bold">Minha estante</h1>
      <form className="flex flex-row  text-xl">
        <label className="checkbox-wrapper gap-2 border-r border-gray-600 mr-1">
          Nome
          <input
            type="checkbox"
            name="showName"
            id="showName"
            checked={showName}
            onChange={() => {
              setShowName(!showName);
            }}
          />
          <span className="custom-checkbox"></span>
        </label>
        <label className="checkbox-wrapper gap-2 border-r border-gray-600 mr-1">
          Capa
          <input
            type="checkbox"
            name="showCover"
            id="showCover"
            checked={showCover}
            onChange={() => {
              setShowCover(!showCover);
            }}
          />
          <span className="custom-checkbox"></span>
        </label>
        <label className="checkbox-wrapper gap-2">
          Data
          <input
            type="checkbox"
            name="showDate"
            id="showDate"
            checked={showDate}
            onChange={() => {
              setShowDate(!showDate);
            }}
          />
          <span className="custom-checkbox"></span>
        </label>
      </form>

      <div className="flex flex-col">
        <div className="reading min-h-50 p-3 border-b border-gray-600 w-full">
          <h2 className="text-2xl font-bold text-center font-['Playfair_Display']">
            Lendo
          </h2>
          {!books.some((book) => book.status === "reading") ? (
            <p>Sem livros sendo lidos no momento</p>
          ) : (
            <ul className="flex flex-wrap gap-2">
              {books.map((book) => (book.status === "reading" &&
                <li key={book.id} className="bg-[#2d2d44] px-5 py-5 mt-5 rounded-2xl w-50 flex flex-col justify-between items-center gap-4 relative">
                  {/* 3 dots div */}
                  <div
                    className="absolute top-2 right-2 text-white cursor-pointer text-xl hover:bg-gray-700 transition-colors duration-150 rounded-full"
                    onClick={() =>
                      setOpenMenuId(openMenuId === book.id ? null : book.id)
                    }
                  >⋯</div>

                  {openMenuId === book.id && (
                    <ul
                      ref={menuRef}
                      className="absolute top-10 right-2 bg-white text-black rounded-md shadow-lg z-10 w-40 text-sm"
                    >
                      <li
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                        onClick={() => handleMove(book.id, "already-read")}
                      >
                        Marcar como Lido
                      </li>
                      <li
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                        onClick={() => handleMove(book.id, "reading")}
                      >
                        Mover para Lendo
                      </li>
                      <li
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                        onClick={() => handleMove(book.id, "to-read")}
                      >
                        Colocar como pendente
                      </li>
                      <li
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                        onClick={() => navigate("/book/" + book.bid)}
                      >
                        Ver livro
                      </li>
                    </ul>
                  )}

                  <div className="text-center">
                    {showName && (
                      <h3 className="text-lg font-bold text-white">
                        {book.title}
                      </h3>
                    )}
                    {showCover && (
                      <img
                        src={book.cover}
                        alt={book.title}
                        className="w-full rounded-md"
                      />
                    )}
                    {showDate && (
                      <p className="text-sm text-gray-300 mt-2">
                        Adicionado em:{" "}
                        {book.createdAt?.toDate().toLocaleString()}
                      </p>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="to-read min-h-50 border-b p-5 border-gray-600 w-full">
          <h2 className="text-2xl font-bold text-center font-['Playfair_Display']">
            Para ler
          </h2>
          {!books.some((book) => book.status === "to-read") ? (
            <p>Sem livros para ler :(</p>
          ) : (
            <ul className="flex flex-wrap gap-2">
              {books.map((book) => (book.status === "to-read" &&
                <li key={book.id} className="bg-[#2d2d44] px-5 py-5 mt-5 rounded-2xl w-50 flex flex-col justify-between items-center gap-4 relative">
                  {/* 3 dots div */}
                  <div
                    className="absolute top-2 right-2 text-white cursor-pointer text-xl hover:bg-gray-700 transition-colors duration-150 rounded-full"
                    onClick={() =>
                      setOpenMenuId(openMenuId === book.id ? null : book.id)
                    }
                  >⋯</div>

                  {openMenuId === book.id && (
                    <ul
                      ref={menuRef}
                      className="absolute top-10 right-2 bg-white text-black rounded-md shadow-lg z-10 w-40 text-sm"
                    >
                      <li
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                        onClick={() => handleMove(book.id, "already-read")}
                      >
                        Marcar como Lido
                      </li>
                      <li
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                        onClick={() => handleMove(book.id, "reading")}
                      >
                        Mover para Lendo
                      </li>
                      <li
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                        onClick={() => handleMove(book.id, "to-read")}
                      >
                        Colocar como pendente
                      </li>
                      <li
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                        onClick={() => navigate("/book/" + book.bid)}
                      >
                        Ver livro
                      </li>
                    </ul>
                  )}

                  <div className="text-center">
                    {showName && (
                      <h3 className="text-lg font-bold text-white">
                        {book.title}
                      </h3>
                    )}
                    {showCover && (
                      <img
                        src={book.cover}
                        alt={book.title}
                        className="w-full rounded-md"
                      />
                    )}
                    {showDate && (
                      <p className="text-sm text-gray-300 mt-2">
                        Adicionado em:{" "}
                        {book.createdAt?.toDate().toLocaleString()}
                      </p>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="already-read min-h-50 p-5 w-full">
          <h2 className="text-2xl font-bold text-center font-['Playfair_Display']">
            Lido
          </h2>
          {!books.some((book) => book.status === "aready-read") ? (
            <p>Sem livros lidos</p>
          ) : (
            <ul className="flex flex-wrap gap-2">
              {books.map((book) => (book.status === "aready-read" &&
                <li key={book.id} className="bg-[#2d2d44] px-5 py-5 mt-5 rounded-2xl w-50 flex flex-col justify-between items-center gap-4 relative">
                  {/* 3 dots div */}
                  <div
                    className="absolute top-2 right-2 text-white cursor-pointer text-xl hover:bg-gray-700 transition-colors duration-150 rounded-full"
                    onClick={() =>
                      setOpenMenuId(openMenuId === book.id ? null : book.id)
                    }
                  >⋯</div>

                  {openMenuId === book.id && (
                    <ul
                      ref={menuRef}
                      className="absolute top-10 right-2 bg-white text-black rounded-md shadow-lg z-10 w-40 text-sm"
                    >
                      <li
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                        onClick={() => handleMove(book.id, "already-read")}
                      >
                        Marcar como Lido
                      </li>
                      <li
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                        onClick={() => handleMove(book.id, "reading")}
                      >
                        Mover para Lendo
                      </li>
                      <li
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                        onClick={() => handleMove(book.id, "to-read")}
                      >
                        Colocar como pendente
                      </li>
                      <li
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                        onClick={() => navigate("/book/" + book.bid)}
                      >
                        Ver livro
                      </li>
                    </ul>
                  )}

                  <div className="text-center">
                    {showName && (
                      <h3 className="text-lg font-bold text-white">
                        {book.title}
                      </h3>
                    )}
                    {showCover && (
                      <img
                        src={book.cover}
                        alt={book.title}
                        className="w-full rounded-md"
                      />
                    )}
                    {showDate && (
                      <p className="text-sm text-gray-300 mt-2">
                        Adicionado em:{" "}
                        {book.createdAt?.toDate().toLocaleString()}
                      </p>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      
    </div>
  );
};

export default Shelf;
