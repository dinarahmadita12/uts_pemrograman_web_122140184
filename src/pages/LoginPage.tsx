import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

interface LoginForm {
  email: string;
  password: string;
}

const LoginPage = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm<LoginForm>();

  const onSubmit = (data: LoginForm) => {
    const storedEmail = localStorage.getItem('userEmail');
    const storedPassword = localStorage.getItem('userPassword'); // Ambil password dari localStorage

    if (data.email === storedEmail && data.password === storedPassword) {
      localStorage.setItem('isLoggedIn', 'true'); // Simpan status login
      navigate('/'); // Arahkan ke halaman utama setelah login
    } else {
      alert('Email atau Password salah.');
    }
  };

  return (
    <div className="max-w-sm mx-auto p-6 bg-white rounded-md shadow-md">
      <h2 className="text-2xl font-semibold mb-6 text-center">Log in to Your Account</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            {...register('email', { required: 'Email is required' })}
            className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.email && <p className="text-red-600 text-sm">{errors.email.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            {...register('password', { required: 'Password is required' })}
            className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.password && <p className="text-red-600 text-sm">{errors.password.message}</p>}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors mt-4"
        >
          Log In
        </button>
      </form>

      <div className="mt-4 text-center">
        <p className="text-sm">Don't have an account yet? <a href="/register" className="text-blue-600 hover:text-blue-800">Register here</a></p>
        <p className="text-sm">Forgot your password? <a href="/forgot-password" className="text-blue-600 hover:text-blue-800">Reset here</a></p>
      </div>
    </div>
  );
};

export default LoginPage;
