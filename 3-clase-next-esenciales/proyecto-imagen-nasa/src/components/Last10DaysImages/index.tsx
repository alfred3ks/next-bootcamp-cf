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