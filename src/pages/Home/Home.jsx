import React, { useEffect, useState } from 'react'

import Input from '../../components/Input'
import HomeSearch from '../../components/HomeSearch';
import ReviewsList from '../../components/ReviewsList';

const Home = () => {



  
  return (
    <div className='flex flex-col mt-10 items-center h-screen '>
        <h1 className='text-3xl font-bold'>Lit Space</h1>
        <p className='text-base text-[#696969] mb-5'>Seja bem-vindo(a) ao Lit Space, um espaço para compartilhar suas leituras e interagir com outros leitores.</p>
        <HomeSearch />

        <h2 className='border-t-1 border-gray-600 w-[80%] m-5 pt-3 text-center text-2xl font-bold text-[#FFD369]'>Avaliações</h2>
        <ReviewsList />
    </div>
  )
}

export default Home