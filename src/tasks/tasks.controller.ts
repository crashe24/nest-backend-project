import {  Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post } from '@nestjs/common';
import { Task } from '@prisma/client';
import { CreateTaskDto } from './dto/task.dto';
//import { CreateTaskDto, UpdateTaskDto } from './dto/task.dto';


import { TasksService } from './tasks.service'

@Controller('tasks')
export class TasksController {


    constructor(private taskService: TasksService) { }

    async getTask (id: string) {
        const taskFound =  await  this.taskService.getTaskById(Number(id))
        if ( !taskFound) {
                throw new NotFoundException ('Tarea no encontrada')
        }
        return taskFound
    }

    @Get()
    async getAllTaskController() {
        return  this.taskService.getAllTask()
    }

    @Get(':id')
    async getTaskByController(@Param('id') id:string) {
       /*  const taskFound =  await  this.taskService.getTaskById(Number(id))
        if ( !taskFound) {
                throw new NotFoundException ('Tarea no encontrada')
        }
        return taskFound 
        */
        return await this.getTask (id)
    }

    @Post()
    async createTaskController(@Body() dataTo: CreateTaskDto) {
               return await this.taskService.createTask(dataTo)
    }

    @Delete(':id')
    async deleteTaskController(@Param('id') id: string) {
       
       /* const taskFound =  await  this.taskService.getTaskById(Number(id))
        if ( !taskFound) {
                throw new NotFoundException ('Tarea no encontrada')
        }*/
        await this.getTask (id)
        return await this.taskService.deleteTask(Number(id))
    }

    @Delete(':id')
    async deleteTaskControllerTwo(@Param('id') id: string) {
        /*
        const taskFound =  await  this.taskService.getTaskById(Number(id))
        if ( !taskFound) {
                throw new NotFoundException ('Tarea no encontrada')
        }
        */
        await this.getTask (id)
        return await this.taskService.deleteTask(Number(id))    
        
        
    }
    @Patch(':id')
    async updateTaskController(@Param('id') id:string, @Body() newTask: Task) {
       /* const taskFound =  await  this.taskService.getTaskById(Number(id))
        if ( !taskFound) {
                throw new NotFoundException ('Tarea no encontrada')
        }*/
        await this.getTask (id)
        return await this.taskService.updateTask(Number(id), newTask
            )
    }

    
}
