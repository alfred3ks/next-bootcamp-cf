/*
En este apartado vamos a hablar sobre los estilos, como funciona en Next.js.
Suele ser muy parecido como cuando trabajamos con frontend, pero existen algunas diferencias cuando lo hacemos con Next.js.

Podemos crear hojas de estilos puro, sin necsidad de ningun preprocesador. Para crearlo lo haremos dentro de la carpeta components, usaremos los modulos de css de React.js que tambien ya son compatibles en Next.js.

La manera para llamar las hojas de estilos:

[name].module.css

Donde [name] es el nombre del component.

Lo podemos ver en la documentacion de Next.js:

https://nextjs.org/docs/basic-features/built-in-css-support

Para usar el modulo en el componente los podemos hacer con el import en nuestro js. De tal manera es como si estuvieramos haciendo un maping a objetos.

import styles from './Button.module.css'

Vemos un ejemplo que vemos en la documentacion de Next.js

You do not need to worry about .error {} colliding with any other `.css` or
`.module.css` files!

.error {
  color: white;
  background-color: red;
}

import styles from './Button.module.css';

export function Button() {
  return (
    <button
      type="button"
      // Note how the "error" class is accessed as a property on the imported
      // `styles` object.
      className={styles.error}
    >
      Destroy
    </button>
  )
}

Vemos como usamos la clase en el componente:

className={styles.error}

Vamos a ver ahora dentro de nuestro proyecto de la nasa. 🔥
Vemos que nuestro componente se ha creado dentro de una carpeta, por ejemplo, ImageOfTheDay ahi tenemos nuestro index.tsx y podemos incluir nuestra hoja de estilos.

Vemos que creamos el archivo de css:

ImageOfTheDay.module.css

Vemos como nos queda el archivo ImageOfTheDay.module.css: 🔥
.container {
  width: 100%;
  max-width: 920px;
  margin: 24px 0;
  display: flex;
  flex-direction: column;
  text-align: center;
}

.image {
  width: 100%;
}

Y nuestro componente ImageOfTheDay/index.tsx: 🔥
import { Image } from "@next-nasa/types";
import { useRouter } from "next/router";
import styles from './ImageOfTheDay.module.css';

console.log(styles); // Vemos que es un objeto {}

const ImageOfTheDay = ({url, title, date}:Image) => {

  // Instanciamos el objeto para usar sus atributos y metodos, uno el push()
  const router = useRouter()

  return (
    <div className={styles.container}>
      <h2>{title}</h2>
      <img className={styles.image} src={url} alt={title} onClick={()=>{
        return router.push(`/image/${date}`)
      }}/>
    </div>
  );
}

export default ImageOfTheDay;

Leer la documentacion para como usar los estilos en la pagina de Next.js.

Basicamente este es el tema de los estilos para Next.js. Si queremos probar con tailwinds css vemos que explican como hacerlo en la documentacion.

Vamos a ver los Layout en Next.js: 🔥
Vemos el enlace a la documentacion:

https://nextjs.org/docs/basic-features/layouts

Basicamente un layout es un componente global que recibe otros componentes, es principalmente para reutilizar codigo.

Puede ser el header, el footer, una barra lateral, etc. Vemos un ejemplo:

// components/layout.js

import Navbar from './navbar'
import Footer from './footer'

export default function Layout({ children }) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  )
}

Ahora vamos al ejercicio de la nasa vemos como crear un Layout.
Dentro de la carpeta components/Layout/index.tsx
Y creamos los componentes, header, footer, etc.

Pero donde vamos a colocar ese Layout, pues lo haremos en el componente _app.tsx que solo lo vamos a tocar para hacer cosas globales, como puede ser los estilos globales de la aplicacion.

El archivo Layout nos quedaria asi: 🔥

import Header from '../Header';
import Footer from '../Footer';

const Layout = ({children}:any) => {
  return (
    <div>
      <Header/>
      {children}
      <Footer/>
    </div>
  );
}

export default Layout;

Y nuestro archivo _app.tsx: 🔥
import Layout from '@next-nasa/components/Layout'
import '@next-nasa/styles/globals.css'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}

Este seria un layout que es global como podemos ver si entramos en el apartado del detalle de una imagen ahi los tenemos tambien. Pero tambien podemos hacer layout para contenido especifico, tipos de rutas, ciertos tipos de paginas.

Esto es basicamente como funcionan los Layout en Next.js.

Ahora vamos a ver el tema de las imagenes en Next.js 🔥:

Cuando trabajamos con el tag de img en un proyecto de Next.js nos muestra una advertencia, este tag necesita de muchas optimizaciones para poder funcionar bien.

Los desarrolladores de Next.js decidieron solucionar esto. Para eso el framework nos da un componente para las images.

Lo podemos ver en la documentación:

https://nextjs.org/docs/basic-features/image-optimization

Este componente esta muy optimizado para superar las metricas de de webvitals de Google. Y uno muy importante que es el CLS Cumulative Layout Shift, lo vemos en la documentacion:

https://nextjs.org/learn/seo/web-performance/cls

Para usar este componente es muy facil, lo tenemos que importar de 'next/image'. Lo vemos implementado en nuestros componentes, el de las imagen del dia y las ultimas 10 imagenes.

Ahora para usar el componente, podemos trabar con imagenes locales, en el proyecto -> (public), imagenes. He colocado un logo de youtube y lo mostramos.

import Image from "next/image";

<Image src='/youtube.svg' alt='Logo de youtube' width={300} height={300}/>

Tambien podemos mostrar imagenes que viene de una API como es el caso de nuestro proyecto, el cual consume imagenes de la nasa.

Vamos a sustituir el tag img por el componente Image de Next.js:
Para imagenes que vienen de una API o de internet tenemos que configurar un patron dentro del next.config.js

Eso es necesario porque asi no queda expuesta la url y nos protege de ataques malisiosos. Lo vemos mas claro en la documentacion:

https://nextjs.org/docs/basic-features/image-optimization
Domains
Sometimes you may want to optimize a remote image, but still use the built-in Next.js Image Optimization API. To do this, leave the loader at its default setting and enter an absolute URL for the Image src prop.

To protect your application from malicious users, you must define a list of remote hostnames you intend to use with the next/image component.

Vemos la explicacion de remote-pattern:

https://nextjs.org/docs/api-reference/next/image#remote-patterns

module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.example.com',
      },
    ],
  },
}

Lo configuramos en nuestro archivo del proyecto. NOTA: Cuando hagamos esto debemos reinicar el servidor para que reconozca los cambios agregados. 🔥

const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "apod.nasa.gov",
      },
    ],
  },
};

module.exports = nextConfig;

Vemos como nos queda nuestro archivo ImageOfTheDay con ya nuestro tag de Image: 🔥

import { Image as ImageType } from "@next-nasa/types";
import { useRouter } from "next/router";
import styles from './ImageOfTheDay.module.css';
import Image from "next/image";

console.log(styles); // Vemos que es un objeto {}

const ImageOfTheDay = ({url, title, date}:ImageType) => {

  // Instanciamos el objeto para usar sus atributos y metodos, uno el push()
  const router = useRouter()

  return (
    <div className={styles.container}>
      { Imagen local con Image }
      <Image src='/youtube.svg' alt='Logo de youtube' width={400} height={300}/>
      <h2>{title}</h2>
      <Image
        className={styles.image}
        src={url || ''}
        alt={title || ''}
        width={500}
        height={500}
        onClick={()=>{
          return router.push(`/image/${date}`)
      }}/>
    </div>
  );
}

export default ImageOfTheDay;

OJO: 🔥

src={url || ''}
alt={title || ''}

Esto es porque es TypeScript el componente espera algo de url no puede ser undefined.

Vemos mas configuracion que podemos agregar a nuestras imagenes y el componente para el next.config.js lo podemos ver en la documentacion, leer.

Una cosa que vemos cuando usamos el componente Image que nos pide el width y el height, se lo estamos pasando como valor estativo fijo para poder hacer el responsive usaremos la propiedad fill.

Con esta propiedad esta va a ocupar el 100% del contenedor en ancho y alto. OJO para usar esta propiedad tenemos que quitar el width y el height. No puede llevar ambas propiedades. El contenedor padre es el que tiene el control de la imagen ya que ella ocupara el 100% de el.
mmm hay que ver mas en profundidad esta propiedad.

Ahora OJO para que nuestra imagen sea responsiva debemos usar en su contenedor la propiedad object-fit. Y Asi nuestra imagen se hace responsive. OJO 🔥 🔥

.image {
  width: 100%;
  object-fit: fill; 🔥🔥
  object-fit: cover; 🔥🔥
  object-fit: contain; 🔥🔥
}

Ver esta propiedad de css object-fit para imagenes:

https://developer.mozilla.org/en-US/docs/Web/CSS/object-fit

Ahora vamos a ver otro componente que viene con next.js. 🔥

El componente para las fuentes.
https://nextjs.org/docs/basic-features/font-optimization

Agregar fuentes en Next.js es bastante sencillo.

Vemos el archivo _document.tsx

Ese es como tal nuestro html, vamos a ver que tenemos en el.

import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="es">
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}

El Html, Head, Main, NextScript son componentes de Next.js.
El componente NextScript es donde estan todos los script de next para funcionar.

Vamos a poner que queremos usar unas fuentes de google fonts. La roboto. Tenemos que copiar el link que nos da google y pegarlo en el <Head></Head>

import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="es">
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;700;900&display=swap" rel="stylesheet"/>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}

Y los estilos los agregamos en el css global: -> globals.css.


body {
  color: rgb(var(--foreground-rgb));
  background: linear-gradient(
      to bottom,
      transparent,
      rgb(var(--background-end-rgb))
    )
    rgb(var(--background-start-rgb));
  font-family: "Roboto", sans-serif;
  font-weight: 900;
}

Esa seria una forma, ahora tambien lo podemos hacer con el componente Font que nos provee Next.js.
Esto es lo mas optimizado.

Vamos a instanciar las fuente Monserrat y Roboto dentro del proyecto.
Para eso debemos ir al archivo _app.tsx. Aqui vamos a importar las fuentes de manera global, pero tambien lo podemos hacer a nivel de componente.

import { Roboto } from 'next/font/google'; 🔥

import Layout from '@next-nasa/components/Layout'
import '@next-nasa/styles/globals.css'
import type { AppProps } from 'next/app'
import { Roboto } from 'next/font/google'

// Creamos una instancia de la fuente:
const roboto = Roboto({
  weight: ['100','400','700', '900'],
  subsets: ['latin']
})

console.log(roboto);

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={roboto.className}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </main>
  )
}

Asi otra forma de agregar fuentes en Next.js. Estas fuentes viene de Next.js internamente. No a los servidores de Google. Eso ayuda mucho al performance.

Esto podemos extender en la documentacion de Next.js:
https://nextjs.org/docs/basic-features/font-optimization

Tambien si tenemos una fuente muy especial y la tenemos que cargar en el proyecto de manera local y la podemos usar.

// pages/_app.js
import localFont from 'next/font/local'

// Font files can be colocated inside of `pages`
const myFont = localFont({ src: './my-font.woff2' })

export default function MyApp({ Component, pageProps }) {
  return (
    <main className={myFont.className}>
      <Component {...pageProps} />
    </main>
  )
}

Tambien lo tendriamos que hacer en el archivo _app.tsx para que sea global.
La fuente la pondriamos dentro de la carpeta pages o public.

Ahora vamos a hablar de los static File Serving: 🔥

https://nextjs.org/docs/basic-features/static-file-serving

Cuando servimos archivos que estan en public no hace falta poner la carpeta en la ruta nos basta con usar el barra inclinada, como hemos hecho en el componente ImageOfTheDay

import { Image as ImageType } from "@next-nasa/types";
import { useRouter } from "next/router";
import styles from './ImageOfTheDay.module.css';
import Image from "next/image";

console.log(styles); // Vemos que es un objeto {}

const ImageOfTheDay = ({url, title, date}:ImageType) => {

  // Instanciamos el objeto para usar sus atributos y metodos, uno el push()
  const router = useRouter()

  return (
    <div className={styles.container}>
      { Imagen local con Image }
      <Image src='/youtube.svg' alt='Logo de youtube' width={400} height={300}/>
      <h2>{title}</h2>
      <Image
        className={styles.image}
        src={url || ''}
        alt={title || ''}
        width={800}
        height={800}
        // fill
        onClick={()=>{
          return router.push(`/image/${date}`)
      }}/>
    </div>
  );
}

export default ImageOfTheDay;

<Image src='/youtube.svg' alt='Logo de youtube' width={400} height={300}/>

Vemos lo de la ruta aqui, por ejemplo.

Ahora vamos a ver como poder manejar variables de entorno en un proyecto de Next.js. 🔥
Funciona bastante similar como con React-app o Vite.

https://nextjs.org/docs/basic-features/environment-variables

Por defecto vamos a tener .env.local para cargar las variables.
Si vamos a production .env.production etc.

Dependera del ambiente en que estemos trabajando. Ver la documentacion.

Para crear las variables de entorno creamos el archivo en la raiz del proyecto.
.env.local y asegurarnos que este en el gitignore.

Para poder leer la variable de entorno reiniciamos el servidor, es lo que recomiendan hacer.

Y vamos a un archivo cualquiera, ImageOfTheDays, un componente y consumimos la variable de entorno.

import Layout from '@next-nasa/components/Layout'
import '@next-nasa/styles/globals.css'
import type { AppProps } from 'next/app'
import { Roboto } from 'next/font/google'

// Creamos una instancia de la fuente:
const roboto = Roboto({
  weight: ['100','400','700', '900'],
  subsets: ['latin']
})

console.log(roboto);

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={roboto.className}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </main>
  )
}

De esta manera es accedida la variable de entorno en el servidor y no en el cliente, pero si ponemos en la variable de entorno:

NEXT_PUBLIC_INSTRUCTOR=Alfredo Sánchez

Reiniciamos el servidor.

Tarea buscar informacion sobre las variables de entorno.

*/
