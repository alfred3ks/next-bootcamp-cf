// Vemos el tema del alias: maravilloso!!!!!
import fetcher from "@next-nasa/utils/fetcher";
import { Image } from "@next-nasa/types";
import ImageOfTheDay from "@next-nasa/components/ImageOfTheDay";
import Last10DaysImages from "@next-nasa/components/Last10DaysImages";

// Tipamos las props de nuestro componente Home:
type HomeProps = {
  imageOfTheDay:Image;
  last10DayImages:Image[];
}

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

// Haremos el renderizado en el servidor SSR, no en el cliente:
export async function getServerSideProps(){
  try {
    // llamada de la API usando la funcion que tenemos en utils para la imagen del dia:
    const imageOfTheDay = await fetcher();
    // console.log(imageOfTheDay);
    // Llamada a la API para ver las imagenes del rango de fecha:estatica:
    // Si queremos hacer las fechas dinamica para que en funcion del dia muestre los dias anteriores usar la libreria: date-fns.org:
    const last10DayImages = await fetcher('&start_date=2023-03-01&end_date=2023-03-31');
    // console.log(last10DayImages);

    // Recuerda que debemos retornar un objeto:
    return {
      props:{
        imageOfTheDay,
        last10DayImages
      }
    }
  } catch (error) {
    console.log(error);
  }
}

// Si quisieramos usar SSG usaremos el metodo getStaticProps() OJO Nunca ambos o uno u otro en funcion de lo que necesitemos: Recuerda que esta pagina se genera en el build el otro de arriba se regenera en cada peticion:

// export async function getStaticProps(){
//   try {
//     // llamada de la API usando la funcion que tenemos en utils para la imagen del dia:
//     const imageOfTheDay = await fetcher();
//     // console.log(imageOfTheDay);
//     // Llamada a la API para ver las imagenes del rango de fecha:estatica:
//     // Si queremos hacer las fechas dinamica para que en funcion del dia muestre los dias anteriores usar la libreria: date-fns.org:
//     const last10DayImages = await fetcher('&start_date=2023-03-01&end_date=2023-03-10');
//     // console.log(last10DayImages);

//     // Recuerda que debemos retornar un objeto:
//     return {
//       props:{
//         imageOfTheDay,
//         last10DayImages
//       }
//     }
//   } catch (error) {
//     console.log(error);
//   }
// }

export default Home;
