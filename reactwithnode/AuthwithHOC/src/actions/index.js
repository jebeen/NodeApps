export function fetchService(url) {
  return (dispatch)=>{
    fetch(url)
    .then(response=>{
      if(!response.ok) {
        throw Error('Error')
      } else {
        dispatch(loading(true))
        return response.json()
      }
    })
    .then(data=>{
        dispatch(loading(false));
        dispatch(loadService(data.result))
    })
    .catch(err=>console.log(err))
  }
}

function loadService(data) {
  return {
    type: 'loadService',
    payload: data
  }
}

function loading(bool) {
  return {
    type: 'load',
    payload: bool
  }
}
