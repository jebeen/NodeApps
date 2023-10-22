import {useState, useContext} from 'react';
import {Context} from '../contexts/MyAppContext';

const Service=()=>{
  const {services} = useContext(Context);
  return (
    <div class="container service-container">
    <h3>Services</h3>
    <div className="row">
    {
      services.result ? services.result.map((item, i) =>
      <div class="col-md-3">{item.title}
      <br />
      <button className="read-button" data-toggle="collapse" data-target={"#info"+item.id} class="collapsible">Read More</button>
      <div class="collapse" id={"info"+item.id}>{item.info}</div></div>) : ''
    }
    </div>
    </div>
  )
}

export default function MyApp() {
  return (
    <div>
    <Service />
    </div>
  )
}
