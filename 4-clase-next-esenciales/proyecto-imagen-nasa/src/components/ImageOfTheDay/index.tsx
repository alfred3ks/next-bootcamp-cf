import { Image as ImageType } from "@next-nasa/types";
import { useRouter } from "next/router";
import styles from './ImageOfTheDay.module.css';
import Image from "next/image";

console.log(process.env) // Ver consola del servidor.

console.log(styles); // Vemos que es un objeto {}

const ImageOfTheDay = ({url, title, date}:ImageType) => {

  // Instanciamos el objeto para usar sus atributos y metodos, uno el push()
  const router = useRouter()

  return (
    <div className={styles.container}>
      {/* Imagen local con Image */}
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