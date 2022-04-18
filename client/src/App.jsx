import { BrowserRouter, Route, Routes } from "react-router-dom";

// General components
import Header from "./components/pages/Header";
import Main from "./components/pages/Main";

// Context
import { AuthProvider } from "./context/auth-context";
import { ModalProvider } from "./context/modal-context";
import { ThemeProvider } from "./context/theme-context";

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ThemeProvider>
          <ModalProvider>
            <Header />
            <Main />
          </ModalProvider>
        </ThemeProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
