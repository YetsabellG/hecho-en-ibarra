# Publicar Hecho en Ibarra

La aplicación está preparada para desplegarse en **Vercel** desde el repositorio de GitHub. El proyecto usa Next.js 16, Supabase Auth, Supabase Database y Supabase Storage.

## 1. Revisar el proyecto localmente

```bash
npm install
npm run dev
```

Antes de publicar, comprobar:

```bash
npm run lint
npm run build
```

## 2. Crear el proyecto en Vercel

1. Entrar a [vercel.com](https://vercel.com) e iniciar sesión con GitHub.
2. Seleccionar **Add New → Project**.
3. Importar el repositorio `YetsabellG/hecho-en-ibarra`.
4. Mantener el framework como **Next.js**.
5. Añadir las variables de entorno del archivo `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://htqvtrgkslbwqslzooje.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=TU_CLAVE_PUBLICABLE_DE_SUPABASE
```

La clave publicable/anónima puede utilizarse en el navegador. **Nunca** se debe publicar una `service_role key` ni una contraseña.

6. Seleccionar **Deploy**.

## 3. Configurar Supabase Auth

En Supabase, abrir **Authentication → URL Configuration** y registrar:

- Site URL: la URL de producción de Vercel.
- Redirect URLs: la URL de producción y, si se necesita, `http://localhost:3000/**` para desarrollo.

## 4. Administradora

La ruta `/admin` valida que la sesión corresponda a:

```text
guerrero.antonellaa11@gmail.com
```

La cuenta debe existir en **Authentication → Users**. La autorización de datos continúa protegida por RLS; no se debe desactivar RLS.

## 5. Storage

Los buckets utilizados por el proyecto son:

- `products`
- `promotions`

Ambos deben existir en Supabase y tener sus políticas de Storage configuradas para permitir la carga únicamente según las reglas del proyecto.

## 6. GitHub

El ZIP original ya contiene el repositorio Git y el remoto configurado. Para publicar los cambios desde tu computadora:

```bash
git add .
git commit -m "Completa plataforma y rediseño visual"
git push origin main
```

Vercel volverá a desplegar automáticamente cada vez que se actualice `main`.

## Estado validado

- `npm run lint`: correcto; quedan advertencias no bloqueantes sobre optimización de imágenes.
- `npm run build`: correcto.
- Respuestas locales HTTP 200: `/`, `/promociones`, `/eventos`, `/admin`.
- No se incluyó `.env.local` en el paquete limpio.
