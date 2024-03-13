/* eslint-disable @next/next/no-img-element */
import { FC } from 'react';
import { useRouter } from 'next/router';

import { CursoItemI } from 'interfaces/cursoItem';

interface Props {
  cursoItem: CursoItemI;
}

const Course: FC<Props> = ({ cursoItem }) => {
  const router = useRouter();

  const onClickSelectCourse = () => {
    router.push({
      pathname: `/home/course/${cursoItem.id}`,
      query: { cursoItem: JSON.stringify(cursoItem) }
    });
  };
  return (

    <div className="card" style={{
      width: '30rem',
    }}>
      <img
        src={cursoItem.imagen_url}
        className="card-img-top"
        style={{
          height: '20rem',
          objectFit: 'cover',
        }}
        alt="..."
      />
      <div className="card-body">
        <h5 className="card-title">
          {cursoItem.nombre}
        </h5>
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
