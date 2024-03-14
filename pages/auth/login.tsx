import Link from 'next/link';

import { AuthLayout } from 'components';
import { useForm } from 'react-hook-form';
import { loginUser } from 'services/auth';
import { useAtom } from 'jotai';
import stylesAuth from 'styles/Auth.module.css';
import { useRouter } from 'next/router';
import { userAtom } from 'store/userAtom';
import { Role } from 'guards/roles';

const LoginPage = () => {
  const [, setUser] = useAtom(userAtom);
  const { register, handleSubmit } = useForm();
  const router = useRouter();
  const fetchAuthLogin = async (data: any) => {
    try {
      const response = await loginUser(data);
      setUser(response.user);
      localStorage.setItem('user', JSON.stringify(response.user));
      const userRolName = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') as string).rol_name : null;
      //console.log(response.user)
      if (userRolName === Role.Admin) {
        router.push('/admin/courses');
        return
      } else if (userRolName === Role.Cliente) {
        router.push('/home');
        return
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <AuthLayout title={'Removies Perú: Iniciar Sesión'}>
      <div className={stylesAuth.divForm}>
        <h2>Iniciar Sesión</h2>
        <form className={stylesAuth.form} onSubmit={handleSubmit(fetchAuthLogin)}>
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
              ¿No tienes una cuenta?
              <Link href="/auth/register">
                <a> Registrate</a>
              </Link>
            </span>
          </div>
        </form>
      </div>
    </AuthLayout>
  );
};

export default LoginPage;
