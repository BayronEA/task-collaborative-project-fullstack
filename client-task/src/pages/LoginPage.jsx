import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm()
  const { signin, errors: signinErrors, isAuthenticated } = useAuth()
  const navigate = useNavigate()
  const onSubmit = handleSubmit(data => {
    signin(data)
  })
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/tasks')
    }
  }, [isAuthenticated])

  return (
    <div className="flex h-[calc(100vh-100px)] items-center justify-center">
      <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
        {Array.isArray(signinErrors) &&
          signinErrors.length > 0 &&
          signinErrors.map((error, i) => (
            <div className="bg-red-500 p-2 text-white my-2" key={i}>
              {error}
            </div>
          ))}
        <h1 className="text-2xl font-bold"> Login</h1>
        <form onSubmit={onSubmit}>
          <input
            type="email"
            {...register('email', { required: true })}
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
            placeholder="Email"
          />
          {errors.email && <p className="text-red-500">Email is required</p>}
          <input
            type="password"
            {...register('password', { required: true })}
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
            placeholder="Password"
          />
          {errors.password && (
            <p className="text-red-500">Password is required</p>
          )}
          <button
            type="submit"
            className="bg-green-700 hover:bg-green-800 text-white font-bold px-4 py-2 rounded-md"
          >
            login
          </button>
        </form>
        <p className="flex gap-x-2 justify-between">
          ¿No tienes una cuenta?{' '}
          <Link to="/register" className="text-sky-500">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  )
}

export default LoginPage
