import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

interface RegisterForm {
  email: string;
  password: string;
  confirmPassword: string;
}

const RegisterPage = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm<RegisterForm>();

  const onSubmit = (data: RegisterForm) => {
    if (data.password === data.confirmPassword) {
      // Simpan email dan password di localStorage
      localStorage.setItem('userEmail', data.email);
      localStorage.setItem('userPassword', data.password); 

      // Setelah pendaftaran berhasil, arahkan ke halaman login
      navigate('/login'); 
    } else {
      alert("Password and Confirm password do not match.");
    }
  };

  return (
    <div className="max-w-sm mx-auto p-6 bg-white rounded-md shadow-md">
      <h2 className="text-2xl font-semibold mb-6 text-center">Create an Account</h2>
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

        <div>
          <label className="block text-sm font-medium text-gray-700">Password Confirmation</label>
          <input
            type="password"
            {...register('confirmPassword', { required: 'Please confirm your password' })}
            className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.confirmPassword && <p className="text-red-600 text-sm">{errors.confirmPassword.message}</p>}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors mt-4"
        >
          Register
        </button>
      </form>

      <div className="mt-4 text-center">
        <p className="text-sm">Already have an account? <a href="/login" className="text-blue-600 hover:text-blue-800">Log in here</a></p>
      </div>
    </div>
  );
};

export default RegisterPage;
