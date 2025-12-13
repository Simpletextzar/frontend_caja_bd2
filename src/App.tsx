import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashboardLayout from "@/app/layout/DashboardLayout";

import CajerosPage from "@/features/cajeros/CajerosPage";
import PagosPage from "@/features/pagos/PagosPage";
import RecibosPage from "@/features/recibos/RecibosPage";
import ExtornosPage from "@/features/extornos/ExtornosPage";
import ContribuyentesPage from "@/features/contribuyentes/ContribuyentesPage";
import ConceptosPagoPage from "@/features/conceptosPago/ConceptosPagoPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DashboardLayout />}>
          <Route path="cajeros" element={<CajerosPage />} />
          <Route path="pagos" element={<PagosPage />} />
          <Route path="recibos" element={<RecibosPage />} />
          <Route path="extornos" element={<ExtornosPage />} />
          <Route path="contribuyentes" element={<ContribuyentesPage />} />
          <Route path="conceptos" element={<ConceptosPagoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
