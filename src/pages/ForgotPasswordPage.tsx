import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (email) {
      const storedEmail = localStorage.getItem('userEmail');
      
      // Memeriksa apakah email yang dimasukkan sesuai dengan yang ada di localStorage
      if (storedEmail === email) {
        // Mengubah password di localStorage menjadi password default 'password123'
        localStorage.setItem('userPassword', 'password123');

        setMessage('Check your email to reset your password.');
        setTimeout(() => {
          navigate('/login');
        }, 3000); 
      } else {
        alert('Email not found.');
      }
    } else {
      alert("Please enter a valid email.");
    }
  };

  return (
    <div className="max-w-sm mx-auto p-6 bg-white rounded-md shadow-md">
      <h2 className="text-2xl font-semibold mb-6">Forgot Password</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors mt-4"
        >
          Reset Password
        </button>
      </form>

      {message && <div className="mt-4 text-green-600">{message}</div>}
    </div>
  );
};

export default ForgotPasswordPage;
