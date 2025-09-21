const Post = require('../models/postModel');

// Listado general (index)
const index = async (req, res) => {
    try {
        const posts = await Post.findAll();
        res.render('index', { posts });
    } catch (err) {
        res.status(500).send('Error al listar posts');
    }
};

// Form nuevo
const newForm = (req, res) => {
    res.render('posts_new');
};

// Crear
const create = async (req, res) => {
    try {
        const title = (req.body.title || '').trim();
        const body = (req.body.body || '').trim();

        if (!title || !body) {
        return res.status(400).send('Título y cuerpo son obligatorios');
        }

        await Post.create(title, body);
        res.redirect('/');
    } catch (err) {
        res.status(500).send('Error al crear post');
    }
};

// Ver uno
const show = async (req, res) => {
    try {
        const id = Number(req.params.id);
        const post = await Post.findById(id);
        if (!post) return res.status(404).send('Post no encontrado');
        res.render('posts_show', { post });
    } catch (err) {
        res.status(500).send('Error al cargar el post');
    }
};

// Form editar
const editForm = async (req, res) => {
    try {
        const id = Number(req.params.id);
        const post = await Post.findById(id);
        if (!post) return res.status(404).send('Post no encontrado');
        res.render('posts_edit', { post });
    } catch (err) {
        res.status(500).send('Error al cargar edición');
    }
};

// Actualizar
const update = async (req, res) => {
    try {
        const id = Number(req.params.id);
        const title = (req.body.title || '').trim();
        const body = (req.body.body || '').trim();

        if (!title || !body) {
        return res.status(400).send('Título y cuerpo son obligatorios');
        }

        const ok = await Post.update(id, title, body);
        if (!ok) return res.status(404).send('No se pudo actualizar (id inválido)');
        res.redirect(`/posts/${id}`);
    } catch (err) {
        res.status(500).send('Error al actualizar post');
    }
};

// Eliminar
const remove = async (req, res) => {
    try {
        const id = Number(req.params.id);
        const ok = await Post.remove(id);
        if (!ok) return res.status(404).send('No se pudo eliminar (id inválido)');
        res.redirect('/');
    } catch (err) {
        res.status(500).send('Error al eliminar post');
    }
};

module.exports = {
  index,
  newForm,
  create,
  show,
  editForm,
  update,
  remove
};
