import { prisma, PrismaClient, Task, Tag, User } from "@prisma/client";
import { resolve } from "path";
import { TagLite, UserLite, TaskLite } from "../interfaces/liteTypes";
import { TaskOpt } from "../interfaces/optionalTypes";

class PrismaFunctional extends PrismaClient {
    // Create a neew task
    async createTask (task : TaskLite): Promise<string> {
        const newTask : Task = await this.task.create({
            data : {
                title: task.title,
                body: task.body,
                status: task.status,
                userId: task.userId,
            },
        });
        return newTask.id ; // Pendiente
    }

    // Edit an existing task 
    async editTask (task : TaskOpt) : Promise<number> {
        const actTask : Task | null = await this.task.findFirst({
            where : { id : task.id }
        }) ;
        if (!actTask) return -1 ;
        const newTask : Task = await this.task.update({
            where : { id : task.id },
            data : {
                title : (task.title) ? task.title : actTask.title,
                body : (task.body) ? task.body : actTask.body,
                status : (task.status) ? task.status : actTask.status,
                userId : (task.userId) ? task.userId : actTask.userId
            }
        }) ;
        return 0 ;
    }

    // Retrive all tasks in an array
   async getAllTasks (tagsOn : boolean = false) : Promise <Task[]> {
        const tasks : Task[] = await this.task.findMany({
            include : {
                tags : tagsOn 
            }
        }) ;
        return tasks ;
   }
    // Retrive all task with a specific tag in an array
    async getAllTasksByTag (tagName : string) : Promise <Task[]> {
        const tasks : Task[] = await this.task.findMany({
            where : {
                tags : {
                    some :{
                        name : tagName 
                    }
                }
            }
        })
        return tasks ;
    }
    // Add a tag to a task
   async addTagTo (tagName : string, taskId : string) : Promise <void> {
        const tag = this.tag.findFirst({
            where : { name : tagName }
        }) || this.createTag(tagName) ;

        await this.task.update({
            where : { id : taskId },
            data : {
                tags : {
                    create : {
                        name : tagName 
                    }
                }
            }
        }) ;
   } 
   // Create a tag
   async createTag (tagName : string) : Promise<Tag> {
        const newTag : Tag = await this.tag.create({
            data : {
                name : tagName 
            }
        }) ;
        return newTag ;
   }
}

export default PrismaFunctional ;