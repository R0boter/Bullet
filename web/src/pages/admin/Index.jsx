import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Outlet } from 'react-router-dom';

const Index = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    if (pathname === '/admin' || pathname === '/admin/') {
      navigate('/admin/home');
    }
  }, []);

  return (
    <>
      <Outlet />
    </>
  );
};

export default Index;
