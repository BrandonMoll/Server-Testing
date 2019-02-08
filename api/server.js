const express = require('express');
const players = require('../players/playersModel');

const server = express();

server.use(express.json());

server.post('/', async (req, res) => {
    const playerData = req.body;
    if(playerData.name) {
        const id = await players.insert(playerData);
        res.status(201).json(id);
    } else {
        res.status(400).json({message: 'missing name'})
    }
})

server.delete('/:id', async (req, res) => {
    const {id} = req.params;
    if(id) {
        await players.remove(id);
        res.status(202).json({message: 'delete successful'})
    } else {
        res.status(400).json({message: 'that ID does not exist'})
    }
})

module.exports = server;