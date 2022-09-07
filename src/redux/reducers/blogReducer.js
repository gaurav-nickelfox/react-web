import Actions from "../actions/blogAction";

let initialState = {
  intialEditorValue : "<h1>This is the intial State</h1>"
};
const BlogReducer = (state = initialState, action) => {
  switch (action.type) {
    case Actions.SET_EDITOR_TEXT:
      return {
        ...state,
        intialEditorValue: action.data
      };
      case Actions.RESET_EDITOR:
        return {
          ...state,
          intialEditorValue: ""
        };
    default:
      return state;
  }
};

export default BlogReducer;
