import React,{Component,useContext} from 'react';
import {BrowserRouter, Routes, Route, Link, useParams} from 'react-router-dom';
import {Context} from '../contexts/MyApp1Context';
import Movies from './movies';
import axios from 'axios';
import $ from 'jquery';
import img1 from '../assets/images/img1.jpg';
import img2 from '../assets/images/img2.jpg';
import img3 from '../assets/images/img3.jpg';
import '../assets/style.css';

const Sliders=()=>{
  return (
    <div className="container carousel-container">
    <div id="sliders" class="carousel slide" data-ride="carousel">

    <ol class="carousel-indicators">
      <li data-target="#sliders" data-slide-to="0" class="active"></li>
      <li data-target="#sliders" data-slide-to="1"></li>
      <li data-target="#sliders" data-slide-to="2"></li>
    </ol>


    <div className="carousel-inner" >
      <div className="item active">
        <img src={img1} alt="Slide 1"  />
      </div>

      <div class="item">
        <img src={img2} alt="Slide 2" />
      </div>

      <div class="item">
        <img src={img3} alt="Slide 3"  />
      </div>
    </div>


    <a class="left carousel-control" href="#sliders" data-slide="prev">
      <span class="glyphicon glyphicon-chevron-left"></span>
      <span class="sr-only">Previous</span>
    </a>
    <a class="right carousel-control" href="#sliders" data-slide="next">
      <span class="glyphicon glyphicon-chevron-right"></span>
      <span class="sr-only">Next</span>
    </a>
  </div>
</div>
  )
}

const Home = () => {
return (
  <div>
  <Sliders/>
  <div class="container">
  <p>Home Page</p>
  </div>
  </div>
)
}
const Blog = (props) => {
  const {id} = useParams();
  return (
    <p>Blog { id } Page</p>
  )
}

const Item = (props) => {
  let {p_id,name,Company,category,price} = props.data.data;

  const handleButton = async (e) => {
  let btnText = 'Save';
  let row= e.target.closest('tr');
  if($(e.target).text() == 'Edit') {
    $(e.target).text(btnText);
    $(row).find('td').not('.nonedit').each((i,j) => {
      j.setAttribute('contenteditable', true);
    })
  } else {
    let data={};
    data['id']=e.target.id;
    $(row).find('td').not('.nonedit').each((i,j) => {
      let index=$(j).attr('name');
      data[index]=$(j).text();
    })
    props.data.callback(data);
  }
}

return (
  <tr>
  <td name="id" class="nonedit" contenteditable="false">{p_id}</td>
  <td name="name" contenteditable="false">{name}</td>
  <td name="category" contenteditable="false">{category}</td>
  <td name="company" contenteditable="false">{company}</td>
  <td name="price" contenteditable="false">{price}</td>
  <td class='nonedit'>
  <button class="btn btn-warning btn-sm"  name="edit" id={p_id} onClick={(e)=>handleButton(e)}>Edit</button>
  </td>
  </tr>
)
}

const Products =  (props) => {
  const {products, editProduct} = useContext(Context);
  const callEdit = async (data) => {
    let c=editProduct;
    await axios({
      url: 'http://localhost:8081/saveProduct',
      method: 'POST',
      data: data,
    })
    .then(data=>
      {
        if(data.data.status) {
          $(".status").html(data.data.message);
        }
    })
    .catch(e=>console.log(e))
  }

return (
  <div class="container">
  <h3>Products</h3>
  <span class="status" style={{"color": "green","border":"1px solid blue"}}></span>
  <table class="table table-dark">
    <tr>
      <th>ID</th>
      <th>Name</th>
      <th>Category</th>
      <th>Brand</th>
      <th>Price</th>
      <th>Action</th>
    </tr>
  {products.result ?  products.result.map((item, index) => <Item data={{data: item, callback:callEdit}} />): ''}
  </table>
  </div>
)
}

class Header extends Component {
  render() {
    return (
      <React.Fragment>
      <BrowserRouter>

      <div className="container header">
      <div class="row">
      <div class="col-md-1"><Link to="/">Home</Link></div>
      <div class="col-md-1"><Link to="/products">Products</Link></div>
      <div class="col-md-1"><Link to="/blog/1">Blog</Link></div>
      <div class="col-md-1"><Link to="/movies">Movies</Link></div>
      </div>

      <Routes>
      <Route path="/" exact element={<Home />} />
      <Route path="/products" element={<Products />} />
      <Route path="/blog/:id" element={<Blog />} />
      <Route path="/movies" element={<Movies />} />
      </Routes>
      </div>

      </BrowserRouter>
      </React.Fragment>
    )
  }
}

export default Header;
