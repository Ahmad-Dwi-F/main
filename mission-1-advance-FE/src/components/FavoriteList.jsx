import { useState } from "react";
import "./FavoriteList.css";

function FavoriteItem({ favorite, onUpdateNote, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [draftNote, setDraftNote] = useState(favorite.note);

  const handleSave = () => {
    onUpdateNote(favorite.id, draftNote);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setDraftNote(favorite.note);
    setIsEditing(false);
  };

  const formattedPrice = new Intl.NumberFormat("id-ID").format(
    favorite.price
  );

  return (
    <div className="favorite-item">
      <img
        src={favorite.image}
        alt={favorite.title}
        className="favorite-item-image"
      />
      <div className="favorite-item-content">
        <p className="favorite-item-title">{favorite.title}</p>
        <p className="favorite-item-price">Rp{formattedPrice}</p>

        {isEditing ? (
          <div className="favorite-item-edit">
            <input
              type="text"
              className="favorite-item-input"
              placeholder="Tulis catatan pribadi..."
              value={draftNote}
              onChange={(e) => setDraftNote(e.target.value)}
            />
            <div className="favorite-item-edit-actions">
              <button
                type="button"
                className="favorite-item-btn save"
                onClick={handleSave}>
                Simpan
              </button>
              <button
                type="button"
                className="favorite-item-btn cancel"
                onClick={handleCancel}>
                Batal
              </button>
            </div>
          </div>
        ) : (
          <div className="favorite-item-note-row">
            <p className="favorite-item-note">
              {favorite.note ? favorite.note : "Belum ada catatan"}
            </p>
            <div className="favorite-item-actions">
              <button
                type="button"
                className="favorite-item-btn edit"
                onClick={() => setIsEditing(true)}>
                Edit
              </button>
              <button
                type="button"
                className="favorite-item-btn delete"
                onClick={() => onDelete(favorite.id)}>
                Hapus
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function FavoriteList({ favorites, onUpdateNote, onDelete }) {
  return (
    <section className="favorite-list">
      <h2 className="favorite-list-title">Kelas Favorit Saya</h2>
      <p className="favorite-list-subtitle">
        Kelas yang kamu simpan untuk dipelajari nanti
      </p>

      {favorites.length === 0 ? (
        <p className="favorite-list-empty">
          Belum ada kelas favorit. Klik ikon ♡ di kelas yang kamu suka!
        </p>
      ) : (
        <div className="favorite-list-items">
          {favorites.map((favorite) => (
            <FavoriteItem
              key={favorite.id}
              favorite={favorite}
              onUpdateNote={onUpdateNote}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
    </section>
  );
}

export default FavoriteList;
