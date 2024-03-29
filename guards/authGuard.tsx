import { useRouter } from 'next/router';
import { ReactNode, useEffect } from 'react';
import { Role } from './roles';

interface AuthGuardProps {
    children: ReactNode;
}

const AuthGuard: React.FC<AuthGuardProps> = ({ children }: AuthGuardProps) => {
    const router = useRouter();

    useEffect(() => {
        const user = localStorage.getItem('user');
        const rol_name = user ? JSON.parse(user).rol_name : null;

        if (!user) {
            if (router.pathname.startsWith('/admin/courses') || router.pathname.startsWith('/admin/categories')) {
                router.push('/auth/login');
            }
        } else if (rol_name === Role.ADMIN) {
            if (!router.pathname.startsWith('/admin/courses') && !router.pathname.startsWith('/admin/categories')) {
                router.push('/auth/login');
            }
        } else if (rol_name === Role.CLIENTE) {
            if (router.pathname.startsWith('/admin/courses') || router.pathname.startsWith('/admin/categories')) {
                router.push('/home');
            } else if (router.pathname.startsWith('/auth/login') || router.pathname.startsWith('/auth/register')) {
                router.push('/home');
            }
        }
    }, [router.pathname]);

    return <>{children}</>;
}

export default AuthGuard;
