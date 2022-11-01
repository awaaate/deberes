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

// Get user by id { withTasks : bool }
router.get('/:id', async (req : Request, res : Response, next : NextFunction) => {
    try {
        let bool : boolean = false ;
        if (req.body.withTasks === true) bool = true ;
        const user : User | null = await prisma.user.findUnique({
            where : {
                id : req.params.id
            },
            include : {
                tasks : bool
            }
        }) ;
        if ( user === null ) res.status(400).json( { msg : `there is no user with id : ${req.params.id}`}) ;
        else res.json( user ) ;
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

// Update user by id
router.patch('/:id', async (req : Request, res :Response, next : NextFunction) => {
    try {
        if (await prisma.user.findUnique({ where : { id  : req.params.id } }) !== null) {
            const user = await prisma.user.update({
                where : { id : req.params.id },
                data : req.body,
            }) ;
            res.json(user) ;
        } else {
            res.status(400).json({ msg : `The user with id ${req.params.id} does not exist` }) ;
        }
    } catch (error) {
        next(error) ;
    }
}) ;

// Delete a user by id *** Deleting a user deletes all its tasks *** 
router.delete('/:id', async (req : Request, res : Response, next : NextFunction) => {
    try {
        const userToDlete : User | null = await prisma.user.findUnique({
            where : { id : req.params.id },
        }) ;
        if (userToDlete !== null) {
            await prisma.task.deleteMany({
                where : { userId : req.params.id },
            }) ;
            const deletedUser : User = await prisma.user.delete({
                where : { id : req.params.id },
            }) ;
            res.json({deletedUser, msg : "User deleated successfully"}) ;
        } else {
            res.status(400).json({ msg : `Task with id of ${req.params.id} does not exist`})
        }
    } catch (error) {
        next(error) ;
    }
});


module.exports = router ;