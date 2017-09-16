export const authReducer = (state = {}, action) =>{
  switch (action.type) {
    case 'ADD_SESSION':
      return{
        ...action.session
      }
    default:
      return state;
  }
}
