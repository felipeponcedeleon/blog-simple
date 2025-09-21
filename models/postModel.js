const db = require('../config/db');

// Todas las consultas usan ? con arrays en los parámetros.
const findAll = async () => {
    const [rows] = await db.query(
        'SELECT id, title, body, created_at FROM posts ORDER BY created_at DESC',
        []
    );
    return rows;
}

const findById = async (id) => {
    const [rows] = await db.query(
        'SELECT id, title, body, created_at FROM posts WHERE id = ? LIMIT 1',
        [id]
    );
    return rows[0] || null;
}

const create = async (title, body) => {
    const [result] = await db.query(
        'INSERT INTO posts (title, body) VALUES (?, ?)',
        [title, body]
    );
    return result.insertId;
}

const update = async (id, title, body) => {
    const [result] = await db.query(
        'UPDATE posts SET title = ?, body = ? WHERE id = ?',
        [title, body, id]
    );
    return result.affectedRows === 1;
}

const remove = async (id) => {
    const [result] = await db.query(
        'DELETE FROM posts WHERE id = ?',
        [id]
    );
    return result.affectedRows === 1;
}

module.exports = {
    findAll,
    findById,
    create,
    update,
    remove
};
