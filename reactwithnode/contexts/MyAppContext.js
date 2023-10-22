import React,{Component, createContext} from 'react';

export const Context=createContext();

class MyAppContext extends Component {

  state = {
    services: [],
    products: []
  }

  componentDidMount() {
    fetch('http://localhost:8081/fetch')
    .then(res=>{
      if(!res.ok)
      throw Error('Error')
      return res.json();
    })
    .then(data=>{console.log(data);this.setState({service: data})})
    .catch(e=>console.log(e))

    fetch('http://localhost:8081/get/products')
    .then(res => {
      if(!res.ok)
        throw Error('Error in fetching');
        return res.json();
    })
    .then(data => {console.log(data); this.setState({products: data})})
    .catch(err => console.log(err))
  }

  render() {
    return (
      <Context.Provider value={{...this.state }}>
        { this.props.children }
      </Context.Provider>
    )
  }
}

export default MyAppContext;
