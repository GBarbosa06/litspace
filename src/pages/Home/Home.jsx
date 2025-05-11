import React, { useEffect, useState } from 'react'
import Input from '../../components/Input'
import useGoogleBooks from '../../hooks/useGoogleBooks';
import { setLogLevel } from 'firebase/app';

const Home = () => {
    const [query, setQuery] = useState('');

    const { books, loading, error } = useGoogleBooks(query);

    const handleSearch = (e) => {
        e.preventDefault();
        if (search.trim() === '') {
            alert('Por favor, insira um termo de busca.');
            return;
        }
    }

  return (
    <div className='flex flex-col mt-10 items-center h-screen '>
        <h1 className='text-3xl font-bold'>Lit Space</h1>
        <p className='text-base text-[#696969] mb-5'>Seja bem-vindo ao Lit Space, um espaço para compartilhar suas leituras e interagir com outros leitores.</p>
        <form className='flex gap-5' onSubmit={handleSearch}>
            <input
            className="font-['Work_Sans'] focus:outline-0 focus:border-b-2 box-border border-b border-[#2d2d44] py-3 bg-transparent w-60 text-[#ccc]"
            placeholder='Busque um livro'
            onChange={(e) => setQuery(e.target.value)}
            value={query}
            />
            <button className='bg-[#ffd369] p-3 rounded-full text-amber-950 font-bold hover:bg-[#ffd350] transition'>Procurar</button>
        </form>
        {loading && <p className='text-[#ccc]'>Carregando...</p>}
        {error && <p className='text-red-500'>{error}</p>}
        {books && books.length > 0 && (
            <div className='flex flex-col gap-5 mt-5'>
                {books.map((book) => (
                    <div key={book.id} className='bg-[#2d2d44] p-5 rounded-lg shadow-md'>
                        <h2 className='text-xl font-bold text-[#ffd369]'>{book.volumeInfo.title}</h2>
                        <p className='text-[#ccc]'>{book.volumeInfo.description}</p>
                    </div>
                ))}
            </div>
        )}
    </div>
  )
}

export default Home