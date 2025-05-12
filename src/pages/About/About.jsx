import React from 'react'

const About = () => {
  return (
    <div className='flex flex-col items-center justify-center m-5 p-5'>
        <h1 className='text-3xl'>Lit <span className='font-bold'>Space</span></h1>
        <p className='max-w-[1000px] border-l-1 border-[#FFD369] p-2 my-2'>O Litspace nasceu da paixão por livros e da vontade de criar um espaço onde a leitura é mais do que um hábito — é um estilo de vida. Aqui, você encontra reviews sinceros, ideias de leitura pra todos os gostos, e um clube do livro que é praticamente uma reunião de mente brilhante e coração aberto. Nosso objetivo? Espalhar o amor pela leitura, incentivar descobertas literárias e conectar pessoas que acreditam que um bom livro pode mudar tudo. Seja bem-vindo(a) ao Litspace!</p>
        <p>Projeto pessoal criado por <a href="https://github.com/gbarbosa06" target='_blank' className='text-[#FFD369] hover:text-yellow-500'>Guilherme</a></p>
        <p>Feito com &#10084; e React</p>
    </div>
  )
}

export default About