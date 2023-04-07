import fetcher from "@next-nasa/utils/fetcher";
import { Image as ImageType } from "@next-nasa/types";

// Tipado:
type ImageDateProps = {
  image:ImageType;
}

type StaticPropsParams = {
  params:any;
}

// Componente que renderiza la imagen:
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
// Este metodo acompaña al metodo getStaticProps
export async function getStaticPaths(){
  return {
    // Asi se creara statica pero sin datos: mmm leer documentacion min:1.23.38 le decimos que path se tienen que renderizar en el servidor: Las paginas o parametros que enviemos en el arreglo de paths son las que se crearan cuando se haga el build.
    paths:[],
    fallback:'blocking'
  }
}

// Tambien podemos usar el metodo getServerSideProps(), pero ojo o uno o el otro:
// export async function getServerSideProps(ctx:any){
// console.log(ctx);
// console.log(ctx.query.date);
// const date = ctx.query.date;
//   try {
//     const image = await fetcher(`&date=${date}`);
//     return {
//       props:{
//         image
//       }
//     }
//   } catch (error) {
//     console.error(error);
//   }
// }

export default ImageDate;
