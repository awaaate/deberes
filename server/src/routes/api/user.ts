import express, {Application, Request, Router, Response, NextFunction} from 'express' ;
import { PrismaClient, Task, User, Tag } from '@prisma/client';

const router : Router = express.Router() ;
const prisma : PrismaClient = new PrismaClient() ;

// Get all users *** include { withTasks : boolean }
router.get('/', async (req : Request, res : Response, next : NextFunction) => {
    try {
        const users : User [] = await prisma.user.findMany( {
            include : { tasks : req.body.withTasks }
        } ) ;
        res.json(users) ;

    } catch (error) {
        next(error) ;
    }
}) ;

// Create a user { }
router.post('/', async (req : Request, res : Response, next : NextFunction) => {
    try {
        const user = await prisma.user.findFirst( { where : { email : req.body.email } }) ;
        if (user === null) {
            const newUser : User = await prisma.user.create({
                data : {
                    name : req.body.name,
                    email : req.body.email,
                    about : req.body.about
                }
            }) ;
            res.json(newUser) ;
        } else {
            res.status(400).json({ msg : `This email is already taken by ${user.name}` }) ;
        }
    } catch (error) {
        next(error) ;
    }
}) ;


module.exports = router ;