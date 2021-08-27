var express = require('express');
var router = express.Router();
const ObjectId = require('mongodb').ObjectId;

router.get('/appointments', (req, res, next) => {
  req.collection.find({})
    .toArray()
    .then(results => res.json(results))
    .catch(error => res.send(error));
});

router.post('/appointments', (req, res, next) => {
  const { appointmentDate, name, email, hour } = req.body;
  if (!appointmentDate || !name || !email) {
    return res.status(400).json({
      message: 'Es necesario diligenciar todos los campos para la cita',
    });
  }

  const payload = { appointmentDate, name, email, hour };
  req.collection.insertOne(payload)
    .then(result => res.json(payload))
    .catch(error => res.send(error));
});

router.delete('/appointments/:id', (req, res, next) => {
  const { id } = req.params;
  const _id = ObjectId(id)
  req.collection.deleteOne({ _id })
    .then(result => res.json(result))
    .catch(error => res.send(error));
});

module.exports = router;