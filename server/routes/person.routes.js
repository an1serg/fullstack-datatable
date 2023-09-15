const express = require('express');
const router = express.Router();
const personController = require('../controllers/person.controller');

router.post('/persons', personController.createPerson);
router.get('/persons', personController.getPersons);
router.get('/persons/:id', personController.getOnePerson);
router.put('/persons', personController.updatePerson);
router.delete('/persons/:id', personController.deletePerson);

module.exports = router;
