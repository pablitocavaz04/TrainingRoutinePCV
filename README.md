# TrainingRoutinePCV

&#x20;

## 📌 Descripción del Proyecto

TrainingRoutinePCV es una aplicación desarrollada en **Ionic/Angular** que permite la gestión de usuarios con roles específicos:

- **Gestor**: Administra jugadores, entrenadores y sesiones de entrenamiento.
- **Entrenador**: Gestiona sesiones y jugadores.
- **Jugador**: Puede ver sus sesiones asignadas.

La aplicación cuenta con autenticación, auto-login, guardas de seguridad y un sistema de traducción para varios idiomas.

## 🚀 Tecnologías Utilizadas

- **Frontend:** Ionic 7, Angular 16
- **Backend:** Strapi (Node.js CMS)
- **Base de Datos:** Strapi Database (SQLite o PostgreSQL en producción)
- **Autenticación:** JSON Web Tokens (JWT)
- **Traducción:** ngx-translate
- **Capacitor:** Para funcionalidades nativas

## 📂 Estructura del Proyecto

```
TrainingRoutinePCV/
│── src/
│   ├── app/
│   │   ├── pages/          # Páginas principales de la app
│   │   ├── components/     # Componentes reutilizables
│   │   ├── services/       # Servicios para comunicación con Strapi
│   │   ├── guards/         # Guardas de autenticación y autorización
│   │   ├── pipes/          # Pipes para transformar datos
│   │   ├── app.module.ts   # Módulo principal de la app
│   ├── assets/             # Recursos estáticos
│   ├── environments/       # Configuración de entornos
│   ├── global.scss         # Estilos globales
│   ├── main.ts             # Punto de entrada de la aplicación
```

## ⚙️ Instalación y Configuración

### **1️⃣ Clonar el repositorio**

```sh
git clone https://github.com/pablitocavaz04/TrainingRoutinePCV.git
cd TrainingRoutinePCV
```

### **2️⃣ Instalar dependencias**

```sh
npm install
```

### **3️⃣ Configurar el backend Strapi**

> Asegúrate de tener **Strapi** configurado con los modelos necesarios.

- Clona el backend desde su repositorio si está disponible.
- Instala dependencias (`npm install`).
- Inicia el servidor (`npm run develop`).

### **4️⃣ Configurar el entorno**

Modifica `src/environments/environment.ts` con la URL de tu API Strapi:

```ts
export const environment = {
  production: false,
  apiUrl: 'http://localhost:1337/api' // Cambia a tu API de producción si es necesario
};
```

### **5️⃣ Ejecutar la aplicación**

```sh
ionic serve
```

## 🔐 Autenticación y Seguridad

- **Login con JWT:** Se almacenan los tokens en **Storage de Ionic**.
- **Auto-login:** Implementado con `AuthGuard`.
- **Guardas de Seguridad:** Se aplican restricciones por rol (`Jugador`, `Entrenador`, `Gestor`).

## 🌍 Internacionalización (i18n)

La aplicación usa `ngx-translate` para ofrecer soporte multilingüe. Los archivos de traducción están en:

```
src/assets/i18n/
│── en.json  # Inglés
│── es.json  # Español
```

## 📱 Generar APK / iOS Build

Para probar la app en dispositivos móviles:

```sh
ionic capacitor build android
ionic capacitor build ios
```

## 📧 Contacto

**Pablo Camino Vázquez**

- **GitHub:** [pablitocavaz04](https://github.com/pablitocavaz04)
- **Email:** [pablocavaz2004@gmail.com](mailto\:pablocavaz2004@gmail.com)

---

Hecho con ❤️ y código por Pablo Camino Vázquez 🚀

