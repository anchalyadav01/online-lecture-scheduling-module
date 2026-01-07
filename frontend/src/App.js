import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import AdminPage from "./pages/AdminPage";
import InstructorPage from "./pages/InstructorPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/instructor/:id" element={<InstructorPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
