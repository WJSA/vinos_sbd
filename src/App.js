import { BrowserRouter, Route, Routes } from "react-router-dom";
import EmpresaForm from "./components/EmpresaForm";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/EmpresaForm" element={<EmpresaForm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
