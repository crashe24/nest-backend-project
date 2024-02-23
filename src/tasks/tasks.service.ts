import { Injectable } from '@nestjs/common';
import { TastStatusEnun } from './task.entity';
import { CreateTaskDto, UpdateTaskDto } from './dto/task.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Task } from '@prisma/client';


@Injectable()
export class TasksService {

    constructor(private prisma: PrismaService) {

    }

    /*
    private tasks: Task[] = [
        {id:'1', title: 'first task', description: 'this is a first task', status: TastStatusEnun.OPEN},
        {id:'2', title: 'second task', description: 'this is a second task', status: TastStatusEnun.PENDING},
        {id:'3', title: 'thirth task', description: 'this is a thirth task', status: TastStatusEnun.IN_PROGRESS},
    ]*/
    async getAllTask(): Promise<Task[]> {
            //return this.tasks
            return this.prisma.task.findMany()
            
    }

    async getTaskById(id:number): Promise<Task> {
        return this.prisma.task.findUnique({
            where : {
                id
            }
        })

    }

   async  createTask(data:CreateTaskDto): Promise<Task> {
        return this.prisma.task.create({
            data
        })

        
    }

    async updateTask(id: number, data: Task): Promise<Task> {
      return  this.prisma.task.update({
          where: {
              id
          },
          data
      })
    }
    /*
    updateTask(id: string, upTask: UpdateTaskDto): Task[] {
        return this.tasks.map( t => {
            if (t.id === id ) {
                Object.assign(t, upTask)
            }
            return t 
        })
    }*/

    /*
    deleteTask(id:string):Task[] {
        return this.tasks.filter(taskRef => taskRef.id !== id)
    }
    */

    async deleteTask(id:number): Promise<Task> {
        return this.prisma.task.delete({
            where: { id }
        })
    }
}
