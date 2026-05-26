const express = require('express');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.post('/api/feedback', (req, res) => {
    const { email, message } = req.body;
    console.log(`Feedback reçu de ${email}: ${message}`);
    res.json({ success: true, message: 'Feedback enregistré !' });
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Serveur démarré sur le port ${port}`));
