import express, { Application, Request, Response, NextFunction } from 'express' ;

const app : Application = express() ;

// initialize Body Parser middlewear
app.use(express.json()) ;
app.use(express.urlencoded({ extended : false })) ;

// Import routes
app.use('/api/user', require('./routes/api/user')) ;
app.use('/api/task', require('./routes/api/task')) ;
app.use('/api/tag', require('./routes/api/tag')) ;

const PORT : string = process.env.PORT || '3000' ;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`)) ;