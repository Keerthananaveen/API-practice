const express = require('express');
const router = express.Router();
const users = require('./MOCK_DATA.json');

router.get('/', (req, res) => {
    res.json(users);
});

router.get('/:id', (req, res) => {
    const id = Number(req.params.id);
    const user = users.find(u => u.id === id);

    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
});

router.post('/', (req, res) => {
    const newUser = {
        id: users.length ? users[users.length - 1].id + 1 : 1,
        ...req.body
    };
    users.push(newUser);
    res.status(201).json({ message: 'User created', user: newUser });
});

router.put('/:id', (req, res) => {
    const id = Number(req.params.id);
    const index = users.findIndex(u => u.id === id);
    if (index === -1) return res.status(404).json({ message: 'User not found' });

    users[index] = { id, ...req.body };
    res.json({ message: 'User updated', user: users[index] });
});

router.delete('/:id', (req, res) => {
    const id = Number(req.params.id);
    const index = users.findIndex(u => u.id === id);

    if (index === -1) return res.status(404).json({ message: 'User not found' });
    users.splice(index, 1);
    res.json({ message: `User ${id} deleted` });
});

module.exports = router;