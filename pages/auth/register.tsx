import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { AuthLayout } from 'components';
import stylesAuth from 'styles/Auth.module.css';
import { useRouter } from 'next/router';
import { registerUser } from 'services/auth';
import { ToastContainer, toast } from 'react-toastify';

const RegisterPage = () => {
  const router = useRouter();
  const { register, handleSubmit, formState: { errors } } = useForm();

  const fetchAuthRegister = async (data: any) => {
    try {
      await registerUser(data);
      router.push('/auth/login');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Error al registrar');
    }
  }

  return (
    <AuthLayout title={'Removies Perú: Iniciar Sesión'}>
      <div className={stylesAuth.divForm}>
        <h2>Registrate</h2>
        <form className={stylesAuth.form} onSubmit={handleSubmit(fetchAuthRegister)}>
          <div>
            <div className={stylesAuth.formGroup}>
              <p>Nombres:</p>
              <input type="text" placeholder="Ingresa tus nombres" {...register('nombre', { required: true })} />
            </div>
            {errors.nombre && <span className="text-danger">Este campo es requerido</span>}
          </div>
          <div>
            <div className={stylesAuth.formGroup}>
              <p>Correo:</p>
              <input type="email" placeholder="Ingresa tu email" {...register('email', { required: true })} />
            </div>
            {errors.email && <span className="text-danger">Este campo es requerido</span>}
          </div>
          <div>
            <div className={stylesAuth.formGroup}>
              <p>Contraseña:</p>
              <input type="password" placeholder="Ingresa tu contraseña" {...register('password', { required: true })} />
            </div>
            {errors.password && <span className="text-danger">Este campo es requerido</span>}
          </div>
          <button className="btn btn-primary w-100">Registrarse</button>
          <div className={stylesAuth.formGroup}>
            <span>
              ¿Ya tienes una cuenta?
              <Link href="/auth/login">
                <a> Inicia sesión</a>
              </Link>
            </span>
          </div>
        </form>

        <ToastContainer />
      </div>
    </AuthLayout>
  );
};

export default RegisterPage;
