import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useCategoryList } from "../hooks/useCategoryList";
import { tutorSayaApi } from "../services/api/tutorSayaApi";
import { getApiMessage } from "../utils/apiError";
import { assetUrl } from "../utils/assetUrl";
import "./KelasForm.css";

const PRESET_IMAGES = Array.from({ length: 15 }, (_, i) => `cc-${i + 1}.jpg`);
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];
const MAX_IMAGE_SIZE = 2 * 1024 * 1024;

const EMPTY_FORM = {
  title: "",
  originalPrice: "",
  discount: "0",
  categoryId: "",
};

function validate(form, image) {
  const title = form.title.trim();
  if (!title) return "Nama kelas wajib diisi.";
  if (title.length > 150) return "Nama kelas maksimal 150 karakter.";
  if (/[<>]/.test(title))
    return "Nama kelas tidak boleh memuat tanda < atau >.";

  const price = Number(form.originalPrice);
  if (form.originalPrice === "" || !Number.isFinite(price) || price < 0) {
    return "Harga harus berupa angka 0 atau lebih.";
  }

  const discount = Number(form.discount === "" ? 0 : form.discount);
  if (!Number.isInteger(discount) || discount < 0 || discount > 100) {
    return "Diskon harus berupa bilangan bulat 0 sampai 100.";
  }

  if (!form.categoryId) return "Pilih kategori kelas.";
  if (!image) return "Pilih gambar kelas atau unggah gambar sendiri.";
  return "";
}

function KelasForm() {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();
  const { categories } = useCategoryList();

  const [form, setForm] = useState(EMPTY_FORM);

  const [image, setImage] = useState(null);
  const [loadState, setLoadState] = useState(isEdit ? "loading" : "ready");
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState("");

  useEffect(() => {
    if (!isEdit) return undefined;
    let cancelled = false;

    tutorSayaApi
      .getCourse(id)
      .then((course) => {
        if (cancelled) return;
        setForm({
          title: course.title,
          originalPrice: String(course.originalPrice),
          discount: String(course.discount),
          categoryId: String(course.categoryId),
        });
        setImage({ key: course.image });
        setLoadState("ready");
      })
      .catch((error) => {
        if (cancelled) return;
        setLoadState(error.response?.status === 404 ? "notFound" : "error");
      });

    return () => {
      cancelled = true;
    };
  }, [id, isEdit]);

  useEffect(() => {
    const preview = image?.preview;
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [image]);

  const finalPrice = useMemo(() => {
    const price = Number(form.originalPrice);
    const discount = Number(form.discount === "" ? 0 : form.discount);
    if (form.originalPrice === "" || !Number.isFinite(price)) return null;
    if (!Number.isFinite(discount) || discount < 0 || discount > 100)
      return null;
    return Math.round(price * (1 - discount / 100));
  }, [form.originalPrice, form.discount]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFile = (event) => {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;

    if (!ALLOWED_TYPES.includes(file.type)) {
      setFormError("Format gambar harus JPG, PNG, atau WEBP.");
      return;
    }
    if (file.size > MAX_IMAGE_SIZE) {
      setFormError("Ukuran gambar maksimal 2 MB.");
      return;
    }
    setFormError("");
    setImage({ file, preview: URL.createObjectURL(file) });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const problem = validate(form, image);
    if (problem) {
      setFormError(problem);
      return;
    }

    setSubmitting(true);
    setFormError("");
    try {
      let imageKey = image.key;
      if (image.file) {
        imageKey = await tutorSayaApi.uploadImage(image.file);

        setImage({ key: imageKey });
      }

      const payload = {
        title: form.title.trim(),
        originalPrice: Number(form.originalPrice),
        discount: Number(form.discount === "" ? 0 : form.discount),
        categoryId: Number(form.categoryId),
        image: imageKey,
      };

      if (isEdit) await tutorSayaApi.updateCourse(id, payload);
      else await tutorSayaApi.createCourse(payload);

      await Swal.fire({
        icon: "success",
        title: isEdit ? "Kelas diperbarui" : "Kelas dibuat",
        text: isEdit
          ? "Perubahan sudah disimpan."
          : "Kelas disimpan sebagai draf. Terbitkan dari dashboard kalau sudah siap.",
        confirmButtonColor: "#22c55e",
      });
      navigate("/dashboard-tutor");
    } catch (error) {
      setFormError(getApiMessage(error, "Gagal menyimpan kelas."));
    } finally {
      setSubmitting(false);
    }
  };

  if (loadState !== "ready") {
    const message =
      loadState === "loading"
        ? "Memuat kelas..."
        : loadState === "notFound"
          ? "Kelas tidak ditemukan."
          : "Gagal memuat kelas. Silakan coba lagi.";

    return (
      <div className="kelas-form-page">
        <Navbar />
        <div className="kelas-form-wrapper">
          <p className="kelas-form-message">{message}</p>
          <Link to="/dashboard-tutor" className="kelas-form-back">
            ‹ Kembali ke dashboard
          </Link>
        </div>
      </div>
    );
  }

  const previewSrc = image?.preview ?? assetUrl(image?.key);

  return (
    <div className="kelas-form-page">
      <Navbar />

      <div className="kelas-form-wrapper">
        <Link to="/dashboard-tutor" className="kelas-form-back">
          ‹ Kembali ke dashboard
        </Link>
        <h1 className="kelas-form-title">
          {isEdit ? "Ubah Kelas" : "Buat Kelas Baru"}
        </h1>

        <form className="kelas-form-card" onSubmit={handleSubmit} noValidate>
          <div className="kelas-form-field">
            <label htmlFor="title">Nama Kelas</label>
            <input
              id="title"
              name="title"
              type="text"
              value={form.title}
              onChange={handleChange}
              maxLength={150}
              placeholder="Contoh: Dasar-dasar Akuntansi"
            />
          </div>

          <div className="kelas-form-field">
            <label htmlFor="categoryId">Kategori</label>
            <select
              id="categoryId"
              name="categoryId"
              value={form.categoryId}
              onChange={handleChange}>
              <option value="">Pilih kategori</option>
              {categories.map((category) => (
                <option key={category.id} value={String(category.id)}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <div className="kelas-form-row">
            <div className="kelas-form-field">
              <label htmlFor="originalPrice">Harga Normal (Rp)</label>
              <input
                id="originalPrice"
                name="originalPrice"
                type="number"
                min="0"
                value={form.originalPrice}
                onChange={handleChange}
                placeholder="500000"
              />
            </div>
            <div className="kelas-form-field">
              <label htmlFor="discount">Diskon (%)</label>
              <input
                id="discount"
                name="discount"
                type="number"
                min="0"
                max="100"
                step="1"
                value={form.discount}
                onChange={handleChange}
              />
            </div>
          </div>

          {finalPrice !== null && (
            <p className="kelas-form-final-price">
              Harga akhir:{" "}
              <strong>
                Rp{new Intl.NumberFormat("id-ID").format(finalPrice)}
              </strong>
            </p>
          )}

          <div className="kelas-form-field">
            <span className="kelas-form-label">Gambar Kelas</span>

            {previewSrc && (
              <img
                src={previewSrc}
                alt="Pratinjau gambar kelas"
                className="kelas-form-preview"
              />
            )}

            <div
              className="kelas-form-presets"
              role="group"
              aria-label="Pilih gambar bawaan">
              {PRESET_IMAGES.map((key) => (
                <button
                  type="button"
                  key={key}
                  className={`kelas-form-preset ${!image?.file && image?.key === key ? "selected" : ""}`}
                  aria-label={`Gambar ${key}`}
                  aria-pressed={!image?.file && image?.key === key}
                  onClick={() => setImage({ key })}>
                  <img src={assetUrl(key)} alt="" />
                </button>
              ))}
            </div>

            <label className="kelas-form-upload">
              Atau unggah gambar sendiri
              <input
                type="file"
                accept="image/jpeg,image/png,image/webp"
                onChange={handleFile}
                aria-label="Unggah gambar kelas"
              />
            </label>
            <p className="kelas-form-hint">
              JPG, PNG, atau WEBP, maksimal 2 MB.
            </p>
          </div>

          <p className="kelas-form-info">
            Materi kelas memakai susunan bawaan (4 modul, 16 materi), jadi tidak
            perlu diisi. Kelas baru disimpan sebagai draf dan baru tampil di
            katalog setelah kamu menerbitkannya.
          </p>

          {formError && (
            <p className="kelas-form-error" role="alert">
              {formError}
            </p>
          )}

          <div className="kelas-form-actions">
            <Link to="/dashboard-tutor" className="kelas-form-cancel">
              Batal
            </Link>
            <button
              type="submit"
              className="kelas-form-submit"
              disabled={submitting}>
              {submitting
                ? "Menyimpan..."
                : isEdit
                  ? "Simpan Perubahan"
                  : "Simpan Kelas"}
            </button>
          </div>
        </form>
      </div>

      <Footer />
    </div>
  );
}

export default KelasForm;
