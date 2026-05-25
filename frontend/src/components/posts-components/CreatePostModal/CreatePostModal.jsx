import "./postModal.css";
import { useState, useEffect } from "react";
import { createPost } from "../../../services/postService";

const API_BASE = 'http://localhost:5000/api';
const getToken = () => localStorage.getItem('token');

const CreatePostModal = ({ onClose, onPostCreated }) => {
  const [form, setForm] = useState({
    title: "", description: "", place: "", category: ""
  });
  const [images,     setImages]     = useState([]);
  const [places,     setPlaces]     = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading,    setLoading]    = useState(false);
  const [error,      setError]      = useState('');

  useEffect(() => {
    const fetchSelects = async () => {
      try {
        const [pRes, cRes] = await Promise.all([
          fetch(`${API_BASE}/places`,     { headers: { Authorization: `Bearer ${getToken()}` } }),
          fetch(`${API_BASE}/categories`, { headers: { Authorization: `Bearer ${getToken()}` } }),
        ]);
        const pData = await pRes.json();
        const cData = await cRes.json();
        setPlaces(Array.isArray(pData) ? pData : pData.places || []);
        setCategories(Array.isArray(cData) ? cData : cData.categories || []);
      } catch {}
    };
    fetchSelects();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    setError('');
  };

  const handleImages = (e) => {
    setImages(Array.from(e.target.files).slice(0, 3));
  };

  const handleSubmit = async () => {
    if (!form.title || !form.description) { setError('El título y la descripción son obligatorios.'); return; }
    if (!form.place)    { setError('Selecciona un lugar.'); return; }
    if (!form.category) { setError('Selecciona una categoría.'); return; }

    const formData = new FormData();
    formData.append('title',       form.title);
    formData.append('description', form.description);
    formData.append('place',       form.place);
    formData.append('category',    form.category);
    images.forEach(img => formData.append('images', img));

    try {
      setLoading(true);
      await createPost(formData);
      onPostCreated();
      onClose();
    } catch (err) {
      setError(err.message || 'Error al publicar.');
    } finally {
      setLoading(false);
    }
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
          <input type="text" name="title" maxLength={50} value={form.title} onChange={handleChange} />
        </div>

        <div className="input-group">
          <label>Tags</label>
          <div className="tag-selects">
            <select name="place" value={form.place} onChange={handleChange}>
              <option value="">Lugar</option>
              {places.map(p => <option key={p._id} value={p._id}>{p.name}</option>)}
            </select>
            <select name="category" value={form.category} onChange={handleChange}>
              <option value="">Categoría</option>
              {categories.map(c => <option key={c._id} value={c._id}>{c.name}</option>)}
            </select>
          </div>
        </div>

        <div className="input-group">
          <label>Multimedia</label>
          <button type="button" className="add-media-btn" onClick={() => document.getElementById('fileInput').click()}>
            Agregar foto/video
          </button>
          <input id="fileInput" type="file" accept="image/jpeg,image/png,image/webp" multiple style={{ display: 'none' }} onChange={handleImages} />
          <small>El límite de fotos es 3</small>
          <div className="multimedia-preview">
            {images.map((file, i) => (
              <img key={i} src={URL.createObjectURL(file)} alt={`preview-${i}`} />
            ))}
          </div>
        </div>

        <div className="input-group">
          <label>Descripción</label>
          <input type="text" name="description" maxLength={500} value={form.description} onChange={handleChange} />
        </div>

        {error && <p style={{ color: '#ff6b6b', fontSize: '0.85rem', margin: '0 0 8px' }}>{error}</p>}

        <div className="modal-footer">
          <button onClick={handleSubmit} disabled={loading}>
            {loading ? 'Publicando...' : 'Publicar'}
          </button>
        </div>

      </div>
    </div>
  );
};

export default CreatePostModal;