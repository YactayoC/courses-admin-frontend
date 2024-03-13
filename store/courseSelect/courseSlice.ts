import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CursoItemI } from 'interfaces/cursoItem';

export const courseSlice = createSlice({
  name: 'course',
  initialState: {
    courseSelected: {
      id: 0,
      nombre: '',
      descripcion: '',
      imagen_url: '',
      video_iframe: '',
    },
  },
  reducers: {
    onSelectCourse: (state, action: PayloadAction<CursoItemI>) => {
      state.courseSelected = {
        id: action.payload.id,
        nombre: action.payload.nombre,
        descripcion: action.payload.descripcion,
        imagen_url: action.payload.imagen_url,
        video_iframe: action.payload.video_iframe,
      };
    },
  },
});

export const { onSelectCourse } = courseSlice.actions;
