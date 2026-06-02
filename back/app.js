require('dotenv').config();

const express = require('express');
const cors = require('cors');
const path = require('path');

const routes = require('./routes/routes');
const cookieParser = require('cookie-parser');

const app = express();
app.use(cors({
    origin:['http://localhost:4200'],
    credentials:true
}));

const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

app.use('/api', routes);

/* Prueba */ 
app.get('/',(req,res)=>{
    res.json({message:'funciona'});
});

app.listen(port, ()=>{
    console.log(`servidor activo en http://localhost:${port}`);
})