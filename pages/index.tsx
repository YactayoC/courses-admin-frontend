import type { NextPage } from 'next';
import Link from 'next/link';
import { BsChevronRight } from 'react-icons/bs';

import { PreviousLayout } from 'components';
import styles from 'styles/Previous.module.css';

const PreviousPage: NextPage = () => {
  return (
    <PreviousLayout title={'Removies Perú: Peliculas'}>
      <nav className={styles.navbar}>
        <h2>NombrePagina</h2>
        <Link href="/auth/login">
          <button className="btn btn-primary">Iniciar Sesion</button>
        </Link>
      </nav>
      <div className={styles.heading}>
        <h1>Plataforma de cursos</h1>
        <p>Disfruta donde quieras. Cancela cuando quieras.</p>
        <span>
          ¿Quieres ver ReMovies ya? Ingresa tu email para crear una cuenta o reiniciar tu membresía de ReMovies.
        </span>
      </div>

      <div className={styles.button_center}>
        <Link href="/home">
          <button className="btn btn-primary">
            <p>Comenzar</p>
            <BsChevronRight
              size={20}
              style={{
                width: '20px',
                strokeWidth: '1',
              }}
            />
          </button>
        </Link>
      </div>
    </PreviousLayout>
  );
};

export default PreviousPage;
