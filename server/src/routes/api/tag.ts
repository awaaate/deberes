import express, {Application, Request, Router, Response, NextFunction} from 'express' ;
import { PrismaClient, Tag, Task, User } from '@prisma/client';

const router : Router = express.Router() ;
const prisma : PrismaClient = new PrismaClient() ;

// Get all users *** include { withTasks : boolean }
router.get('/', async (req : Request, res : Response, next : NextFunction) => {
    try {
        const tags : Tag[] = await prisma.tag.findMany( {
            include : { tasks : req.body.withTasks },
        } ) ;
        res.json(tags) ;
    } catch (error) {
        next(error) ;
    }
}) ;

// Create a user { }
router.post('/', async (req : Request, res : Response, next : NextFunction) => {
    try {
        const tag = await prisma.tag.findFirst( { where : { name : req.body.name } }) ;
        if (tag === null) {
            const newTag : Tag = await prisma.tag.create({
                data : {
                    name : req.body.name
                }
            }) ;
            res.json(newTag) ;
        } else {
            res.status(400).json({ msg : "that tag already exists" }) ;
        }
    } catch (error) {
        next(error) ;
    }
}) ;



module.exports = router ;