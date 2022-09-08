import React from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import AppRouter from "./router";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { defaultTheme } from "./themes/defaultTheme";
import store, { persistor } from "redux/store";
import "./styles/global.scss";
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

/**
 * @description Check if browser is Safar
 * @description It'll be usefull for web notifications
 */

if (window.safari) {
  console.log("safari browser detected");
} else {
  // initializeFirebase();
}

function App() {
  const currentTheme = createTheme(defaultTheme);

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <ThemeProvider theme={currentTheme}>
          <AppRouter />
          <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar
          newestOnTop={false}
          rtl={false}
          pauseOnFocusLoss
          closeButton={false}
          draggable={false}
          pauseOnHover
        />
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
