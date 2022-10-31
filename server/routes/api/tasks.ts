import { Task } from '@prisma/client';
import express, { Application, Request, Response, NextFunction, Router } from 'express' ;
import { TagLite, TaskLite, UserLite } from '../../interfaces/liteTypes';
import { TaskOpt } from '../../interfaces/optionalTypes';
import PrismaFunctional from '../../prisma/scripts'

const router : Router = express.Router() ;
const prisma : PrismaFunctional = new PrismaFunctional() ;

//GET
// Get all tasks  { tagsOn : boolean }
router.get('/', (req : Request, res : Response) => {
    res.json(prisma.getAllTasks(req.body.tagsOn)
        .then(async () => {
            await prisma.$disconnect() ;
        })
        .catch(async (e) => {
            console.error(e) ;
            await prisma.$disconnect() ;
            process.exit(1) ;
        })) ;
}) ;
// Get all task with a specific tag 
router.get('/:tag', (req : Request, res : Response) => {
    res.json(prisma.getAllTasksByTag(req.params.name)
        .then(async () => {
            await prisma.$disconnect() ;
        })
        .catch(async (e) => {
            console.error(e) ;
            await prisma.$disconnect() ;
            process.exit(1) ;
        }));
}) ;

//POST
// Create new task { TaskLite }
router.post('/', async (req : Request, res : Response) => {
    const newTask : TaskLite = {
        title : req.body.title,
        body : req.body.body,
        status : req.body.status,
        userId : req.body.userId,
        tags : req.body.tags
    }
    const taskId : string = await prisma.createTask(newTask);
    
    for (let tag of newTask.tags) {
        prisma.addTagTo(tag.name, taskId) ;
    }
}) ;
//PUT
// Update a task { TaskOpt }
router.put('/', async (req : Request, res : Response) => {
    if (req.body.id) { // id provided
        let c : string ;
        let task : TaskOpt = { id : req.body.id } ;
        if (c = req.body.title) task.title = c ;
        if (c = req.body.body) task.body = c ;
        if (c = req.body.status) task.status = c ;
        if (c = req.body.userId) task.userId = c ;

        const status = await prisma.editTask(task) ;
        
        if (status == -1)   res.status(404).json({ msg : `no task with id ${task.id}`}) ;
        else                res.status(200).json({ msg : 'task eddited successfully'}) ;

    } else { // no id orovided
        res.status(400).json({ msg : 'no task id included'}) ;
    }
    

}) ;
//DELETE


module.exports = router ;