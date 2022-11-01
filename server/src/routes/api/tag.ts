import express, {Application, Request, Router, Response, NextFunction} from 'express' ;
import { PrismaClient, Tag, Task } from '@prisma/client';

const router : Router = express.Router() ;
const prisma : PrismaClient = new PrismaClient() ;

// Get all users *** include { withTasks : boolean }
router.get('/', async (req : Request, res : Response, next : NextFunction) => {
    try {
        const tags : Tag[] = await prisma.tag.findMany( {
            include : { tasks : req.body.withTasks },
        } ) ;
        res.json(tags) ;
    } catch (err) {
        next(err) ;
    }
}) ;


module.exports = router ;