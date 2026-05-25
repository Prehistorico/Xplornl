import { useState } from "react";
import CreatePostModal from "../CreatePostModal/CreatePostModal";

const storedUser = () => JSON.parse(localStorage.getItem('user') || '{}');

const NewPost = ({ onPostCreated }) => {
  const [open, setOpen] = useState(false);
  const user = storedUser();
  const initials = (user.username || 'US').slice(0, 2).toUpperCase();

  return (
    <>
      <div className="post-container">
        <div className="post-typy" onClick={() => setOpen(true)}>
          <div style={{ width:40, height:40, borderRadius:'50%', background:'#E8A87C', display:'flex', alignItems:'center', justifyContent:'center', fontWeight:700, fontSize:'0.9rem', color:'#2b1a0e', flexShrink:0 }}>
            {initials}
          </div>
          <input
            type="text"
            placeholder="Cuéntanos sobre tu última aventura..."
            readOnly
          />
        </div>
      </div>

      {open && (
        <CreatePostModal
          onClose={() => setOpen(false)}
          onPostCreated={() => { onPostCreated && onPostCreated(); setOpen(false); }}
        />
      )}
    </>
  );
};

export default NewPost;
