import Sidebar from 'components/ui/Sidebar';
import React from 'react';

interface Props {
  children: React.ReactNode;
}

const AdminLayout = ({ children }: Props) => {
  return (
    <div className="hold-transition sidebar-mini layout-fixed">
      <div className="wrapper">
        <Sidebar />
        {children}
        <footer className="main-footer">All rights reserved.</footer>
      </div>
    </div>
  );
};

export default AdminLayout;
