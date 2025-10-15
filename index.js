const express = require('express')
const app = express();
const users = require('./MOCK_DATA.json')
const PORT = 8000;
app.use(express.json());


app.get("/api/users", (req, res) => {
    return res.json(users)
});

app.get('/api/users/:id', (req, res) => {
    const id = Number(req.params.id);
    const user = users.find(u => u.id === id);

    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
});

app.delete('/api/users/:id', (req, res) => {
    const id = Number(req.params.id);
    const index = users.findIndex(u => u.id === id);

    if (index === -1) return res.status(404).json({ message: 'User not found' });
    users.splice(index, 1);
    res.json({ message: `User ${id} deleted` });
});

app.post('/api/users', (req, res) => {
    const newUser = {
        id: users.length ? users[users.length - 1].id + 1 : 1,
        ...req.body
    };

    users.push(newUser);

    res.status(201).json({
        message: 'User created',
        user: newUser
    });
});


app.put('/api/users/:id', (req, res) => {
    const id = Number(req.params.id);
    const index = users.findIndex(u => u.id === id);
    if (index === -1) {
        return res.status(404).json({ message: 'User not found' });
    }
    users[index] = { id, ...req.body };
    res.json({ message: 'User replaced', user: users[index] });
});


app.listen(8000, () => {
    console.log("Server staterd")
});