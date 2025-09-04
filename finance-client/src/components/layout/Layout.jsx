// src/components/layout/Layout.jsx
import React from 'react';
import Navbar from '../ui/Navbar';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <>
      <Navbar />
      <main style={{ padding: '1rem' }}>
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
