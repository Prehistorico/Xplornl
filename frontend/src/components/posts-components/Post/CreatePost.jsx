import { useState } from "react";
import CreatePostModal from "../CreatePostModal/CreatePostModal";
import UserAvatar from "../../Shared/EditProfileModal/UserAvatar";

const storedUser = () => JSON.parse(localStorage.getItem('user') || '{}');

const NewPost = ({ onPostCreated }) => {
  const [open, setOpen] = useState(false);
  const user = storedUser();
  const initials = (user.username || 'US').slice(0, 2).toUpperCase();

  const currentUser = JSON.parse(
    localStorage.getItem("user") || "{}"
  );

  const currentUserId =
    currentUser.id || currentUser._id;


  return (
    <>
      <div className="post-container">
        <div className="post-typy" onClick={() => setOpen(true)}>
          <UserAvatar user={currentUser} size={35} />
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
