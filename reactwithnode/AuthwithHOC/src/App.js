import {useRef,useEffect,useState} from 'react';
import {useDispatch, useSelector} from 'react-redux'
import {fetchService} from './actions/index';

const Service = (props) => {

  const services = useSelector((state) => state.services)
  const loading=useSelector((state) => state.loading);

  const show = (id) => {
  let visibility="none";
  if(document.getElementById("details_"+id).style.display == "none") {
    visibility = "block";
  }
  document.getElementById("details_"+id).style.display=visibility;
}

return (
  <div>
    <p>Services</p>
    { services ?
      services.map((service,i)=> {
        return (
          <div>
            <p onClick={()=>show(i)}>{service.title}</p>
            <p style={{"display":"none"}} id={"details_"+i}>{service.info}</p>
          </div>
        )
      }
    ) : ''}
  </div>
)
}

const Auth = (username, password) => (BaseComponent) => {

  const AuthComponent=function(props) {
    const dispatch=useDispatch();
    let [status,setStatus] = useState(0);

    useEffect(()=>{
      dispatch(fetchService('http://localhost:8081/fetchService'))
    })

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: username, password: password })
    };

     fetch('http://localhost:8081/getUser', requestOptions)
        .then(response => response.json())
        .then(data => {console.log(data);setStatus(data.status)})
        .catch(err=>console.log(err))
    return <BaseComponent data={status} />
  }
return AuthComponent;
}

const BaseComponent = (props) => {
  return (
    <div>
    { props.data ? <Service /> : <p>Unauthorized user</p> }
    </div>
  )
}
const EnhancedComponent = Auth("username", "password")(BaseComponent);

export default EnhancedComponent;
