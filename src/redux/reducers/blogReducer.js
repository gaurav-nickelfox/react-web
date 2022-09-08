import Actions from "../actions/blogAction";
import { AppConstants } from "../../constants/AppConstants";

let initialState = {
  intialEditorValue: "",
  blogType: AppConstants.CREATE_BLOG,
  blogId: "",
  blogTitle: ""
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
        intialEditorValue: "",
        blogId: "",
        blogType: AppConstants.CREATE_BLOG,
        blogTitle: ""
      };
    case Actions.SET_BLOG_DETAILS: {
      const { blogId, intialEditorValue, blogType, blogTitle } = action.data;
      return {
        ...state,
        intialEditorValue,
        blogId,
        blogType,
        blogTitle
      };
    }
    case Actions.SET_BLOG_TITLE:
      return {
        ...state,
        blogTitle: action.data
      };
    default:
      return state;
  }
};

export default BlogReducer;
