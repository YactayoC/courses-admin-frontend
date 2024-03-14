import type { NextPage } from 'next';
import { Navbar, PreviousLayout } from 'components';
import styles from 'styles/Previous.module.css';

const PreviousPage: NextPage = () => {

  return (
    <PreviousLayout title={'Removies Perú: Peliculas'}>
      <Navbar />
      <div className={styles.heading}>
        <h1>Plataforma de cursos</h1>
      </div>
    </PreviousLayout>
  );
};

export default PreviousPage;
