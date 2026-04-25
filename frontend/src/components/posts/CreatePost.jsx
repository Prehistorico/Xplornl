import { useState } from "react";
import CreatePostModal from "./CreatePostModal";
import yunho from "../../assets/images/yunho.png";

const NewPost = ({ onAddPost }) => {

  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="post-container">
        <div className="post-typy" onClick={() => setOpen(true)}>
          <img src={yunho} alt="user" />
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
          onAddPost={onAddPost}
        />
      )}
    </>
  );
};

export default NewPost;