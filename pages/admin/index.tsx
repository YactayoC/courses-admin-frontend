import React from 'react';

import { AuthLayout } from 'components';
import stylesAuth from 'styles/Auth.module.css';
import Link from 'next/link';

const index = () => {
  return (
    <AuthLayout title={'Cursos'}>
      <div className={stylesAuth.divForm}>
        <h2>Iniciar Sesión</h2>
        <form className={stylesAuth.form}>
          <div className={stylesAuth.formGroup}>
            <p>Correo:</p>
            <input type="email" placeholder="Ingresa tu email" />
          </div>
          <div className={stylesAuth.formGroup}>
            <p>Contraseña:</p>
            <input type="password" placeholder="Ingresa tu contraseña" />
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

export default index;
