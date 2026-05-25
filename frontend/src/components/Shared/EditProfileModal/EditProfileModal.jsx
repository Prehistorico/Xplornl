import { useState, useEffect } from 'react';
import { updateUser } from '../../../services/userService';
import './editProfileModal.css';

const MONTHS = [
  'Enero','Febrero','Marzo','Abril','Mayo','Junio',
  'Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'
];

function parseBirthdate(dateStr) {
  if (!dateStr) return { month: '', day: '', year: '' };
  const d = new Date(dateStr);
  return {
    month: String(d.getUTCMonth() + 1),
    day:   String(d.getUTCDate()),
    year:  String(d.getUTCFullYear()),
  };
}

export default function EditProfileModal({ isOpen, onClose }) {
  const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
  const birth = parseBirthdate(storedUser.birthdate);

  const [form, setForm] = useState({
    name:            storedUser.name     || '',
    username:        storedUser.username || '',
    email:           storedUser.email    || '',
    birthMonth:      birth.month,
    birthDay:        birth.day,
    birthYear:       birth.year,
    password:        '',
    confirmPassword: '',
  });

  const [loading,  setLoading]  = useState(false);
  const [success,  setSuccess]  = useState('');
  const [error,    setError]    = useState('');

  useEffect(() => {
    if (isOpen) { setSuccess(''); setError(''); }
  }, [isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    setError(''); setSuccess('');
  };

  const buildBirthdate = () => {
    const { birthMonth, birthDay, birthYear } = form;
    if (!birthMonth || !birthDay || !birthYear) return undefined;
    return `${birthYear}-${birthMonth.padStart(2,'0')}-${birthDay.padStart(2,'0')}`;
  };

  const handleSave = async () => {
    setError(''); setSuccess('');
    const userId = storedUser.id || storedUser._id;
    if (!userId) { setError('No se encontró tu sesión. Vuelve a iniciar sesión.'); return; }

    const payload = {};
    if (form.name     !== (storedUser.name     || '')) payload.name     = form.name;
    if (form.username !== (storedUser.username || '')) payload.username = form.username;
    if (form.email    !== (storedUser.email    || '')) payload.email    = form.email;

    const birthdate = buildBirthdate();
    const origBirth = parseBirthdate(storedUser.birthdate);
    const origStr = origBirth.year
      ? `${origBirth.year}-${origBirth.month.padStart(2,'0')}-${origBirth.day.padStart(2,'0')}`
      : '';
    if (birthdate && birthdate !== origStr) payload.birthdate = birthdate;

    if (form.password) {
      payload.password        = form.password;
      payload.confirmPassword = form.confirmPassword;
    }

    if (Object.keys(payload).length === 0) { setError('No realizaste ningún cambio.'); return; }

    try {
      setLoading(true);
      const data = await updateUser(userId, payload);
      localStorage.setItem('user', JSON.stringify({ ...storedUser, ...data.user }));
      setSuccess(
        form.email !== storedUser.email
          ? 'Cambios guardados. Revisa tu nuevo correo para verificarlo.'
          : 'Cambios guardados correctamente.'
      );
      setForm(prev => ({ ...prev, password: '', confirmPassword: '' }));
    } catch (err) {
      setError(err.message || 'Error al guardar los cambios.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/';
  };

  const handleDeleteAccount = async () => {
    if (!window.confirm('¿Eliminar tu cuenta? Esta acción no se puede deshacer.')) return;
    const userId = storedUser.id || storedUser._id;
    try {
      const res = await fetch(`http://localhost:5000/api/users/${userId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      if (!res.ok) throw new Error('Error al eliminar la cuenta.');
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/';
    } catch (err) {
      setError(err.message);
    }
  };

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - 1900 + 1 }, (_, i) => currentYear - i);
  const days  = Array.from({ length: 31 }, (_, i) => i + 1);

  return (
    <>
      <div className={`ep-backdrop ${isOpen ? 'ep-backdrop--visible' : ''}`} onClick={onClose} />

      <aside className={`ep-panel ${isOpen ? 'ep-panel--open' : ''}`}>
        <button className="ep-close" onClick={onClose} aria-label="Cerrar">✕</button>

        {/* Avatar */}
        <div className="ep-avatar-wrap">
          <div className="ep-avatar-ring">
            <img
              src={storedUser.avatar || '/user_icon.png'}
              alt="Foto de perfil"
              className="ep-avatar-img"
            />
          </div>
          <button className="ep-avatar-edit">Editar foto de perfil</button>
        </div>

        <h2 className="ep-display-name">{storedUser.name || 'Tu nombre'}</h2>
        <p className="ep-display-username">@{storedUser.username || 'usuario'}</p>

        <section className="ep-form">
          <h3 className="ep-section-title">Editar Datos</h3>

          <div className="ep-field">
            <label className="ep-label">Nombre</label>
            <input className="ep-input" name="name" value={form.name} onChange={handleChange} placeholder="Tu nombre" />
          </div>

          <div className="ep-field">
            <label className="ep-label">Usuario</label>
            <input className="ep-input" name="username" value={form.username} onChange={handleChange} placeholder="Tu username" />
          </div>

          <div className="ep-field">
            <label className="ep-label">Correo electrónico</label>
            <input className="ep-input" name="email" type="email" value={form.email} onChange={handleChange} placeholder="correo@ejemplo.com" />
          </div>

          <div className="ep-field">
            <label className="ep-label">Fecha de Nacimiento</label>
            <div className="ep-date-row">
              <select className="ep-select" name="birthMonth" value={form.birthMonth} onChange={handleChange}>
                <option value="">Mes</option>
                {MONTHS.map((m, i) => <option key={m} value={String(i+1)}>{m}</option>)}
              </select>
              <select className="ep-select ep-select--day" name="birthDay" value={form.birthDay} onChange={handleChange}>
                <option value="">Día</option>
                {days.map(d => <option key={d} value={String(d)}>{String(d).padStart(2,'0')}</option>)}
              </select>
              <select className="ep-select ep-select--year" name="birthYear" value={form.birthYear} onChange={handleChange}>
                <option value="">Año</option>
                {years.map(y => <option key={y} value={String(y)}>{y}</option>)}
              </select>
            </div>
          </div>

          <div className="ep-field">
            <label className="ep-label">Contraseña</label>
            <input className="ep-input" name="password" type="password" value={form.password} onChange={handleChange} placeholder="Nueva contraseña" autoComplete="new-password" />
          </div>

          <div className="ep-field">
            <label className="ep-label">Confirmar Contraseña</label>
            <input className="ep-input" name="confirmPassword" type="password" value={form.confirmPassword} onChange={handleChange} placeholder="Confirmar nueva contraseña" autoComplete="new-password" />
          </div>

          {error   && <p className="ep-msg ep-msg--error">{error}</p>}
          {success && <p className="ep-msg ep-msg--success">{success}</p>}

          <div className="ep-actions">
            <button className="ep-btn ep-btn--outline" onClick={onClose} disabled={loading}>Cancelar</button>
            <button className="ep-btn ep-btn--outline" onClick={handleSave} disabled={loading}>
              {loading ? 'Guardando...' : 'Guardar cambios'}
            </button>
          </div>
        </section>

        <button className="ep-btn ep-btn--logout" onClick={handleLogout}>Cerrar sesión</button>

        <div className="ep-danger-zone">
          <hr className="ep-divider" />
          <h4 className="ep-danger-title">Eliminar Cuenta</h4>
          <p className="ep-danger-desc">Una vez que elimine su cuenta, no habrá vuelta atrás.</p>
          <button className="ep-btn ep-btn--delete" onClick={handleDeleteAccount}>Eliminar cuenta</button>
        </div>
      </aside>
    </>
  );
}
