const express = require('express')
const app = express()
const dotenv = require('dotenv')
dotenv.config()
const path = require('path')
const athModel = require('./models/athletes')

const port = process.env.PORT || 4000

//todo Middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')))
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

//* Routes

app.get('/', (req, res) => {
    res.render('index')
})

//?  CRUD Operations

app.post('/create', async (req, res)=>{
    const {name, age, email} = req.body
    const createAthlete = await athModel.create({
        name,
        age,
        email 
    })
    res.redirect('/read')
})

app.get('/read', async (req, res)=>{
   
    const readAthlete = await athModel.find()
    res.render('list', {athletes: readAthlete})
})

// updation 

app.get('/edit/:id', async (req, res) => {
  try {
    const athlete = await athModel.findById(req.params.id);
    res.render('edit', { athlete });
  } catch (err) {
    res.status(500).send("Error loading update form");
  }
});

app.post('/update/:id', async (req, res) => {
  const { name, age, email } = req.body;
  try {
    await athModel.findByIdAndUpdate(req.params.id, { name, age, email });
    res.redirect('/read');
  } catch (err) {
    res.status(500).send("Error updating athlete");
  }
});

// Deletion

app.post('/delete/:id', async (req, res) => {
  try {
    await athModel.findByIdAndDelete(req.params.id);
    res.redirect('/read'); // redirect to list page
  } catch (err) {
    console.error(err);
    res.status(500).send("Failed to delete athlete ");
  }
});



//! SERVER Starter

app.listen(port, () => {
    console.log(`App is running on the port: ${port}`);

})
