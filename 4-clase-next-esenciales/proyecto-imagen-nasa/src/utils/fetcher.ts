// De aqui vamos a hacer la llamada a la API:
// https://api.nasa.gov/planetary/apod?api_key=sAr2v0Zk5teaBGfyklBUnRrdt4OmzgKizlQ5CSet
const BASE_URL = 'https://api.nasa.gov/planetary/apod';
const API_KEY = 'sAr2v0Zk5teaBGfyklBUnRrdt4OmzgKizlQ5CSet&';

const fetcher = async(queryParams?:string)=>{
  try {
    // Si los queryParams viene agregalos sino mete un string vacio: recuerda el queryParams? ?->es opcional
    const response = await fetch(`${BASE_URL}?api_key=${API_KEY}${queryParams?.length ? queryParams : ''}`);
    const data = await response.json();
    // return Promise.resolve(data);
    return data; // Podemos devolver de las dos formas usando Promise o el objeto.
  } catch (error) {
    // return Promise.reject(error);
    return error;
  }
}

export default fetcher;
