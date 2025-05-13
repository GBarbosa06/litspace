import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom';
import Input from './Input';
import useGoogleBooks from '../hooks/useGoogleBooks';
import { setLogLevel } from 'firebase/app';

const HomeSearch = () => {
    const [query, setQuery] = useState('');
    const [search, setSearch] = useState(false);


    const { books, loading, error } = useGoogleBooks(query);

    useEffect(() => {
        if(!query){
            setSearch(false);
        }
    }, [query]);

    const handleSearch = (e) => {
        e.preventDefault();
        if (query.trim() === '') {
            alert('Por favor, insira um termo de busca.');
            return;
        }
    }

  return (
    <div className='flex flex-col items-center justify-center w-[30%]'>
       
        <form className='flex gap-5' onSubmit={handleSearch}>
            <input
            className="font-['Work_Sans'] focus:outline-0 focus:border-b-2 box-border border-b border-[#2d2d44] py-3 bg-transparent w-60 text-[#ccc]"
            placeholder='Busque um livro'
            onChange={(e) => setQuery(e.target.value)}
            value={query}
            />
            <button className='bg-[#ffd369] p-3 rounded-full text-amber-950 font-bold hover:bg-[#ffd350] transition' 
                onClick={() => {
                    setSearch(!search)
                    if (search) {
                        setQuery('');
                }}}>
                {!search ? 'Buscar' : 'Cancelar'}
                </button>
        </form>
        {search && loading && <p className='text-[#ccc]'>Carregando...</p>}
        {error && <p className='text-red-500'>{error}</p>}
        {search && books && books.length > 0 && (
            <div className='flex flex-col w-90 gap-1 mt-2 overflow-y-scroll max-h-80 p-1 border-1 rounded-lg border-[#2d2d44]'>
                {books.map((book) => (
                    <NavLink to={`/book/${book.id}`} key={book.id} className='bg-[#2d2d44] p-3 rounded-lg shadow-md'>
                        <h2 className=' w-full text-[#ffd369]'>{book.volumeInfo.title}</h2>
                        {/* <p className='text-[#ccc]'>{book.volumeInfo.description}</p> */}
                        
                    </NavLink>
                ))}
            </div>
        )}
    </div>
  )
}

export default HomeSearch