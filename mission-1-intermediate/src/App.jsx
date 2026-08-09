import { OrderProvider } from "./context/OrderProvider";
import { EnrollmentProvider } from "./context/EnrollmentProvider";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthProvider";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Mainpage from "./pages/Mainpage";
import Kategori from "./pages/Kategori";
import DetailProduk from "./pages/DetailProduk";
import PesananSaya from "./pages/PesananSaya";
import KelasSaya from "./pages/KelasSaya";
import ProfilSaya from "./pages/ProfilSaya";
import MetodeBayar from "./pages/MetodeBayar";
import Bayar from "./pages/Bayar";
import Selesai from "./pages/Selesai";
import Tertunda from "./pages/Tertunda";
import BelajarKelas from "./pages/BelajarKelas";
import Sertifikat from "./pages/Sertifikat";
import RequireAuth from "./components/RequireAuth";
import "./App.css";
function App() {
  return (
    <AuthProvider>
      <OrderProvider>
        <EnrollmentProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Mainpage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/kategori" element={<Kategori />} />
              <Route path="/produk/:id" element={<DetailProduk />} />

              <Route
                path="/profil"
                element={
                  <RequireAuth>
                    <ProfilSaya />
                  </RequireAuth>
                }
              />
              <Route
                path="/kelas-saya"
                element={
                  <RequireAuth>
                    <KelasSaya />
                  </RequireAuth>
                }
              />
              <Route
                path="/pesanan-saya"
                element={
                  <RequireAuth>
                    <PesananSaya />
                  </RequireAuth>
                }
              />
              <Route
                path="/metode-bayar/:id"
                element={
                  <RequireAuth>
                    <MetodeBayar />
                  </RequireAuth>
                }
              />
              <Route
                path="/bayar/:id"
                element={
                  <RequireAuth>
                    <Bayar />
                  </RequireAuth>
                }
              />
              <Route
                path="/selesai/:id"
                element={
                  <RequireAuth>
                    <Selesai />
                  </RequireAuth>
                }
              />
              <Route
                path="/tertunda/:id"
                element={
                  <RequireAuth>
                    <Tertunda />
                  </RequireAuth>
                }
              />
              <Route
                path="/belajar/:id"
                element={
                  <RequireAuth>
                    <BelajarKelas />
                  </RequireAuth>
                }
              />
              <Route
                path="/sertifikat/:id"
                element={
                  <RequireAuth>
                    <Sertifikat />
                  </RequireAuth>
                }
              />
            </Routes>
          </BrowserRouter>
        </EnrollmentProvider>
      </OrderProvider>
    </AuthProvider>
  );
}

export default App;
