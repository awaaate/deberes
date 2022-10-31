import express, { Application, Request, Response, NextFunction } from 'express' ;
import path from 'path' ;

const app : Application = express() ; 

// Import Task related http responses
app.use('/task', require('./routes/api/tasks')) ;

const PORT = process.env.PORT || 3000 ;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`)) 