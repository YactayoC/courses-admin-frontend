import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { AuthLayout } from 'components';

import stylesAuth from 'styles/Auth.module.css';
import { useRouter } from 'next/router';
import { registerUser } from 'services/auth';

const RegisterPage = () => {

  const router = useRouter();
  const { register, handleSubmit } = useForm();

  const fetchAuthRegister = async (data: any) => {
    try {
      await registerUser(data);
      //console.log(response);
      router.push('/auth/login');
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <AuthLayout title={'Removies Perú: Iniciar Sesión'}>
      <div className={stylesAuth.divForm}>
        <h2>Registrate</h2>
        <form className={stylesAuth.form} onSubmit={handleSubmit(fetchAuthRegister)}>
          <div className={stylesAuth.formGroup}>
            <p>Nombres:</p>
            <input type="text" placeholder="Ingresa tus nombres" {...register('nombre', { required: true })} />
          </div>
          <div className={stylesAuth.formGroup}>
            <p>Correo:</p>
            <input type="email" placeholder="Ingresa tu email" {...register('email', { required: true })} />
          </div>
          <div className={stylesAuth.formGroup}>
            <p>Contraseña:</p>
            <input type="password" placeholder="Ingresa tu contraseña" {...register('password', { required: true })} />
          </div>
          <button className="btn btn-primary w-100">Iniciar sesión</button>
          <div className={stylesAuth.formGroup}>
            <span>
              ¿Ya tienes una cuenta?
              <Link href="/auth/login">
                <a> Inicia sesión</a>
              </Link>
            </span>
          </div>
        </form>
      </div>
    </AuthLayout>
  );
};

export default RegisterPage;
