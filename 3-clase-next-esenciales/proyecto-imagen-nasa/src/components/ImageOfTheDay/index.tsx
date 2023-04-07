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