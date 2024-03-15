/* eslint-disable @next/next/no-img-element */
import { GetServerSideProps, NextPage } from 'next';
import { HomeLayout, Navbar } from 'components';
import Loader from 'components/loader/loader';
import styles from 'styles/Home.module.css';
import { CursoItemI } from 'interfaces/cursoItem';
import { useEffect, useState } from 'react';
import { getCommentsByIdCourse, addComment } from 'services/comment';
import { Comentario } from 'interfaces/comment';
import { useForm } from 'react-hook-form';
import { useAtom } from 'jotai';
import { userAtom } from 'store/userAtom';
import { Rating } from 'react-simple-star-rating';
import { getCursoPorId } from 'services/cursos';

interface Props {
  courseContent: CursoItemI;
  isLoading: boolean;
}

const CoursesSelectedPage: NextPage<Props> = ({ courseContent, isLoading = true }) => {
  const [comentarios, setComentarios] = useState<Comentario[]>([]);
  const [rating, setRating] = useState(0);
  const [user] = useAtom(userAtom);
  const [courseId, setCourseId] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm<Comentario>();

  const handleRating = (rate: number) => {
    setRating(rate);
  };

  const handleGetCommentsByIdCourse = async (idCourse: string) => {
    const response = await getCommentsByIdCourse(idCourse);
    setComentarios(response.comentarios);
    setCourseId(String(courseContent.id));
  };

  const onPointerEnter = () => console.log('Enter');
  const onPointerLeave = () => console.log('Leave');
  const onPointerMove = (value: number, index: number) => console.log(value, index);

  const handleAddComment = async (data: Comentario) => {
    await addComment({ usuarioId: Number(user?.id), cursoId: Number(courseId), comentario: data.comentario });
    handleGetCommentsByIdCourse(String(courseContent.id));
    reset();
  };

  const convertLinkEmbed = (link: string): string => {
    if (link.includes('www.youtube.com/watch?v=')) {
      return link.replace('www.youtube.com/watch?v=', 'www.youtube.com/embed/');
    } else if (link.includes('youtu.be')) {
      const videoId = link.split('/').pop();
      return `https://www.youtube.com/embed/${videoId}`;
    } else {
      return link;
    }
  };

  const convertToDate = (date: string) => {
    const dateParsed = new Date(date);
    return dateParsed.toLocaleDateString();
  };

  const convertToHour = (date: string) => {
    const dateParsed = new Date(date);
    return dateParsed.toLocaleTimeString();
  };

  useEffect(() => {
    handleGetCommentsByIdCourse(String(courseContent.id));
  }, []);

  useEffect(() => {
    const userFromLocalStorage = localStorage.getItem('user');
    setIsLoggedIn(!!userFromLocalStorage);
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <HomeLayout title={`Curso - ${courseContent.nombre}`}>
        <div className={styles.hero}>
          <Navbar />
        </div>
      </HomeLayout>
      {/* VIDEO Y DESCRIPCION */}
      <div
        className="d-flex flex-lg-row-reverse justify-content-center align-items-center gap-5 mt-5 mb-5 px-10
       flex-column gap-md-4 container
      "
      >
        <iframe
          style={{
            width: '600px',
            height: '450px',
          }}
          className="rounded-lg w-100 w-md-100 h-md-100"
          src={convertLinkEmbed(courseContent.video_iframe)}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        ></iframe>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
          }}
        >
          <h1
            style={{
              fontSize: '3rem',
              fontWeight: 'bold',
            }}
          >
            {courseContent.nombre}
          </h1>
          <Rating
            style={{ marginBottom: '1rem' }}
            onClick={handleRating}
            onPointerEnter={onPointerEnter}
            onPointerLeave={onPointerLeave}
            onPointerMove={onPointerMove}
          />
          {/* RATING BOOTSTRAP */}
          <p>{courseContent.descripcion}</p>
        </div>
      </div>
      <div className="container d-flex justify-content-center align-items-center flex-column">
        {isLoggedIn ? (
          <form
            style={{ width: '80%', display: 'flex', flexDirection: 'column' }}
            onSubmit={handleSubmit(handleAddComment)}
          >
            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Inserte comentario"
                aria-label="Recipient's username"
                aria-describedby="button-addon2"
                style={{
                  height: '3.5rem',
                }}
                {...register('comentario', { required: true })} // Vincula el input al estado con useForm
              />
              <button className="btn btn-outline-secondary" type="submit" id="button-addon2">
                Guardar comentario
              </button>
            </div>
            {errors.comentario && <span style={{ color: 'red', marginTop: '-1rem' }}>Este campo es requerido.</span>}
          </form>
        ) : (
          <></>
        )}
        <div
          style={{
            width: '100%',
            // backgroundColor: '#F5F5F5',
            padding: '3rem',
            borderRadius: '0.8rem',
          }}
        >
          {comentarios.map((comment) => (
            <div
              key={comment.id}
              className="media mb-4"
              style={{
                padding: '1.8rem 2rem',
                boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
                borderRadius: '0.8rem',
                backgroundColor: '#F5F5F5',
              }}
            >
              <img
                src="https://via.placeholder.com/64"
                className="mr-3 rounded-circle"
                alt="Avatar"
                style={{ width: '64px', height: '64px' }}
              />
              <div className="media-body">
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    columnGap: '1rem',
                  }}
                >
                  <h5
                    style={{
                      marginBottom: '0',
                    }}
                  >
                    {comment.nombre}
                  </h5>
                  <p
                    style={{
                      color: 'gray',
                    }}
                  >
                    {convertToHour(comment.fecha)}
                  </p>
                </div>
                <p
                  style={{
                    marginBottom: '0.5rem',
                    marginTop: '0.5rem',
                  }}
                >
                  {comment.comentario}
                </p>
                <small className="text-muted">Subido el día {convertToDate(comment.fecha)}</small>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const response = await getCursoPorId(Number(params?.id));

  return {
    props: {
      courseContent: response.curso,
      isLoading: false,
    },
  };
};

export default CoursesSelectedPage;
