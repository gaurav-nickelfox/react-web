import { createStore, combineReducers } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import AppReducer from "./reducers/appReducer";
import BlogReducer from "./reducers/blogReducer";

const PersistConfig = {
  key: "root",
  storage,
  whitelist: ["app"]
};

const AllReducer = {
  app: AppReducer,
  blog:BlogReducer
};

const rootReducer = combineReducers(AllReducer);
const persistedReducer = persistReducer(PersistConfig, rootReducer);

const store = createStore(persistedReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
export const persistor = persistStore(store);
export default store;
