/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { Modal } from 'react-responsive-modal';

import AdminLayout from 'components/layouts/AdminLayout';
import { addCurso, getCursos, eliminarCurso, updateCurso } from 'services/cursos';
import { CursosI } from '../../../interfaces/cursos';
import Loader from 'components/loader/loader';
import { getCategorias } from 'services/categorias';
import { CategoryI } from 'interfaces/categorias';
import styles from '../Courses.module.css';
import { ModalEditCourse } from 'components/modal/ModalEditCourse';

const CoursesPage = () => {
  const [courses, setCourses] = useState<CursosI[]>([{} as CursosI]);
  const [categorias, setCategorias] = useState<CategoryI[]>([{} as CategoryI]);
  const [cursoSeleccionado, setCursoSeleccionado] = useState<CursosI>({} as CursosI);
  const [showModalAdd, setShowModalAdd] = useState(false);
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [fileSelected, setFileSelected] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm<CursosI>();

  const fetchAddCurso = async (data: CursosI) => {
    try {

      const formData = new FormData();
      formData.append('nombre', data.nombre);
      formData.append('video_iframe', data.video_iframe);
      formData.append('categoria_id', Number(data.categoria_id).toString());
      formData.append('descripcion', data.descripcion);
      formData.append('file', data.file[0]);
      const response = await addCurso(formData);
      toast.success(response.message);
      reset();
      fetchCursos();
      setShowModalAdd(false);
    } catch (error) {
      console.log(error)
      toast.error('No se pudo agregar el curso');
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

  const fetchDeleteCurso = async (id: number) => {
    try {
      setCursoSeleccionado({} as CursosI);
      const response = await eliminarCurso(id);
      toast.success(response.message);
      fetchCursos();
      setShowModalDelete(false);
    } catch (error) {
      toast.error('No se pudo eliminar el curso');
    }
  };

  const fetchCategorias = async () => {
    try {
      const response = await getCategorias();
      setCategorias(response.categorias);
    } catch (error) {
      toast.error('No se pudo cargar la lista de categorías');
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files![0];
    const objectURL = URL.createObjectURL(file);
    setFileSelected(objectURL);
  };

  useEffect(() => {
    fetchCursos();
    fetchCategorias();
    toast.success('Cursos cargados correctamente');
  }, []);

  useEffect(() => {
    if (showModalAdd) {
      setFileSelected(null)
    }
  }, [showModalAdd]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <AdminLayout>
      <div
        className="content-wrapper"
        style={{
          overflow: 'hidden',
        }}
      >
        <div className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1 className="m-0">Cursos</h1>
              </div>
            </div>
          </div>
        </div>

        <section className="col-lg-12 p-4">
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => {
              setShowModalAdd(true);
            }}
          >
            Agregar Curso
          </button>
          <div className={styles['table-container']}>
            <table className="table mt-3">
              <thead className="table-dark">
                <tr>
                  <th>Nombre</th>
                  <th>Imagen</th>
                  <th>Descripcion</th>
                  <th>Categoria</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {courses?.map((course: CursosI) => (
                  <tr key={course.id}>
                    <td>{course.nombre}</td>
                    <td>
                      <img src={course.imagen_url} alt="Imagen" style={{
                        width: '8rem',
                        height: '6rem',
                        objectFit: 'cover',
                      }} />
                    </td>
                    <td>{course.descripcion}</td>
                    <td>{course.categoria_nombre}</td>
                    <td>
                      <div className="d-flex gap-3">
                        <button
                          type="button"
                          className="btn btn-primary"
                          onClick={() => {
                            setCursoSeleccionado(course);
                            setShowModalEdit(true);
                          }}
                        >
                          Editar
                        </button>
                        <button
                          type="button"
                          className="btn btn-danger"
                          onClick={() => {
                            setCursoSeleccionado(course);
                            setShowModalDelete(true);
                          }}
                        >
                          Eliminar
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <Modal open={showModalAdd} onClose={() => {
          reset()
          setShowModalAdd(false)
        }} center>
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="exampleModalLabel">
              Agregar Curso
            </h1>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit(fetchAddCurso)}>
              <div className="mb-2">
                <div className="mb-1">
                  <label htmlFor="nombre" className="form-label">
                    Nombre
                  </label>
                  <input type="text" className="form-control" id="nombre" {...register('nombre', { required: true })} />
                </div>
                {errors.nombre && <span className="text-danger">Este campo es requerido</span>}
              </div>
              <div className="mb-2">
                <div className="mb-1">
                  <label htmlFor="urlImagen" className="form-label">
                    URL Imagen
                  </label>
                  <input className="form-control" type="file" id="formFile" {...register('file', { required: true })} onChange={handleFileChange} />
                  {fileSelected && (
                    <img src={fileSelected} alt="Imagen" style={{ width: '100px' }} />
                  )}
                </div>
                {errors.file && <span className="text-danger">Este campo es requerido</span>}
              </div>
              <div className="mb-2">
                <div className="mb-1">
                  <label htmlFor="urlVideo" className="form-label">
                    URL Video Iframe
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="urlVideo"
                    {...register('video_iframe', { required: true })}
                  />
                </div>
                {errors.video_iframe && <span className="text-danger">Este campo es requerido</span>}
              </div>
              <div className="mb-2">
                <div className="mb-1">
                  <label htmlFor="selectOption" className="form-label">
                    Selecciona una opción
                  </label>
                  <select
                    className="form-select"
                    id="selectOption"
                    aria-label="Selecciona una opción"
                    {...register('categoria_id', { required: true })}
                  >
                    <option value="">Selecciona...</option>
                    {categorias?.map((category: CategoryI) => (
                      <option value={category.id} key={category.id + 10}>
                        {category.nombre}
                      </option>
                    ))}
                  </select>
                </div>
                {errors.categoria_id && <span className="text-danger">Este campo es requerido</span>}
              </div>
              <div className="mb-2">
                <div className="mb-1">
                  <label htmlFor="description" className="form-label">
                    Descripcion
                  </label>
                  <textarea
                    className="form-control"
                    id="description"
                    placeholder="Escribe tus comentarios aquí"
                    {...register('descripcion', { required: true })}
                  ></textarea>
                </div>
                {errors.descripcion && <span className="text-danger">Este campo es requerido</span>}
              </div>
              <div className="d-flex justify-content-center">
                <button type="submit" className="btn btn-primary w-50">
                  Agregar
                </button>
              </div>
            </form>
          </div>
        </Modal>

        <ModalEditCourse open={showModalEdit} onClose={() => setShowModalEdit(false)} idCurso={cursoSeleccionado.id!} onCourseEdit={fetchCursos} />

        <Modal open={showModalDelete} onClose={() => setShowModalDelete(false)} center>
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="exampleModalLabel">
              Estas seguro de eliminar el curso?
            </h1>
          </div>
          <div className="modal-body">
            <div className="d-flex justify-content-center gap-3">
              <button
                type="button"
                className="btn btn-danger w-50"
                onClick={() => fetchDeleteCurso(cursoSeleccionado.id!)}
              >
                Si
              </button>
              <button type="submit" className="btn btn-primary w-50">
                No
              </button>
            </div>
          </div>
        </Modal>
      </div>
      <ToastContainer />
    </AdminLayout>
  );
};

export default CoursesPage;
