import React from 'react'
import { useAuth } from '../contexts/authContext'
import { useEffect } from 'react';
const Home = () => {
  const {currentUser} =  useAuth();
  console.log(currentUser);
  useEffect(() => {
    document.title = "Admin Dashboard Home";
    
  }, []);


  return (
    <>
    <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-2xl font-bold">
            Welcome, {currentUser?.displayName || "Guest"}
        </h1>
        <p className="text-gray-500 mt-2">
            This is the admin dashboard home page.
        </p>
        <h2 className="text-lg mt-4">
            Hello {currentUser?.displayName || currentUser?.email}, you are logged with {currentUser?.email} 
        </h2>
    </div>
   

    </>
  )
}

export default Home