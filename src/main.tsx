import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./styles/main.scss";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Login } from "./pages/login.tsx";
import { Register } from "./pages/register.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { InformMessage } from "./components/informMessage.tsx";
import { ActivateMessage } from "./components/activateMessage.tsx";
import { UsersContextProvider } from "./controllers/usersContextProvider.tsx";
import { CompaniesList } from "./pages/companiesList.tsx";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <UsersContextProvider>
      <Router>
        <Routes>
          <Route path="/" element={<App />}>
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />}/>
            <Route path="check-email" element={<InformMessage />}/>
            <Route path="companies" element={<CompaniesList />}/>
            <Route
              path="activate/:activatedToken"
              element={<ActivateMessage />}
            />
          </Route>
        </Routes>
      </Router>
    </UsersContextProvider>
  </QueryClientProvider>
);
