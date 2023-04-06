const Photos = ({ data }: any) => {
  // Mostramos por consola del cliente:
  console.log(data)
  return (
    <>
      <h1>Photos</h1>
      {data?.map((img: any) => {
        return (
          <img src={img.url} alt={img.title} key={img.id}/>
        )
      })}
    </>
  );
}

// Creamos la funcion con el metodo para hacer la pagina SSR:
export async function getServerSideProps() {
  try {
    // Nos conectamos a la API:
    const response = await fetch('https://jsonplaceholder.typicode.com/photos');
    const data = await response.json();
    // Este console es en el servidor:
    // console.log(data);
    return {
      // Retornamos un objeto:
      props: {
        data
      }
    }
  } catch (error) {
    console.log(error)
  }
}

export default Photos;
