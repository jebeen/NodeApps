import axios from 'axios'
export function loadMovies(data)
{
  return{
    type:'show',
    payload:data
  }
}

export function resultLoading(bool) {
  return {
    type: 'loading',
    payload: bool
  }
}

export function show() {
  return (dispatch)=>{
    fetch('http://localhost:8081/getMovies')
    .then(response=>{
      if(!response.ok)
      throw Error('Error')
      return response.json()
    })
    .then(data=>{
      dispatch(resultLoading(true))
      setTimeout(()=>{
        dispatch(resultLoading(false))
      dispatch(loadMovies(data.data))
    },3000);
    })
    .catch(error=>console.log(error))
  }
}

export function showMovie(id) {
console.log(id)
  return {
    type: 'showMovie',
    payload: id
  }

}

export async function updateMovie(data) {
  await axios({
    url: 'http://localhost:8081/updateMovie',
    method: 'POST',
    data: data,
  })
  .then(res=>{
    if(!res.status) throw Error('Error');
    return res;
  })
  .catch(e=>console.log(e))
}

export function update(data) {
  updateMovie(data);
  return {
    type: 'update',
    payload: data
  }
}
