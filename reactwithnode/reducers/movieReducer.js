export default function movieReducer (state, action) {
  console.log(action, state);
  switch(action.type) {
    case 'show':
    return Object.assign({}, state, { movies: action.payload});
    // console.log(state)
    // return state;

    case 'loading':

    return {
      ...state, loading: action.payload ? false : true
    }

    case 'showMovie':
    let movie = state.movies.filter(movie => movie.mid == action.payload);
    console.log(movie);
    return Object.assign({}, state,{movie: movie})

case 'update':

return {
       ...state,
       movies: state.movies.map(
           (content, i) => content.mid === action.payload.id ? {...content, title: action.payload.title}
                                   : content
       )
    }

// return Object.assign({}, state, {movies: newobject})
    // return state;
    default:
    return state;
  }
}
