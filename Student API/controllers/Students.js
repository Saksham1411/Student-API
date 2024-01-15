const Students = require('../models/Students');
const { StatusCodes } = require('http-status-codes');


const getAll = async (req, res) => {
    const Student = await Students.find({});
    res.status(StatusCodes.OK).send(Student);
}

const getSingleStudent = async (req, res) => {
    const { id } = req.params;
    const singleStudent = await Students.findOne({ rollno: id });
    if (!singleStudent) {
        return res.status(StatusCodes.OK).send("student not found");
    }
    res.send(singleStudent);
}

const addStudent = async (req, res) => {
    const data = req.body;
    if (!data.name || !data.rollno) {
        res.status(StatusCodes.BAD_REQUEST).send("invalid data");
        return;
    }
    console.log(data);
    try{
        await Students.create({ ...data });
        res.status(StatusCodes.CREATED).send('Student added');
    }catch(err){
        res.status(StatusCodes.BAD_REQUEST).send(err);
    }
}

const updateStudent = async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    const student = await Students.findOneAndUpdate({rollno:id},{name:name});
    if(!student){
        return res.status(StatusCodes.BAD_REQUEST).send("student not found");
    }
    res.status(StatusCodes.CREATED).send("data Updated");
}

const deleteStudent = async (req, res) => {
    const { id } = req.params;
    await Students.deleteOne({rollno:id});
    res.status(StatusCodes.OK).send('delete successfully');
}

module.exports = {
    getAll,
    getSingleStudent,
    addStudent,
    updateStudent,
    deleteStudent
}