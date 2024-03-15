import { FC } from 'react';
import { useRouter } from 'next/router';

import { CursoI } from 'interfaces/cursos';
import styles from 'styles/Home.module.css';

interface Props {
  cursoItem: CursoI;
}

const Course: FC<Props> = ({ cursoItem }) => {
  const router = useRouter();

  const onClickSelectCourse = () => {
    router.push({
      pathname: `/home/course/${cursoItem.id}`,
    });
  };
  return (
    <div className="card">
      {cursoItem.tiene_animacion ? (
        <div className="overflow-hidden">
          <img
            src={cursoItem.imagen_url}
            className={`card-img-top ${styles.img_hover}`}
            style={{
              height: '20rem',
              objectFit: 'cover',
            }}
            alt="imagen del curso"
          />
        </div>
      ) : (
        <img
          src={cursoItem.imagen_url}
          className="card-img-top"
          style={{
            height: '20rem',
            objectFit: 'cover',
          }}
          alt="imagen del curso"
        />
      )}

      <div className="card-body">
        <h5 className="card-title">{cursoItem.nombre}</h5>
        <p className="card-text" style={{ marginTop: '2rem' }}>
          {cursoItem.descripcion}
        </p>
        <a className="btn btn-primary" onClick={onClickSelectCourse}>
          Obtener detalles
        </a>
      </div>
    </div>
  );
};

export default Course;
