import { useEffect, useState } from 'react';
import { Modal } from 'react-responsive-modal';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import { CursoI } from '../../interfaces/cursos';
import { getCursoPorId, updateCurso } from 'services/cursos';
import { getCategorias } from 'services/categorias';
import { CategoryI } from 'interfaces/categorias';

export const ModalEditCourse = (props: {
  open: boolean;
  onClose: () => void;
  idCurso: number;
  onCourseEdit: () => void;
}) => {
  const { open, onClose, idCurso } = props;
  const { register, handleSubmit, reset } = useForm();
  const [dataCourse, setDataCourse] = useState<CursoI>({} as CursoI);
  const [dataCategories, setDataCategories] = useState<CategoryI[]>([] as CategoryI[]);
  const [fileSelected, setFileSelected] = useState<any>(null);
  const [formatFileSelected, setFormatFileSelected] = useState<any>(null);

  const fetchGetCursoId = async (id: number) => {
    try {
      const response = await getCursoPorId(id);
      console.log(response.curso);
      setDataCourse(response.curso);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchCategorias = async () => {
    try {
      const response = await getCategorias();
      setDataCategories(response.categorias);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchUpdateCurso = async (id: number, data: any) => {
    const formatData = new FormData();

    formatData.append('nombre', data.nombre);
    formatData.append('descripcion', data.descripcion);
    formatData.append('video_iframe', data.video_iframe);
    formatData.append('categoria_id', data.categoria_id);
    if (formatFileSelected) {
      formatData.append('file', formatFileSelected);
    }

    try {
      const response = await updateCurso(id, formatData);
      toast.success(response.message);
      reset();
      props.onCourseEdit();
      handleClose();
    } catch (error) {
      console.log(error);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files![0];
    const objectURL = URL.createObjectURL(file);
    setFormatFileSelected(file);
    setFileSelected(objectURL);
  };

  const handleClose = () => {
    onClose();
  };

  useEffect(() => {
    if (open) {
      fetchGetCursoId(idCurso);
      fetchCategorias();
    }
  }, [open]);

  return (
    <Modal open={open} onClose={handleClose} center>
      <div className="modal-header">
        <h1 className="modal-title fs-5">Editar Curso</h1>
      </div>
      <div className="modal-body">
        <form
          onSubmit={handleSubmit(() => {
            fetchUpdateCurso(idCurso, dataCourse);
          })}
        >
          <div className="mb-3">
            <div className="mb-2">
              <label htmlFor="nombre" className="form-label">
                Nombre
              </label>
              <input
                type="text"
                className="form-control"
                id="nombre"
                value={dataCourse.nombre || ''}
                {...register('nombre')}
                onChange={(e) => {
                  setDataCourse((prevState) => ({
                    ...prevState,
                    nombre: e.target.value,
                  }));
                }}
              />
            </div>
            {}
          </div>
          <div className="mb-3">
            <label htmlFor="formFile" className="form-label">
              Url Imagen
            </label>
            <input className="form-control" type="file" id="formFile" onChange={handleFileChange} />
            {fileSelected ? (
              <div className="d-flex flex-column gap-2">
                <img src={fileSelected} alt="Imagen" style={{ width: '100px' }} />
                <button
                  type="button"
                  style={{
                    width: 'fit-content',
                  }}
                  className="btn btn-primary"
                  onClick={() => setFileSelected(null)}
                >
                  Eliminar
                </button>
              </div>
            ) : (
              <>
                <img src={dataCourse?.imagen_url || ''} alt="Imagen" style={{ width: '100px' }} />
              </>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="urlVideo" className="form-label">
              URL Video Iframe
            </label>
            <input
              type="text"
              className="form-control"
              id="urlVideo"
              value={dataCourse.video_iframe || ''}
              {...register('video_iframe')}
              onChange={(e) => {
                setDataCourse((prevState) => ({
                  ...prevState,
                  video_iframe: e.target.value,
                }));
              }}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="selectOption" className="form-label">
              Selecciona una opción
            </label>
            <select
              className="form-select"
              id="selectOption"
              aria-label="Selecciona una opción"
              value={dataCourse.categoria_id || ''}
              {...register('categoria_id')}
              onChange={(e) => {
                setDataCourse((prevState) => ({
                  ...prevState,
                  categoria_id: Number(e.target.value),
                }));
              }}
            >
              <option value="">Selecciona...</option>
              {dataCategories.map((category: CategoryI) => (
                <option value={category.id} key={category.id + 20}>
                  {category.nombre}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="comments" className="form-label">
              Comentarios
            </label>
            <textarea
              className="form-control"
              id="comments"
              placeholder="Escribe tus comentarios aquí"
              value={dataCourse.descripcion || ''}
              {...register('descripcion')}
              onChange={(e) => {
                setDataCourse((prevState) => ({
                  ...prevState,
                  descripcion: e.target.value,
                }));
              }}
            ></textarea>
          </div>
          <div className="d-flex justify-content-center">
            <button type="submit" className="btn btn-primary w-50">
              Editar
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};
