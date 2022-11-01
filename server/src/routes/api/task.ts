import express, {Application, Request, Router, Response, NextFunction} from 'express' ;
import { PrismaClient, Task, User, Tag } from '@prisma/client';
import { BlobOptions } from 'buffer';

const router : Router = express.Router() ;
const prisma : PrismaClient = new PrismaClient() ;

// Get all tasks *** include { withUser : boolean, withTags : boolean }
router.get('/', async (req : Request, res : Response, next : NextFunction) => {
    try {
        const tasks : Task[] = await prisma.task.findMany({
            include : { 
                user : req.body.withUser,
                tags : req.body.withTags,
            }, 
        }) ;
        res.json(tasks) ;
    } catch (error) {
        next(error) ;
    }
}) ;

// Get task by id { withUser : bool }
router.get('/:id', async (req : Request, res : Response, next : NextFunction) => {
    try {
        let bool : boolean = false ;
        if (req.body.withUser === true) bool = true ;
        const task : Task | null = await prisma.task.findUnique({
            where : {
                id : req.params.id
            },
            include : {
                user : bool
            }
        }) ;
        if ( task === null ) res.status(400).json( { msg : `there is no task with id : ${req.params.id}`}) ;
        else res.json( task ) ;
    } catch (error) {
        next(error) ;
    }
}) ;

// Create a task { }
router.post('/', async (req : Request, res : Response, next : NextFunction) => {
    try {
        const newTask : Task = await prisma.task.create({
            data : {
                title : req.body.title,
                body : req.body.body,
                status : req.body.status,
                userId : req.body.userId
            }
        }) ;
        res.json(newTask) ;
    } catch (error) {
        next(error) ;
    }
}) ;

// Update task by id
router.patch('/:id', async (req : Request, res :Response, next : NextFunction) => {
    try {
        if (await prisma.task.findUnique({ where : { id  : req.params.id } }) !== null) {
            const task = await prisma.task.update({
                where : { id : req.params.id },
                data : req.body,
            }) ;
            res.json(task) ;
        } else {
            res.status(400).json({ msg : `The task with id ${req.params.id} does not exist` }) ;
        }
    } catch (error) {
        next(error) ;
    }
}) ;

// Delete a task by id 
router.delete('/:id', async (req : Request, res : Response, next : NextFunction) => {
    try {
        const taskToDlete : Task | null = await prisma.task.findUnique({
            where : { id : req.params.id },
        }) ;
        if (taskToDlete !== null) {
            const deletedTask : Task = await prisma.task.delete({
                where : { id : req.params.id },
            }) ;
            res.json({deletedTask, msg : "Task deleated successfully"}) ;
        } else {
            res.status(400).json({ msg : `Task with id of ${req.params.id} does not exist`})
        }
    } catch (error) {
        next(error) ;
    }
});

module.exports = router ;