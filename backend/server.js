const http = require('http');
const express = require('express');
const bodyParser = require('body-parser')
const fs = require('fs');
const cors = require('cors');

const PORT = 5000;
const DATABASE_FILE = "symbols.json";

const app = express();
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
var data = JSON.parse(fs.readFileSync(DATABASE_FILE, 'utf8'));

app.use(cors())

// GET
app.get('/api/', (req, res) => {
    return res.status(200).send(data);
})
app.get('/api/:id', (req, res) => {
    const { id, } = req.params;
    const index = data.findIndex(item => item.id === parseInt(id));
    if (index !== -1) {
        return res.status(200).send(data[index]);
    }
    return res.status(400).send({ error: 'Invalid index.' });
})

// POST
app.post('/api/', (req, res) => {
    const length = Object.keys(data).length
    const id = data[length - 1].id + 1;
    const { server_id, name, description, currency, type, digits, trade, swap_long, swap_short, contract_size } = req.body;
    console.log(`data ${id} added.`);
    data[length] = {
        "id": id,
        "server_id": parseInt(server_id),
        "name": name,
        "description": description,
        "currency": currency,
        "type": parseInt(type),
        "digits": parseInt(digits),
        "trade": parseInt(trade),
        "swap_long": parseFloat(swap_long),
        "swap_short": parseFloat(swap_short),
        "contract_size": parseFloat(contract_size)
    }
    fs.writeFileSync(DATABASE_FILE, JSON.stringify(data));
    return res.status(200).json({});
})


// PUT
app.put('/api/', (req, res) => {
    const { id, server_id, name, description, currency, type, digits, trade, swap_long, swap_short, contract_size } = req.body;
    const index = data.findIndex(item => item.id === parseInt(id));
    if (index === -1) {
        console.log(`data ${id} update failed.`);
        return res.status(400).send({ error: 'Invalid index.' });
    }

    data[index] = {
        "id": id,
        "server_id": parseInt(server_id),
        "name": name,
        "description": description,
        "currency": currency,
        "type": parseInt(type),
        "digits": parseInt(digits),
        "trade": parseInt(trade),
        "swap_long": parseFloat(swap_long),
        "swap_short": parseFloat(swap_short),
        "contract_size": parseFloat(contract_size)
    }
    console.log(`data ${id} updated.`);
    fs.writeFileSync(DATABASE_FILE, JSON.stringify(data));
    return res.status(200).json({});
})

// DELETE
app.delete('/api/:id', (req, res) => {
    const { id, } = req.params;
    const preLength = data.length;
    data = data.filter(item => item.id !== parseInt(id));

    if (preLength !== data.length) {
        fs.writeFileSync(DATABASE_FILE, JSON.stringify(data));
        console.log(`data ${id} deleted.`);
        return res.status(200).json({});
    }
    console.log(`data ${id} delete failed.`);
    return res.status(400).send({ error: 'Invalid index.' });
})



const server = app.listen(PORT, () => {
    console.log(`Backend is now listening on PORT ${PORT}.`);
})

