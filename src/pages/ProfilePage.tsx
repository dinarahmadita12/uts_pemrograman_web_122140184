import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useStore } from '../store/useStore';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom'; 
import type { User } from '../types';

function ProfilePage() {
  const { user, setUser } = useStore();
  const { register, handleSubmit, formState: { errors } } = useForm<User>({
    defaultValues: user || { name: '', email: '', address: '', phone: '' }, 
  });
  const [saveSuccess, setSaveSuccess] = useState(false); 
  const navigate = useNavigate(); 

  const onSubmit = (data: User) => {
    setUser(data);  
    setSaveSuccess(true); 
    setTimeout(() => {
      setSaveSuccess(false); 
      navigate('/checkout'); 
    }, 3000);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-4">
        <Link to="/" className="text-blue-600 hover:text-blue-800 flex items-center">
          <span className="mr-2">&larr;</span> Back
        </Link>
      </div>

      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Profile</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                {...register('name', { required: 'Name is required' })}
                className="mt-1 block w-full rounded-md border-2 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
              {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                {...register('email', { required: 'Email is required' })}
                className="mt-1 block w-full rounded-md border-2 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
              {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Address</label>
              <textarea
                {...register('address', { required: 'Address is required' })}
                className="mt-1 block w-full rounded-md border-2 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
              {errors.address && <p className="mt-1 text-sm text-red-600">{errors.address.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Phone</label>
              <input
                type="tel"
                {...register('phone', { required: 'Phone is required' })}
                className="mt-1 block w-full rounded-md border-2 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
              {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>}
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            Update Profile
          </button>
        </div>
      </form>

      {saveSuccess && (
        <div className="mt-4 text-center text-green-600">
          <p>Your profile has been successfully updated!</p>
        </div>
      )}
    </div>
  );
}

export default ProfilePage;
