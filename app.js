const express = require('express');
const { CosmosClient } = require('@azure/cosmos');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

const client = new CosmosClient(process.env.COSMOS_CONNECTION_STRING);
const database = client.database('feedback');
const container = database.container('messages');

app.post('/api/feedback', async (req, res) => {
    const { email, message } = req.body;
    try {
        const item = { id: Date.now().toString(), email, message };
        await container.items.create(item);
        console.log(`Feedback enregistré de ${email}`);
        res.json({ success: true, message: 'Feedback enregistré !' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Erreur serveur' });
    }
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Serveur démarré sur le port ${port}`));
