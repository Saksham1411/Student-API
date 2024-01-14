const express = require('express');
const { getAll,
    getSingleStudent,
    addStudent,
    updateStudent,
    deleteStudent } = require('../controllers/Students');

const router = express.Router();

router.route('/students').get(getAll).post(addStudent);
router.route('/students/:id').get(getSingleStudent).put(updateStudent).delete(deleteStudent);

module.exports = router;