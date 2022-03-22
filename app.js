const express = require('express');
const mongoose = require('mongoose');
const app = express()
app.use(express.json());
const port = 3000
// Connection 
mongoose.connect('mongodb://localhost:27017/testApi', {

    useNewUrlParser: true
}).then(function () {
    console.log("Connection connected Successfully");
}).catch(function () {
    console.log("Connection Fail");
})



//Schema
const StudentSchema = new mongoose.Schema({
    firstName: {
        type: String,
        // required:true
    },
    lastName:{
        type:String,
        // require:true
    },
    age:{
        type:Number,
        // required:true
    },
    rollNo:{
        type:String,
        // required:true
    }
    

});
//Model
const testApi = mongoose.model('testApi', StudentSchema);


//get method
app.get('/', async (req,res)=>{
    try{
    const Students = await testApi.find({});
        res.json(Students);
    }
    catch(error){
        console.log(error);
    }
    // console.log(Students);
})

//get method for id
app.get('/:id', async (req,res)=>{
    try{
    const Student = await testApi.findById(req.params.id);
        res.json(Student);
    }
    catch(error){
        console.log(error);
    }
    // console.log(Students);
})

// Post method
app.post('/', async(req,res)=>{

    const list = new testApi ({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        age: req.body.age,
        rollNo: req.body.rollNo
    })

    try{
        const a1 = await list.save();
        res.json(a1);
    }
    catch(error){
        console.log(error)
    }
})

//path for update
app.patch('/:id', async(req,res)=>{
    try{
    const Student = await testApi.findById(req.params.id);
        Student.age = req.body.age;
        const a1 = await Student.save();
        res.json(a1);

    }
    catch(error){
        console.log(error);
    }
})

// Delete
app.delete('/:id', async(req,res)=>{
    try{
    const Student = await testApi.findById(req.params.id);
        // Student.age = req.body.age;
        const a1 = await Student.remove();
        res.json(a1);

    }
    catch(error){
        console.log(error);
    }
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})