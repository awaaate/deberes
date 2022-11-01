import express, {Application, Request, Router, Response, NextFunction} from 'express' ;
import { PrismaClient, Task } from '@prisma/client';

const router : Router = express.Router() ;
const prisma : PrismaClient = new PrismaClient() ;

// Get all tasks *** include { withUser : boolean }
router.get('/', async (req : Request, res : Response, next : NextFunction) => {
    try {
        const tasks : Task[] = await prisma.task.findMany({
            include : { user : req.body.withUser }, 
        }) ;
        res.json(tasks) ;
    } catch (err) {
        next(err) ;
    }
}) ;

//


module.exports = router ;