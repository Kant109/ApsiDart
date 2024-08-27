const express = require('express');
const { db } = require('./firebaseConfig');
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Exemple de route pour ajouter des données à Firestore
app.post('/add', async (req, res) => {
  try {
    const docRef = db.collection('users').doc(req.body.id);
    await docRef.set({
      name: req.body.name,
      email: req.body.email,
    });
    res.status(200).send('Document successfully written!');
  } catch (error) {
    res.status(400).send('Error writing document: ', error);
  }
});

// Exemple de route pour récupérer des données depuis Firestore
app.get('/get/:id', async (req, res) => {
  const docRef = db.collection('users').doc(req.params.id);
  const doc = await docRef.get();

  if (!doc.exists) {
    res.status(404).send('No such document!');
  } else {
    res.status(200).send(doc.data());
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
