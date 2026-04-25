import "../../styles/postModal.css"
import { useState } from "react";

const CreatePostModal = ({ onClose, onAddPost }) => {

  const [form, setForm] = useState({
    title: "",
    description: "",
    place: "",
    category: "",
    images: []
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = () => {
    if (!form.title || !form.description) return;

    const newPost = {
      id: Date.now(),
      name: "Usuario",
      time: "Ahora",
      title: form.title,
      description: form.description,
      place: form.place,
      category: form.category,
      likes: 0,
      comments: 0,
      image: form.images[0] || null
    };

    onAddPost(newPost);
    onClose();
  };

  return (
    <div className="modal-overlay">

      <div className="modal">

        <div className="modal-header">
            <div className="header-titles">
                <span className="title">Crear Publicación</span>
                <span className="description">Comparte con otros usuarios tus aventuras</span>
            </div>
            <span className="close-btn" onClick={onClose}>✕</span>
        </div>

        <div className="input-group">
          <label>Título</label>
          <input
            type="text"
            name="title"
            maxLength={50}
            value={form.title}
            onChange={handleChange}
          />
        </div>

        <div className="input-group">
          <label>Tags</label>

          <div className="tag-selects">
            <select name="place" onChange={handleChange}>
              <option value="">Lugar</option>
              <option value="Chipinque">Chipinque</option>
              <option value="Fundidora">Fundidora</option>
            </select>

            <select name="category" onChange={handleChange}>
              <option value="">Categoría</option>
              <option value="Parque ecológico">Parque ecológico</option>
              <option value="Museo">Museo</option>
            </select>
          </div>
        </div>

        <div className="input-group">
            <label>Multimedia</label>

            <button
                type="button"
                className="add-media-btn"
                onClick={() => document.getElementById("fileInput").click()}
            >
                Agregar foto/video
            </button>

            <input
                id="fileInput"
                type="file"
                multiple
                style={{ display: "none" }}
                onChange={(e) =>
                setForm({ ...form, images: Array.from(e.target.files).slice(0, 3) })
                }
            />

            <small>El límite de fotos es 3</small>

            <div className="multimedia-preview">
                {form.images.map((file, index) => (
                <img
                    key={index}
                    src={URL.createObjectURL(file)}
                    alt={`preview-${index}`}
                />
                ))}
            </div>
        </div>

        <div className="input-group">
          <label>Descripción</label>
          <input
            type="text"
            name="description"
            maxLength={500}
            value={form.description}
            onChange={handleChange}
          />
        </div>

        <div className="modal-footer">
          <button onClick={handleSubmit}>Publicar</button>
        </div>

      </div>
    </div>
  );
};

export default CreatePostModal;