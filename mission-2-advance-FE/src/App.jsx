import { Provider } from "react-redux";
import store from "./rtk/store";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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
import PagesNotFound from "./pages/PagesNotFound";
import GuestRoute from "./router/GuestRoute";
import ProtectedRoute from "./router/ProtectedRoute";
import "./App.css";
function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Mainpage />} />
          <Route path="/PagesNotFound" element={<PagesNotFound />} />
          <Route path="/kategori" element={<Kategori />} />
          <Route path="/produk/:id" element={<DetailProduk />} />

          <Route
            path="/login"
            element={
              <GuestRoute>
                <Login />
              </GuestRoute>
            }
          />
          <Route
            path="/register"
            element={
              <GuestRoute>
                <Register />
              </GuestRoute>
            }
          />

          <Route
            path="/profil"
            element={
              <ProtectedRoute>
                <ProfilSaya />
              </ProtectedRoute>
            }
          />
          <Route
            path="/kelas-saya"
            element={
              <ProtectedRoute>
                <KelasSaya />
              </ProtectedRoute>
            }
          />
          <Route
            path="/pesanan-saya"
            element={
              <ProtectedRoute>
                <PesananSaya />
              </ProtectedRoute>
            }
          />
          <Route
            path="/metode-bayar/:id"
            element={
              <ProtectedRoute>
                <MetodeBayar />
              </ProtectedRoute>
            }
          />
          <Route
            path="/bayar/:id"
            element={
              <ProtectedRoute>
                <Bayar />
              </ProtectedRoute>
            }
          />
          <Route
            path="/selesai/:id"
            element={
              <ProtectedRoute>
                <Selesai />
              </ProtectedRoute>
            }
          />
          <Route
            path="/tertunda/:id"
            element={
              <ProtectedRoute>
                <Tertunda />
              </ProtectedRoute>
            }
          />
          <Route
            path="/belajar/:id"
            element={
              <ProtectedRoute>
                <BelajarKelas />
              </ProtectedRoute>
            }
          />
          <Route
            path="/sertifikat/:id"
            element={
              <ProtectedRoute>
                <Sertifikat />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
