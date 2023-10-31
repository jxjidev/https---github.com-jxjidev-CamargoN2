const express = require('express');
const Pet = require('./model');

const app = express();
app.use(express.json());

router.get('/pets', (req, res) => {
  Pet.findAll()
    .then(pets => res.json(pets))
    .catch(err => res.status(500).json({ error: "Erro" }));
});

router.get('/pets/genero/:genero', (req, res) => {
  const genero = req.params.genero;

  Pet.findAll({ where: { genero_pet: genero } })
    .then(pets => res.json(pets))
    .catch(err => res.status(500).json({ error: "Erro" }));
});

router.post('/pets', (req, res) => {
  const { nome_pet, genero_pet } = req.body;

  Pet.create({ nome_pet, genero_pet })
    .then(pet => res.json(pet))
    .catch(err => res.status(500).json({ error: err.message }));
});

router.put('/pets/:codigo_pet', (req, res) => {
  const codigo_pet = req.params.codigo_pet;
  const { nome_pet, genero_pet } = req.body;

  Pet.findByPk(codigo_pet)
    .then(pet => {
      if (!pet) {
        return res.status(404).json({ error: 'Animal não encontrado' });
      }

      pet.nome_pet = nome_pet;
      pet.genero_pet = genero_pet;

      return pet.save();
    })
    .then(pet => res.json(pet))
    .catch(err => res.status(500).json({ error: err.message }));
});

router.delete('/pets/:codigo_pet', (req, res) => {
  const codigo_pet = req.params.codigo_pet;

  Pet.findByPk(codigo_pet)
    .then(pet => {
      if (!pet) {
        return res.status(404).json({ error: 'Animal não encontrado' });
      }

      return pet.destroy();
    })
    .then(() => res.json({ message: 'Animal excluído com sucesso' }))
    .catch(err => res.status(500).json({ error: err.message }));
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});