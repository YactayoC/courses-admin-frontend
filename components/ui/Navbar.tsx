import Link from 'next/link';
import { useAtom } from 'jotai';
import { userAtom } from 'store/userAtom';
import styles from 'styles/Navbar.module.css';
import { useEffect, useState } from 'react';

const Navbar = () => {
  const [user] = useAtom(userAtom);
  const [isClient, setIsClient] = useState(false)
  const [userName, setUserName] = useState('')

  const handleLogout = () => {
    localStorage.clear();
    window.location.reload();
  };

  useEffect(() => {
    if (user) {
      setIsClient(true);
      setUserName(user.nombre);
    }
  }, [user]);

  if (!isClient) {
    // Si el usuario no está logueado, no renderizar el menú desplegable
    return (
      <nav className={styles.navbar}>
        <div className={styles.navbarDesktop}>
          <ul className={styles.menuNavbar}>
            <Link href="/home">
              <h2
                style={{
                  cursor: 'pointer',
                  fontWeight: 'bold',
                }}
              >Cursos OnLine</h2>
            </Link>
            <Link href="/home">
              <li>Inicio</li>
            </Link>
          </ul>
          <Link href="/auth/login">
            <button type="button" className="btn btn-primary">Iniciar sesión</button>
          </Link>
        </div>
      </nav>
    );
  }

  return (
    <nav className={styles.navbar}>
      <div className={styles.navbarDesktop}>
        <ul className={styles.menuNavbar}>
          <h2
            style={{
              cursor: 'pointer',
              fontWeight: 'bold',
            }}
            onClick={() => window.location.href = '/home'}
          >Cursos OnLine</h2>
          <Link href="/home">
            <li>Inicio</li>
          </Link>
        </ul>
        <div className="dropdown">
          <a className="btn btn-secondary dropdown" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false" style={{
            color: 'white',
            backgroundColor: 'transparent',
            border: 'none',
            fontSize: '1.5rem',
            textDecoration: 'none',
          }}>
            <i className="fa-solid fa-bars"></i>
          </a>
          <ul className="dropdown-menu">
            <li><a className="dropdown-item fs-6">{`Hola, ${userName}`}</a></li>
            {/* <li><Link href="/home"><a className="dropdown-item fs-6">Mis cursos</a></Link></li> */}
            <li><a className="dropdown-item fs-6" onClick={handleLogout}>Cerrar sesión</a></li>
          </ul>
        </div>
      </div>
    </nav>
  );
};


export default Navbar;
