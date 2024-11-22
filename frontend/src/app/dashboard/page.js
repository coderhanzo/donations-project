'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation'; // Use correct router import for App Router
import CustomSidebar from '../components/CustomSidebar';
import Navbar from './_components/Navbar';
import Charts from '../components/Charts';

const Dashboard = () => {
  const router = useRouter();

  useEffect(() => {
    const session = localStorage.getItem('loggedInUser'); // Adjust the key as per your implementation

    if (!session) {
      router.push('/auth/login'); // Redirect to login page if not authenticated
    }
  }, [router]);

  return (
    <div className="flex flex-col">
      <Charts />
    </div>
  );
};

export default Dashboard;
