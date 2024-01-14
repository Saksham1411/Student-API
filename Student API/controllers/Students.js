const Students = require('../models/Students');

const getAll = async (req, res) => {
    const Student = await Students.find({});
    res.send(Student);
}

const getSingleStudent = async (req, res) => {
    const { id } = req.params;
    const singleStudent = await Students.findOne({ rollno: id });
    if (!singleStudent) {
        return res.status(401).send("student not found");
    }
    res.send(singleStudent);
}

const addStudent = async (req, res) => {
    const data = req.body;
    if (!data.name || !data.rollno) {
        res.status(401).send("invalid data");
        return;
    }
    console.log(data);
    try{
        await Students.create({ ...data });
        res.status(201).send('Student added');
    }catch(err){
        res.status(401).send(err);
    }
}

const updateStudent = async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    const student = await Students.findOneAndUpdate({rollno:id},{name:name});
    if(!student){
        return res.send("student not found");
    }
    res.send("data Updated");
}

const deleteStudent = async (req, res) => {
    const { id } = req.params;
    await Students.deleteOne({rollno:id});
    res.send('delete successfully');
}

module.exports = {
    getAll,
    getSingleStudent,
    addStudent,
    updateStudent,
    deleteStudent
}