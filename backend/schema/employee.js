const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
    name: String,
    designation: String,
    department: String,
    dateOfJoining:String,
    address:String
});

const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;
