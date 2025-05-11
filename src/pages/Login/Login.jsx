import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

// hooks
import { useAuthentication } from '../../hooks/useAuthentication';

//components
import Input from '../../components/Input'
import Label from '../../components/Label';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const { login, error: authError, loading } = useAuthentication();
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    const user = {
      email,
      password
    }

    const res = await login(user);
    if (res) {
      navigate('/');
    }
    
  }

  useEffect(() =>{
    if(authError){
      setError(authError)
    }
  }, [authError])

  return (
    <div className='flex flex-col mt-10 items-center h-screen '>
      <h1 className='text-3xl font-bold'>Registro de usuário</h1>
      <p className='text-sm text-[#696969] mb-5'>Crie uma conta para poder interagir</p>
    <form className='flex flex-col justify-center items-center gap-5 w-[100%]' onSubmit={handleSubmit}>
      <Label>
          <span className=' text-[#ccc] font-bold'>Email: </span>
          <Input 
          type="email" 
          name="email"
          placeholder="Digite seu email" 
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          required />
      </Label>
      <Label>
          <span className=' text-[#ccc] font-bold'>Senha: </span>
          <Input 
          type="password" 
          name="password"
          placeholder="Digite sua senha" 
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          required />
      </Label>
      {!loading && <button className='btn'>Entrar</button>}
      {loading && <p className='text-[#ccc]'>Aguarde...</p>}
      {error && <p className='error'>{error}</p>}
      <p className='text-sm text-[#696969]'>Não tem uma conta? <a href="/login" className='text-[#ccc] font-bold'>Criar conta</a></p>
    </form>
    </div>
  )
}

export default Login