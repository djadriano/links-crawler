const appState = {
  fetched: false,
  links: null
};

const appReducer = (state = appState, action) => {
  switch( action.type ) {
    case 'FETCHED_LINKS_CRAWLER':
      return Object.assign({}, state, {
        links: action.payload,
        fetched: true
      })

    default:
      return state;
  }
};

export default appReducer;
