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
        } else if (rol_name === Role.Admin) {
            if (!router.pathname.startsWith('/admin/courses') && !router.pathname.startsWith('/admin/categories')) {
                router.push('/auth/login');
            }
        } else if (rol_name === Role.Cliente) {
            if (router.pathname.startsWith('/admin/courses') || router.pathname.startsWith('/admin/categories')) {
                router.push('/home');
            }
        }
    }, [router.pathname]);

    return <>{children}</>;
}

export default AuthGuard;
