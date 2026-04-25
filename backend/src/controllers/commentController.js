const Comment = require('../models/Comment');

exports.createComment = async (req, res) => {
  try {
    const { post, description } = req.body;

    if (!post || !description) {
      return res.status(400).json({
        message: 'Post y descripción son obligatorios'
      });
    }

    const comment = new Comment({
      post,
      description,
      user: req.user.id
    });

    await comment.save();

    res.status(201).json({
      message: 'Comentario creado',
      comment
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al crear comentario' });
  }
};


exports.getComments = async (req, res) => {
  try {
    const comments = await Comment.find()
      .populate('user', 'username')
      .populate('post', 'title')
      .sort({ createdAt: -1 });

    res.json(comments);

  } catch (error) {
    res.status(500).json({ message: 'Error al obtener comentarios' });
  }
};

exports.getCommentsByPost = async (req, res) => {
  try {
    const comments = await Comment.find({ post: req.params.postId })
      .populate('user', 'username')
      .sort({ createdAt: -1 });

    res.json(comments);

  } catch (error) {
    res.status(500).json({ message: 'Error al obtener comentarios del post' });
  }
};

exports.getCommentById = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id)
      .populate('user', 'username')
      .populate('post', 'title');

    if (!comment) {
      return res.status(404).json({ message: 'Comentario no encontrado' });
    }

    res.json(comment);

  } catch (error) {
    res.status(500).json({ message: 'Error al obtener comentario' });
  }
};

exports.updateComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);

    if (!comment) {
      return res.status(404).json({ message: 'Comentario no encontrado' });
    }

    // 🔒 solo dueño o admin
    if (comment.user.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'No autorizado' });
    }

    const { description, status } = req.body;

    if (description) comment.description = description;

    // solo admin puede aprobar/rechazar
    if (status && req.user.role === 'admin') {
      comment.status = status;
    }

    await comment.save();

    res.json({
      message: 'Comentario actualizado',
      comment
    });

  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar comentario' });
  }
};

exports.deleteComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);

    if (!comment) {
      return res.status(404).json({ message: 'Comentario no encontrado' });
    }

    // 🔒 solo dueño o admin
    if (comment.user.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'No autorizado' });
    }

    await comment.deleteOne();

    res.json({ message: 'Comentario eliminado' });

  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar comentario' });
  }
};