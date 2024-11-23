'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Charts from '../components/Charts';
import apiClient from '../../apiClient'; 

const Dashboard = () => {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true); // Show a loading spinner while verifying

  useEffect(() => {
    const verifyToken = async () => {
      const token = localStorage.getItem('access_token');

      if (!token) {
        router.push('/auth/login'); // Redirect to login if no token is found
        return;
      }

      try {
        // Call the backend to validate the token or get the user's details
        const response = await apiClient.get('/api/auth/users/me/', {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.status === 200) {
          setIsAuthenticated(true); // Valid token
        } else {
          router.push('/auth/login'); // Invalid token
        }
      } catch (error) {
        console.error('Token verification failed:', error);
        router.push('/auth/login'); // Redirect on error
      } finally {
        setLoading(false); // Stop loading after verification
      }
    };

    verifyToken();
  }, [router]);

  if (loading) {
    // Show a loading spinner while verifying
    return (
      <div className="flex justify-center items-center min-h-screen bg-white">
        <div className="w-12 h-12 border-4 border-red-500 border-t-transparent rounded-full animate-spin"></div>
        <div className='text-center font-bold text-lg font-black ml-5'>PLEASE LOGIN TO GAIN ACCESS</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="flex flex-col">
      <Charts />
    </div>
  );
};

export default Dashboard;
