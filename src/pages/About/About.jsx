import React from 'react'

const About = () => {
  const teste = 1;
  return (
    <div className='flex flex-col items-center my-10 mx-5 p-5 min-h-screen'>
        <h1 className='text-3xl'>Lit <span className='font-bold'>Space</span></h1>
        <p className='max-w-[1000px] font-[Playfair_Display] text-xl border-l-1 border-[#FFD369] p-2 my-2 text-justify'>O Litspace nasceu da paixão por livros e da vontade de criar um espaço onde a leitura é mais do que um hábito — é um estilo de vida. Aqui, você encontra reviews sinceros, ideias de leitura pra todos os gostos, e um clube do livro que é praticamente uma reunião de mente brilhante e coração aberto. Nosso objetivo? Espalhar o amor pela leitura, incentivar descobertas literárias e conectar pessoas que acreditam que um bom livro pode mudar tudo. Seja bem-vindo(a) ao Litspace!</p>
        <p className='text-gray-400 text-sm'>O LitSpace usa a API gratuita do Google Livros, então, é importante ressaltar que pode não conter todos os livros buscados</p>
        <p>Projeto pessoal criado por <a href="https://github.com/gbarbosa06" target='_blank' className='text-[#FFD369] hover:text-yellow-500'>Guilherme</a></p>
        <p>Feito com &#10084; e React</p>
    </div>


  )
}

export default About