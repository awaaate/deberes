import express, {Application, Request, Router, Response, NextFunction} from 'express' ;
import { PrismaClient, Task, User } from '@prisma/client';

const router : Router = express.Router() ;
const prisma : PrismaClient = new PrismaClient() ;

// Get all users *** include { withTasks : boolean }
router.get('/', async (req : Request, res : Response, next : NextFunction) => {
    try {
        const users : User [] = await prisma.user.findMany( {
            include : { tasks : req.body.withTasks }
        } ) ;
        res.json(users) ;

    } catch (err) {
        next(err) ;
    }
}) ;


module.exports = router ;