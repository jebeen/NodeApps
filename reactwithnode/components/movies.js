import React,{Component} from 'react';
import {connect, useSelector, useDispatch} from 'react-redux';
import $ from 'jquery';
import {show, showMovie, update} from '../actions/movie';

  const Movie = (data) => {
    const dispatch=useDispatch();
    return (
      <div>
      {
        data.data ? data.data.map(item=>{
          return (
            <div>
            <p onClick={()=>dispatch(update({"id":movie.mid,"title":"new Title"}))}>>{item.title}</p>
            <p>{item.description}</p>
            <p>{item.director}</p>
            </div>
          )
      }) : ''
    }
    </div>
  )
}

class Movies extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.show();
  }

  GetMovie = async (e, mid) => {
  let data=await this.props.showMovie(mid);
    return (
      <Movie data={data} />
    )
  }

  showDetails(mid) {
    let vis;
    if($("#show_"+mid).css('display') == "block") {
      vis = "none";
    } else {
      vis= "block";
    }
    $("#show_"+mid).css({"display": vis});
  }

  render() {
    return (
      <div>
      {this.props.movies ? this.props.movies((movieItem) =>
        <p onClick={this.GetMovie()}>{movieItem.title}</p>)} : 'Not available'
      }
      </div>
    )
  }
}

const MapStateToProps = (state) => {
  return {
    movies: state.movies,
    loading: state.loading,
    movie: state.movie
  }
}

const MapStateToDispatch = (dispatch) => {
  return {
    show: ()=>dispatch(show()),
    showMovie: (id) => dispatch(showMovie(id))
  }
}

export default connect(MapStateToProps, MapStateToDispatch)(Movies)
