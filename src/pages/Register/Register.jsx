import React, { useEffect, useState } from 'react'
import Input from '../../components/Input'
import Label from '../../components/Label';

const Register = () => {
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    
  }

  return (
    <div className='flex flex-col mt-10 items-center h-screen '>
      <h1 className='text-3xl font-bold'>Registro de usuário</h1>
      <p className='text-sm text-[#696969] mb-5'>Crie uma conta para poder interagir</p>
    <form className='flex flex-col justify-center items-center gap-5 w-[100%]' onSubmit={handleSubmit}>
      <Label>
          <span className=' text-[#ccc] font-bold'>Nome: </span>
          <Input 
          type="text" 
          placeholder="Nome do usuário" 
          onChange={(e) => setDisplayName(e.target.value)}
          value={displayName}
          required />
      </Label>
      <Label>
          <span className=' text-[#ccc] font-bold'>Email: </span>
          <Input 
          type="text" 
          placeholder="Digite seu email" 
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          required />
      </Label>
      <Label>
          <span className=' text-[#ccc] font-bold'>Senha: </span>
          <Input 
          type="text" 
          placeholder="Digite sua senha" 
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          required />
      </Label>
      <Label>
          <span className=' text-[#ccc] font-bold'>Confirme sua senha: </span>
          <Input 
          type="text" 
          placeholder="Repita senha"
          onChange={(e) => setConfirmPassword(e.target.value)} 
          value={confirmPassword}
          required />
      </Label>
      <button className='btn'>Cadastrar</button>
      {error && <p className='error'>{error}</p>}
      <p className='text-sm text-[#696969]'>Já tem uma conta? <a href="/login" className='text-[#ccc] font-bold'>Faça login</a></p>
    </form>
    </div>
  )
}

export default Register