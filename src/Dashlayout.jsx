import { Outlet } from 'react-router-dom';
import Header from './components/header';
import Sidebar from './components/sidebar';

const dashlayout = () => {
  return (
    <>
      <Header />
      <div className='flex'>
        <Sidebar />
      <main className="ml-6 p-4 mt-16 w-full">
        <Outlet />  
      </main>

      </div>
      
    </>
  );
};

export default dashlayout;
