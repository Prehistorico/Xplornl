const AVATAR_COLORS = ["#E8A87C", "#85C1E9", "#A9DFBF", "#F1948A"];

export default function UserAvatar({ user, size = 40 }) {
  const username = user?.username || 'US';
  const initials = username.slice(0, 2).toUpperCase();
  const color = AVATAR_COLORS[(username.charCodeAt(0) || 0) % AVATAR_COLORS.length];
  const avatarUrl = user?.avatar
    ? `http://localhost:5000${user.avatar}`
    : null;

  const style = {
    width: size,
    height: size,
    borderRadius: '50%',
    flexShrink: 0,
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: avatarUrl ? 'transparent' : color,
    fontWeight: 700,
    fontSize: size * 0.35,
    color: '#2b1a0e',
  };

  return (
    <div style={style}>
      {avatarUrl
        ? <img src={avatarUrl} alt={username} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        : initials
      }
    </div>
  );
}