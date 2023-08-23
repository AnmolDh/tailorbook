import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Admin from "./pages/Admin";
import Login from "./pages/Login";
import Test from "./pages/Test";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/test" element={<Test />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="*" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
