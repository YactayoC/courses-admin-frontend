import { atom } from 'jotai';

interface User {
  id: number;
  nombre: string;
  email: string;
  rol_id: number;
}

let initialUser: User | null = null;

if (typeof window !== 'undefined') {
  const storedUser = localStorage.getItem('user');
  if (storedUser) {
    initialUser = JSON.parse(storedUser);
  }
}

export const userAtom = atom<User | null>(initialUser);
