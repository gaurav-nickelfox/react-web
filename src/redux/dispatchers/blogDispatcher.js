import Stores from "../store";
import Actions from "../actions/blogAction";

const BlogDispatcher = {
  setEditorText: (data) => {
    Stores.dispatch({ type: Actions.SET_EDITOR_TEXT, data: data.bodyText });
  },
  setBlogDetails: (data) => {
    console.log(data);
    Stores.dispatch({ type: Actions.SET_BLOG_DETAILS, data });
  },
  setBlogTitle: (data) => {
    console.log({ data }, "onchnage");
    Stores.dispatch({ type: Actions.SET_BLOG_TITLE, data });
  },
  resetEditorState: () => {
    Stores.dispatch({ type: Actions.RESET_EDITOR });
  }
};

export default BlogDispatcher;
