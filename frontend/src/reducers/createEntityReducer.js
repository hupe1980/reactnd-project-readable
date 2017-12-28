const createEntityReducer = type => (state = {}, action) => {
  const { payload } = action;

  if (payload && payload.entities) {
    return {
      ...state,
      ...payload.entities[type],
    };
  }
  return state;
};

export default createEntityReducer;
