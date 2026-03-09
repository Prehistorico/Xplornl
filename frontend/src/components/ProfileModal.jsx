import "../styles/profileModal.css"

export default function ProfileModal({ open, onClose }) {

if (!open) return null

return (

<div className="profile-overlay" onClick={onClose}>

<div
className="profile-modal"
onClick={(e)=>e.stopPropagation()}
>

{/* USER IMAGE */}

<div className="profile-header">

<img
src="/images/user.jpg"
className="profile-avatar"
/>

<h2 className="profile-name">
Usuario ✎
</h2>

<p className="profile-role">
Explorador
</p>

</div>


{/* PASSWORD */}

<div className="profile-section">

<label>Contraseña</label>

<input
type="password"
className="profile-input"
/>

<label>Confirmar contraseña</label>

<input
type="password"
className="profile-input"
/>

</div>


{/* BADGES */}

<div className="profile-section">

<h3>Insignia</h3>

<div className="badge-grid">

<img src="/images/badge1.png" />
<img src="/images/badge2.png" />
<img src="/images/badge3.png" />
<img src="/images/badge4.png" />

</div>

</div>


<button className="logout-btn">
Cerrar sesión
</button>

</div>

</div>

)

}