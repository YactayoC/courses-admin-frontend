
# Proyecto Cursos

Proyecto para gestion de cursos


## Instalacion

Instalar el proyecto con YARN o NPM

```bash
  yarn
```  
o
```bash
  npm install
```
## API Reference

#### Rutas de autenticacion

```http
  POST /api/auth/iniciar-sesion
  POST /api/auth/registrar-usuario
```

#### Rutas de administrador

```http
  GET /api/admin/cursos
  GET /api/admin/cursos/:id
  POST /api/admin/cursos
  PUT /api/admin/cursos/:id
  DELETE /api/admin/cursos/:id

  GET /api/admin/categorias
  GET /api/admin/categorias/:id
  POST /api/admin/categorias
  PUT /api/admin/categorias/:id
  DELETE /api/admin/categorias/:id
```

#### Rutas de comentarios

```http
  GET /api/comment/:cursoId
  POST /api/comment
  DELETE /api/comment/:id
```




## Deployment

Para correr el proyecto se realiza con los siguientes comandos

```bash
  yarn dev
```
o
```bash
  npm run dev
```
## Tecnologias
**Cliente:** NextJS, React

**Lenguaje de programacion:** TypeScript

**Framework de CSS:** Bootstrap

**Gestor de estado:** Jotai

**Libreria para peticiones:** Axios