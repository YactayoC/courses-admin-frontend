/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useAtom } from 'jotai';
import { userAtom } from 'store/userAtom';

const Sidebar = () => {
  const [user] = useAtom(userAtom);
  const [usename, setUsename] = useState('');
  const router = useRouter();

  const handleLogout = () => {
    localStorage.clear();
    router.push('/auth/login');
  }

  useEffect(() => {
    if (user) {
      setUsename(user.nombre);
    }
  }, [user]);

  return (
    <>
      <nav className="main-header navbar navbar-expand navbar-white navbar-light">
        <ul className="navbar-nav">
          <li className="nav-item">
            <a className="nav-link" data-widget="pushmenu" href="#" role="button">
              <i className="fas fa-bars"></i>
            </a>
          </li>
        </ul>
      </nav>

      <aside className="main-sidebar sidebar-dark-primary elevation-4">
        <a href="index3.html" className="brand-link">
          <span className="brand-text font-weight-light">Nombre empresa</span>
        </a>

        <div className="sidebar">
          <div
            className="user-panel mt-3 pb-3 mb-3 d-flex"
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <div className="image">
              <img
                style={{
                  width: '50px',
                  height: '50px',
                }}
                src="https://www.ieie.eu/wp-content/uploads/2021/08/ser-un-profesional-exitoso-ieie.jpg"
                className="img-circle elevation-2"
                alt="User Image"
              />
            </div>
            <div className="info">
              <a href="#" className="d-block">
                {usename}
              </a>
            </div>
          </div>

          <nav className="mt-2">
            <ul
              className="nav nav-pills nav-sidebar flex-column"
              data-widget="treeview"
              role="menu"
              data-accordion="false"
            >
              <li className="nav-item">
                <Link href="/admin/courses">
                  <a className={`nav-link ${router.pathname.includes('/admin/courses') ? 'active' : ''}`}>
                    <i className="nav-icon fas fa-book"></i>
                    <p>Cursos</p>
                  </a>
                </Link>
              </li>
              <li className="nav-item">
                <Link href="/admin/categories">
                  <a className={`nav-link ${router.pathname.includes('/admin/categories') ? 'active' : ''}`}>
                    <i className="nav-icon fas fa-th"></i>
                    <p>Categorias</p>
                  </a>
                </Link>
              </li>
              <li className="nav-item">
                <Link href="/auth/login">
                  <a className="nav-link" onClick={handleLogout}>
                    <i className="nav-icon fas fa-sign-out-alt"></i>
                    <p>Salir</p>
                  </a>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </aside >
    </>
  );
};

export default Sidebar;
