import React, { useEffect, useState } from 'react'
import Input from '../../components/Input'
import HomeSearch from '../../components/HomeSearch';

const Home = () => {


  return (
    <div className='flex flex-col mt-10 items-center h-screen '>
        <h1 className='text-3xl font-bold'>Lit Space</h1>
        <p className='text-base text-[#696969] mb-5'>Seja bem-vindo ao Lit Space, um espaço para compartilhar suas leituras e interagir com outros leitores.</p>
        <HomeSearch />
    </div>
  )
}

export default Home