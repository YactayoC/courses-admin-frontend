export interface CursoI {
  id?: number;
  nombre: string;
  descripcion: string;
  imagen_url: string;
  video_iframe: string;
  categoria_id: number;
  categoria_nombre?: string;
  file?: any;
  tiene_animacion: boolean;
}
export interface FormData {
  append(name: string, value: any, fileName?: string): void;
  delete(name: string): void;
  get(name: string): FormDataEntryValue | null;
  getAll(name: string): FormDataEntryValue[];
  has(name: string): boolean;
  set(name: string, value: any, fileName?: string): void;
  forEach(callbackfn: (value: FormDataEntryValue, key: string, parent: FormData) => void, thisArg?: any): void;
}
