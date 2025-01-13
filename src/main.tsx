import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./styles/main.scss";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Login } from "./pages/Login.tsx";
import { Register } from "./pages/Register.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { InformMessage } from "./components/informMessage.tsx";
import { ActivateMessage } from "./components/activateMessage.tsx";
import { CompaniesList } from "./pages/companiesList.tsx";
import { Profile } from "./pages/profile.tsx";
import { Dashboard } from "./pages/dashboard.tsx";
import { NewCompany } from "./pages/addNewCompany.tsx";
import { RequireAuth } from "./utils/requireAuthRouters.tsx";
import { RequireNonAuth } from "./utils/requireNonAuthRouters.tsx";
import { ResetPassword } from "./pages/resetPassword.tsx";
import { RedirectFromHome } from "./utils/redirectFromHome.tsx";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<RedirectFromHome />} />
            <Route element={<RequireNonAuth />}>
              <Route path="register" element={<Register />} />
              <Route path="check-email" element={<InformMessage />} />
              <Route path="login" element={<Login />} />
              <Route
                path="activate/:activatedToken"
                element={<ActivateMessage />}
              />
            </Route>

            <Route element={<RequireAuth />}>
              <Route path="companies" element={<CompaniesList />} />
              <Route path="new" element={<NewCompany />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="profile" element={<Profile />} />
              <Route path="reset-password" element={<ResetPassword />} />
            </Route>
          </Route>
        </Routes>
      </Router>
  </QueryClientProvider>
);
