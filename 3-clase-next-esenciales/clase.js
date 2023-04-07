/*
Para esta clase vamos a ver un ejemplo para empezar a aplicar y como hacer organizacion de las carpetas dentro de un proyecto.

Una cosa que ha realizado desde React.js han descontinuado create react app. Para dar soporte en un framework como Next.js

Vamos a empezar con la creación de un proyecto. Lo llamaremos proyecto-imagen-nasa.

  npx create-next-app@latest proyecto-imagen-nasa --typescript

Para este proyecto vamos a usar una API, la podemos encontrar en el siguiente enlace:

  https://api.nasa.gov/

-- NOTA: --🔥
En la creacion del proyecto nos pide si queremos usar un alias, esto es cuando queremos acceder cuando hacemos los import a las rutas, veamos un ejemplo:

import nasa from '../../components';

Con el alias lo hariamos asi:

import nasa from '@next-nasa/components'

Ahora vamos a generar la APIKey en nasa, debemos rellenar el formaulario:
Nos enviaran el APIKey al correo: Como es un proyecto de prueba pondre la APIKey aqui:

sAr2v0Zk5teaBGfyklBUnRrdt4OmzgKizlQ5CSet

La Nasa muestra diariamente la imagen del dia, que toma con sus telescopios, lo que haremos es mostrar esa imagen.

En el apartado de Browser API vemos eso. APOD.

Vemos cual sera el endpoint que usaremos:

https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY
https://api.nasa.gov/planetary/apod?api_key=sAr2v0Zk5teaBGfyklBUnRrdt4OmzgKizlQ5CSet

Ahora si queremos usar los query params que nos da la nasa para ver mas cosas, por ejemplo vamos a ver un rango de dias le pasamos los parametros por la url:

https://api.nasa.gov/planetary/apod?api_key=sAr2v0Zk5teaBGfyklBUnRrdt4OmzgKizlQ5CSet&start_date=2023-02-01&end_date=2023-03-01

Ahora para nuestro proyecto vamos a mostrar la imagen del dia y debajo de esta un listado de imagenes de los ultimos 10 dias.

Cunado demos click sobre las imagenes nos redirigire a otra pantalla donde solo mostraremos el detalle de la imagen con sus datos.

Vamos al proyecto.

Hacemos limpia de todo el codigo en index.tsx y creamos nuestro compoente.

Para ahora crear los componentes lo debemos hacer dentro de src/components.
Para ahora crear los componentes lo debemos hacer dentro de src/utils.

En utils vamos a crear la llamada a la API.

utils/fetcher.ts

// De aqui vamos a hacer la llamada a la API:
// https://api.nasa.gov/planetary/apod?api_key=sAr2v0Zk5teaBGfyklBUnRrdt4OmzgKizlQ5CSet
const BASE_URL = 'https://api.nasa.gov/planetary/apod';
const API_KEY = 'sAr2v0Zk5teaBGfyklBUnRrdt4OmzgKizlQ5CSet&';

const fetcher = async(queryParams?:string)=>{
  try {
    // Si los queryParams viene agregalos sino mete un string vacio: recuerda el queryParams? ?->es opcional
    const response = await fetch(`${BASE_URL}?api_key=${API_KEY}${queryParams?.length ? queryParams : ''}`);
    const data = await response.json();

    return Promise.resolve(data);

  } catch (error) {
    return Promise.reject(error);
  }

}

export default fetcher;

Para los componentes los vamos a crear en src/components. 🔥

Una cosa que aqui es interesante en Next.js es que creamos una carpeta con el nombre del componente y dentro creamos el index.tsx luego el componente dentro lo llamamos como se llama la carpeta.

Dentro del proyecto tambien he creado una carpeta src/types donde iran todos los tipos de manera global.

// Aqui podemos ver todos los tipos de forma global.

// Aqui creamos el tipo para tscript, son los datos que nos devuelve el Objeto de la API:
export type Image = {
  date?:string;
  explanation?:string;
  url?:string;
  hdurl?:string;
  title?:string;
}

Ahora tenemos los componentes:
ImageOfTheDay/index.tsx:

import { Image } from "@next-nasa/types";
const ImageOfTheDay = ({url, title}:Image) => {
  return (
    <>
    <h2>{title}</h2>
    <img src={url} alt={title} />
    </>
  );
}

export default ImageOfTheDay;

Last10DaysImages: 🔥

import { Image } from "@next-nasa/types";

// declaramos el tipo:
type Last10DaysImagesProps = {
  images: Image[]
}

const Last10DaysImages = ({images}:Last10DaysImagesProps) => {
  return (
    <>
      <h2>Images Last 10 Days</h2>
      {images?.map((image)=>{
        return (
          <div key={`last-10-days-image-${image.title}`}>
            <img src={image.url} alt={image.title} />
            <h3>{image.title}</h3>
          </div>
        )
      })}
    </>
  );
}

export default Last10DaysImages;

Y estos dos componentes los importamos en nuestro index.tsx el punto de aranque de nuestra aplicacion.
pages/index.tsx

Vemos parte del archivo: 🔥

// El componente HOME recibe por props lo que retorna getServerSideProps()
const Home = ({imageOfTheDay, last10DayImages}:HomeProps)=>{
  // Vemos en el cliente:
  console.log(imageOfTheDay);
  console.log(last10DayImages);
  return (
    <>
      <h1>Image of the day</h1>
      <ImageOfTheDay {...imageOfTheDay}/>
      <Last10DaysImages images= {last10DayImages}/>
    </>
  )
}

Lo que haremos ahora es mostrar el detalle de una imagen cuando hagamos clic en ella. Para eso usaremos el route de Next.js

Para este caso necesitamos la ayuda de un hook que podemos ver en la documentacion de Next.js:

https://nextjs.org/docs/api-reference/next/router 🔥

Vamos dentro de pages y creamos una nueva pagina para mostrar el detalle de una imagen que solictemos por la url.

pages/image/[date].tsx 🔥

localhost:3000/image/2023-03-01

Debemos ahora nuestro codigo que cuando hagamos clic en una imagen nos devuelve a la pagina del detalle usando el router.

En nuestro dos componentes debemos importar el router, ese objeto.

Vemos como quedan: 🔥

import { Image } from "@next-nasa/types";
import { useRouter } from "next/router";

const ImageOfTheDay = ({url, title, date}:Image) => {

  // Instanciamos el objeto para usar sus atributos y metodos, uno el push()
  const router = useRouter()

  return (
    <div>
      <h2>{title}</h2>
      <img src={url} alt={title} onClick={()=>{
        return router.push(`/image/${date}`)
      }}/>
    </div>
  );
}

export default ImageOfTheDay;

🔥
import { Image } from "@next-nasa/types";
import { useRouter } from "next/router";

// declaramos el tipo:
type Last10DaysImagesProps = {
  images: Image[]
}

const Last10DaysImages = ({images}:Last10DaysImagesProps) => {

  // Instanciamos el objeto router para usar sus metodos, en el onclic:
  const router = useRouter();
  return (
    <div>
      <h2>Images Last 10 Days</h2>
      {images?.map((image)=>{
        return (
          <div key={`last-10-days-image-${image.title}`}>
            <img src={image.url} alt={image.title} onClick={()=>{
              return router.push(`/image/${image.date}`)
            }}/>
            <h3>{image.title}</h3>
          </div>
        )
      })}
    </div>
  );
}

export default Last10DaysImages;

Ahora en nuestro archivo de [date].tsx vemos como usamos los metodos para crear una pagina SSG, static side generation pero con unas rutas que son dinamicas, para eso debemos usar dos metodos juntos. Lo vemos en el codigo:

import fetcher from "@next-nasa/utils/fetcher";
import { Image as ImageType } from "@next-nasa/types";

// Tipado:
type ImageDateProps = {
  image:ImageType;
}

type StaticPropsParams = {
  params:any;
}

const ImageDate = ({image}:ImageDateProps)=>{
  // console.log(image);
  return (
    <div>
      <h2>{image.title}</h2>
      <img src={image.url} alt={image.title} />
      <h3>{image.date}</h3>
      <p>{image.explanation}</p>
    </div>
  )
}

// Vamos a hacer SSG static side generation para este caso:
export async function getStaticProps({params}:StaticPropsParams){
  // console.log(params);
  // { params: { date: '2023-03-02' }, locales: undefined, locale: undefined, defaultLocale: undefined }

const {date} = params;
  try {
    // http://localhost:3000/image/${date} ver documentacion API permite hacer peticiones a fechas asi:
    const image = await fetcher(`&date=${date}`);
    // console.log(image);

    return {
      props:{
        image
      }
    }
  } catch (error) {
    console.error(error);
  }
}

// Usamos este metodo para rutas dinamicas, como es el caso y queremos usar el metodo para SSG como el de arriba, para generar una pagina static side generation, que se crea en el build:
// https://nextjs.org/docs/basic-features/data-fetching/get-static-paths
export async function getStaticPaths(){
  return {
    // Asi se creara statica pero sin datos: mmm leer documentacion min:1.23.38
    paths:[],
    fallback:'blocking'
  };
}

export default ImageDate;

Ahora ya vemos que todo funciona ahora queda dar estilos.

NOTA: Para eso lo veremos en el siguiente clase, otra cosa las APIKeys estan codeadas no debemos hacerlo asi vale.

Queda volver a repasar para ver los metodos.
Otra cosa vemos que nos dice que debemos implementar mejor el componete <Image/> en vez de <img/> eso lo veremos mas adelante.

*/
