const reducer = (state, action) => {
  switch (action.type) {
    case 'add_user':
      return [
        ...state,
        action.value,
      ];
    default:
      return state;
  }
};

export default reducer;
