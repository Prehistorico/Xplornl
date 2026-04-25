const Post = require('../models/Post');
const Comment = require('../models/Comment');

exports.createPost = async (req, res) => {
  try {
    const { title, description, tags } = req.body;

    const post = new Post({
      title,
      description,
      tags,
      user: req.user.id
    });

    await post.save();

    res.status(201).json({
      message: 'Post creado correctamente',
      post
    });

  } catch (error) {
        console.error("CREATE POST ERROR:", error);
        res.status(500).json({
        message: error.message,
        name: error.name
    });
  }
};

exports.getPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate('user', 'username name')
      .populate('tags.place', 'name')
      .populate('tags.category', 'name')
      .sort({ createdAt: -1 });

    const postsWithComments = await Promise.all(
      posts.map(async (post) => {
        const comments = await Comment.find({ post: post._id })
          .populate('user', 'username')
          .sort({ createdAt: -1 });

        return {
          ...post.toObject(),
          comments
        };
      })
    );

    res.json(postsWithComments);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener posts' });
  }
};

exports.getPostById = async (req, res) => {
  try {
    const postId = req.params.id;

    const post = await Post.findById(postId)
      .populate('user', 'username name')
      .populate('tags.place', 'name description')
      .populate('tags.category', 'name');

    if (!post) {
      return res.status(404).json({ message: 'Post no encontrado' });
    }

    const comments = await Comment.find({ post: postId })
      .populate('user', 'username')
      .sort({ createdAt: -1 });

    res.json({
      ...post.toObject(),
      comments
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener el post' });
  }
};

exports.updatePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: 'Post no encontrado' });
    }

    // 🔒 solo dueño o admin
    if (post.user.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'No autorizado' });
    }

    const { title, description, tags, status } = req.body;

    if (title) post.title = title;
    if (description) post.description = description;
    if (tags) post.tags = tags;

    // solo admin puede cambiar status
    if (status && req.user.role === 'admin') {
      post.status = status;
    }

    await post.save();

    res.json({
      message: 'Post actualizado',
      post
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al actualizar post' });
  }
};


exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: 'Post no encontrado' });
    }

    if (post.user.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'No autorizado' });
    }

    await post.deleteOne();

    res.json({ message: 'Post eliminado' });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al eliminar post' });
  }
};

