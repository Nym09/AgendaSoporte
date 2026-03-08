require('dotenv').config();

const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const path = require('path');

const authRoutes = require('./routes/routes');

const app = express();
app.use(cors({
    origin: ['http://localhost:4200'],
    credentials:true
}));

const port = process.env.PORT || 3000;

/* Middlewares */
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

/* Rutas */
app.use('/api/auth', authRoutes);

/* Prueba */ 
app.get('/',(req,res)=>{
    res.json({message:'funciona'});
});

app.listen(port, () =>{
    console.log(`Servidor activo en http:localhost:${port}`);
})