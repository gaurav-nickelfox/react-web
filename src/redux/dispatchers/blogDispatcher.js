// App wide dispatcher

import Stores from "../store";
import Actions from "../actions/blogAction";

const BlogDispatcher = {
  setEditorText: (data) => {
    Stores.dispatch({ type: Actions.SET_EDITOR_TEXT, data: data.bodyText });
  },
  resetEditorText: () => {
    Stores.dispatch({ type: Actions.RESET_EDITOR });
  },
};

export default BlogDispatcher;
