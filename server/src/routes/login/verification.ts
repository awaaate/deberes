import express, {Application, Request, Router, Response, NextFunction} from 'express' ;
import { PrismaClient, Task, User, Tag, TagsOnTasks } from '@prisma/client';

const router : Router = express.Router() ;
const prisma : PrismaClient = new PrismaClient() ;

// Get a token and user id and verify the usr id
router.post('/email', async (req : Request, res : Response, next : NextFunction) => {
    const user : User | null = await prisma.user.findUnique({ where : { id : req.body.id } }) ;
    if (user !== null) {
        if (user.secretEmailVerificationToken === req.body.secretEmailVerificationToken) {
            await prisma.user.update({ 
                where : { 
                    id : req.body.id 
                },
                data : {
                    verified : true 
                }
            }) ;
            res.status(200).json({ msg : "Acount verified" }) ;
        } else {
            res.status(400).json({ msg : 'Invalid token' }) ;
        }
    } else {
        res.status(400).json({ msg : `No user with id of ${req.body.id}` }) ;
    }

}) ;

module.exports = router ;