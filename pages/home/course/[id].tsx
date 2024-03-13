/* eslint-disable @next/next/no-img-element */
import { GetServerSideProps, NextPage } from 'next';
import { HomeLayout, Navbar } from 'components';
import Loader from 'components/loader/loader';
import styles from 'styles/Home.module.css';
import { CursoItemI } from 'interfaces/cursoItem';
import { useEffect, useState } from 'react';

interface Props {
  courseContent: CursoItemI;
  isLoading: boolean;
}

const CoursesSelectedPage: NextPage<Props> = ({ courseContent, isLoading = true }) => {

  if (isLoading) {
    return <Loader />;
  }
  //log(courseContent)

  const comentariosMock = [
    { id: 1, texto: '¡Excelente curso!', usuario: 'Usuario1' },
    { id: 2, texto: 'Me ayudó mucho, ¡gracias!', usuario: 'Usuario2' },
    // Otros comentarios...
  ];

  const [comentarios, setComentarios] = useState(comentariosMock);

  useEffect(() => {
    // Aquí deberías hacer la consulta a la base de datos para obtener los comentarios
    // Ejemplo de cómo puedes hacerlo con fetch:
    /*
    fetch('URL_DE_TU_API/comentarios')
      .then(response => response.json())
      .then(data => setComentarios(data))
      .catch(error => console.error('Error fetching comments:', error));
    */

    // Por ahora, utilizaremos un array de comentarios de ejemplo:
    setComentarios(comentariosMock);
  }, []);

  const convertLinkEmbed = (link: string) => {
    //const linkYt = courseContent.video_iframe;
    const linkEmbed = link.replace('watch?v=', 'embed/');
    return linkEmbed;
  }

  const linkEmbed = convertLinkEmbed(courseContent.video_iframe);

  return (
    <>
      <HomeLayout title={`ReMovies`}>
        <div className={styles.hero}>
          <Navbar />
        </div>
      </HomeLayout>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          rowGap: '2rem',
          marginTop: '3rem',
          marginBottom: '5rem',
          padding: '0 20rem'
        }}
      >
        <iframe width="1400" height="600" src={linkEmbed} title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
        <h1
          style={{
            fontSize: '3rem',
            fontWeight: 'bold',
          }}
        >{courseContent.nombre}</h1>
        <p
          style={{
            textAlign: 'center',
          }}
        >{courseContent.descripcion}</p>
        <div >
          <h2>Comentarios:</h2>
          <ul className={styles.commentsList}>
            {comentarios.map(comentario => (
              <li key={comentario.id} className={styles.comment}>
                <div className={styles.commentHeader}>
                  <strong>{comentario.usuario}:</strong>
                </div>
                <div className={styles.commentBody}>
                  {comentario.texto}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { cursoItem } = query;
  const parsedCursoItem = cursoItem ? JSON.parse(cursoItem as string) : null;

  return {
    props: {
      courseContent: parsedCursoItem,
      isLoading: false,
    },
  };
};

export default CoursesSelectedPage;
