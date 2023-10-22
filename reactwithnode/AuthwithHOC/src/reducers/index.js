export default function serviceReducer(state, action) {
  switch(action.type) {

    case 'loadService':
    return Object.assign({}, state, {services: action.payload})

    case 'load':
    return {
      ...state, loading: action.payload
    }

    default:
    return state
  }
}
