/* eslint-disable @next/next/no-img-element */

import { HomeLayout, ListCourses, Navbar } from 'components';
import Loader from 'components/loader/loader';
import { useAppSelector } from 'hooks';

import styles from 'styles/Home.module.css';
import { useEffect, useState } from 'react';
import { getCategorias } from 'services/categorias';
import { CategoryI } from 'interfaces/categorias';
import { toast } from 'react-toastify';
import { CursosI } from 'interfaces/cursos';
import { getCursos } from 'services/cursos';
import { useAtom } from 'jotai';
import { userAtom } from 'store/userAtom';

const HomePage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState<CategoryI[]>([{}] as CategoryI[]);
  const [courses, setCourses] = useState<CursosI[]>([{} as CursosI]);
  const [user] = useAtom(userAtom);

  console.log(user)

  const fetchCategorias = async () => {
    try {
      setIsLoading(true);
      const response = await getCategorias();
      setCategories(response.categorias);
    } catch (error) {
      toast.error('No se pudo cargar la lista de categorías');
    } finally {
      setIsLoading(false);
    }
  };

  const fetchCursos = async () => {
    try {
      const response = await getCursos();
      setCourses(response.cursos);
    } catch (error) {
      toast.error('No se pudo cargar la lista de categorías');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCategorias();
    fetchCursos();
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <HomeLayout title="ReMovies">
        <div className={styles.hero}>
          <Navbar />
        </div>
        {categories
          .filter(category => category.id !== undefined) // Filtrar elementos vacíos
          .filter(category => courses.filter(curso => curso.categoria_id === category.id).length > 0)
          .map((category) => (
            <div className={styles.movieCategory} key={category.id}>
              <h2>{category.nombre}</h2>
              <ListCourses items={courses.filter((curso) => curso.categoria_id === category.id)} />
            </div>
          ))}
      </HomeLayout>
    </>
  );
};

export default HomePage;
