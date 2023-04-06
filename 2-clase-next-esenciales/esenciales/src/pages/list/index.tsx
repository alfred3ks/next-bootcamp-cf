// El componente List recibe por props el resultado de hacer el fetch a la API:
const List = ({users}:any) => {
  // Este console es en el Cliente:
  console.log(users);
  return (
    <>
      <h1>User list</h1>
      <ul>
        {users.map((user:any)=>{
          return (
            <li key={user.id}>{user.name}</li>
          )
        })}
      </ul>
    </>
    );
}

// Usamos el metodo para generar static side generation, ver documentacion:
export async function getStaticProps(){
  try {
    // Nos conectamos a la API:
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    const result = await response.json();
    // Este console es en el servidor:
    console.log(result);

    // Tenemos que devolver un objeto:
    return {
      props: {
        users:result
      }
    }

  } catch (error) {
    console.log(error);
    return {}
  }
}

export default List;