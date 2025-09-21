const express = require('express');
const router = express.Router();
const { index, newForm, create, show, editForm, update, remove } = require('../controllers/postController');

// Index
router.get('/', index);

// Crear
router.get('/posts/new', newForm);
router.post('/posts', create);

// Ver
router.get('/posts/:id', show);

// Editar
router.get('/posts/edit/:id', editForm);
router.post('/posts/update/:id', update);

// Eliminar
router.post('/posts/delete/:id', remove);

module.exports = router;
