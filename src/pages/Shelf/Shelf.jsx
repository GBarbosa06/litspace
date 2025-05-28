//hooks
import { useNavigate } from "react-router-dom";
import { useFetchDocuments } from "../../hooks/useFetchDocuments";
import { useDeleteDocument } from "../../hooks/useDeleteDocument";
import { useAuthValue } from "../../context/AuthContext";
import { useEffect, useRef, useState } from "react";

//firebase
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/config";

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
  } = useFetchDocuments(`users/${user?.uid}/books`);
  const navigate = useNavigate();

  const { deleteDocument } = useDeleteDocument(`users/${user?.uid}/books`);

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

  const updateBookStatus = async (bookId, newStatus) => {
    try {
      const bookRef = doc(db, `users/${user.uid}/books`, bookId);
      await updateDoc(bookRef, {
        status: newStatus,
      });
      //! ask if the user wants to review the book
    } catch (error) {
      console.log("Erro ao atualizar o status do livro", error);
    }
  };

  if (loading) return <p>Carregando estante...</p>;
  if (error) return <p>Erro: {error}</p>;
  if (!books || books.length === 0)
    return (
      <div className="my-50 flex flex-col gap-1 justify-center items-center">
        <h2 className="text-2xl font-bold">Nenhum livro na estante ainda.</h2>
        <button className="btn">Buscar!</button>
      </div>
    );

  if (!showName && !showCover) {
    alert("Ative pelo menos o título ou a capa");
    setShowName(true);
  }

  const handleMove = (bookId, status) => {
    console.log(`Mover livro ${bookId} para:`, status);
    setOpenMenuId(null);
    updateBookStatus(bookId, status);
  };

  return (
    <div className="min-h-screen p-5">
      <h1 className="text-center text-2xl sm:text-3xl font-bold mb-3 pb-1 border-b border-gray-400">
        Minha estante
      </h1>
      <form className="flex flex-col sm:flex-row justify-center text-lg sm:text-xl gap-2">
        <label className="checkbox-wrapper gap-2 border-b sm:border-r sm:border-b-0 border-gray-600 pb-2 sm:pr-2">
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
        <label className="checkbox-wrapper gap-2 border-b sm:border-r sm:border-b-0 border-gray-600 pb-2 sm:pr-2">
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
          Data de adição
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

      <div className="flex flex-col gap-5">
        <div className="reading p-3 border-b border-gray-600 w-full">
          <h2 className="text-xl sm:text-2xl font-bold text-center">Lendo</h2>
          {!books.some((book) => book.status === "reading") ? (
            <p className="text-center">Sem livros sendo lidos no momento</p>
          ) : (
            <ul className="flex flex-wrap gap-4 justify-center">
              {books.map(
                (book) =>
                  book.status === "reading" && (
                    <li
                      key={book.id}
                      className="bg-[#2d2d44] px-3 py-3 sm:px-5 sm:py-5 mt-5 rounded-xl sm:rounded-2xl w-full sm:w-50 flex flex-col justify-between items-center gap-4 relative"
                    >
                      {/* 3 dots div */}
                      <div
                        className="absolute top-2 right-2 text-white cursor-pointer text-xl hover:bg-gray-700 transition-colors duration-150 rounded-full"
                        onClick={() =>
                          setOpenMenuId(openMenuId === book.id ? null : book.id)
                        }
                      >
                        ⋯
                      </div>

                      {openMenuId === book.id && (
                        <ul
                          ref={menuRef}
                          className="absolute top-10 right-2 bg-white text-black rounded-md shadow-lg z-10 w-40 text-sm"
                        >
                          <li
                            className="px-4 py-2 rounded-t-md hover:bg-gray-100 cursor-pointer"
                            onClick={() => handleMove(book.id, "to-read")}
                          >
                            Colocar como pendente
                          </li>
                          <li
                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                            onClick={() => handleMove(book.id, "already-read")}
                          >
                            Marcar como Lido
                          </li>
                          <li
                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                            onClick={() => navigate("/book/" + book.bid)}
                          >
                            Ver livro
                          </li>
                          <li
                            className="px-4 py-2 bg-red-200 rounded-b-md hover:bg-red-300 cursor-pointer"
                            onClick={() => deleteDocument(book.id)}
                          >
                            Excluir da estante
                          </li>
                        </ul>
                      )}

                      <div className="text-center">
                        {showName && (
                          <h3 className="text-base sm:text-lg font-bold text-white">
                            {book.title}
                          </h3>
                        )}
                        {showCover && (
                          <img
                            src={book.cover}
                            alt={book.title}
                            className="max-w-full rounded inline-block"
                          />
                        )}
                        {showDate && (
                          <p className="text-xs sm:text-sm text-gray-300 mt-2">
                            Adicionado em:{" "}
                            {book.createdAt?.toDate().toLocaleString()}
                          </p>
                        )}
                      </div>
                    </li>
                  )
              )}
            </ul>
          )}
        </div>

        <div className="to-read p-5 border-b border-gray-600 w-full">
          <h2 className="text-2xl font-bold text-center">Para ler</h2>
          {!books.some((book) => book.status === "to-read") ? (
            <p className="text-center">Sem livros para ler :(</p>
          ) : (
            <ul className="flex flex-wrap gap-4 justify-center">
              {books.map(
                (book) =>
                  book.status === "to-read" && (
                    <li
                      key={book.id}
                      className="bg-[#2d2d44] px-3 py-3 sm:px-5 sm:py-5 mt-5 rounded-xl sm:rounded-2xl w-full sm:w-50 flex flex-col justify-between items-center gap-4 relative"
                    >
                      {/* 3 dots div */}
                      <div
                        className="absolute top-2 right-2 text-white cursor-pointer text-xl hover:bg-gray-700 transition-colors duration-150 rounded-full"
                        onClick={() =>
                          setOpenMenuId(openMenuId === book.id ? null : book.id)
                        }
                      >
                        ⋯
                      </div>

                      {openMenuId === book.id && (
                        <ul
                          ref={menuRef}
                          className="absolute top-10 right-2 bg-white text-black rounded-md shadow-lg z-10 w-40 text-sm"
                        >
                          <li
                            className="px-4 py-2 rounded-t-md hover:bg-gray-100 cursor-pointer"
                            onClick={() => handleMove(book.id, "reading")}
                          >
                            Mover para Lendo
                          </li>
                          <li
                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                            onClick={() => handleMove(book.id, "already-read")}
                          >
                            Marcar como Lido
                          </li>

                          <li
                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                            onClick={() => navigate("/book/" + book.bid)}
                          >
                            Ver livro
                          </li>
                          <li
                            className="px-4 py-2 bg-red-200 rounded-b-md hover:bg-red-300 cursor-pointer"
                            onClick={() => deleteDocument(book.id)}
                          >
                            Excluir da estante
                          </li>
                        </ul>
                      )}

                      <div className="text-center">
                        {showName && (
                          <h3 className="text-base sm:text-lg font-bold text-white">
                            {book.title}
                          </h3>
                        )}
                        {showCover && (
                          <img
                            src={book.cover}
                            alt={book.title}
                            className="max-w-full rounded inline-block"
                          />
                        )}
                        {showDate && (
                          <p className="text-xs sm:text-sm text-gray-300 mt-2">
                            Adicionado em:{" "}
                            {book.createdAt?.toDate().toLocaleString()}
                          </p>
                        )}
                      </div>
                    </li>
                  )
              )}
            </ul>
          )}
        </div>

        <div className="already-read p-5 w-full">
          <h2 className="text-2xl font-bold text-center">Lido</h2>
          {!books.some((book) => book.status === "already-read") ? (
            <p className="text-center">Sem livros lidos</p>
          ) : (
            <ul className="flex flex-wrap gap-4 justify-center">
              {books.map(
                (book) =>
                  book.status === "already-read" && (
                    <li
                      key={book.id}
                      className="bg-[#2d2d44] px-3 py-3 sm:px-5 sm:py-5 mt-5 rounded-xl sm:rounded-2xl w-full sm:w-50 flex flex-col justify-between items-center gap-4 relative"
                    >
                      {/* 3 dots div */}
                      <div
                        className="absolute top-2 right-2 text-white cursor-pointer text-xl hover:bg-gray-700 transition-colors duration-150 rounded-full"
                        onClick={() =>
                          setOpenMenuId(openMenuId === book.id ? null : book.id)
                        }
                      >
                        ⋯
                      </div>

                      {openMenuId === book.id && (
                        <ul
                          ref={menuRef}
                          className="absolute top-10 right-2 bg-white text-black rounded-md shadow-lg z-10 w-40 text-sm"
                        >
                          <li
                            className="px-4 py-2 rounded-t-md hover:bg-gray-100 cursor-pointer"
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
                          <li
                            className="px-4 py-2 bg-red-200 rounded-b-md hover:bg-red-300 cursor-pointer"
                            onClick={() => deleteDocument(book.id)}
                          >
                            Excluir da estante
                          </li>
                        </ul>
                      )}

                      <div className="text-center">
                        {showName && (
                          <h3 className="text-base sm:text-lg font-bold text-white">
                            {book.title}
                          </h3>
                        )}
                        {showCover && (
                          <img
                            src={book.cover}
                            alt={book.title}
                            className="max-w-full rounded inline-block"
                          />
                        )}
                        {showDate && (
                          <p className="text-xs sm:text-sm text-gray-300 mt-2">
                            Adicionado em:{" "}
                            {book.createdAt?.toDate().toLocaleString()}
                          </p>
                        )}
                      </div>
                    </li>
                  )
              )}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Shelf;
