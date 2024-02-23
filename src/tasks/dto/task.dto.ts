import { TastStatusEnun } from "../task.entity"
import {IsString, IsNotEmpty, MinLength, IsOptional, IsIn} from 'class-validator'


export class CreateTaskDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    title: string
    @IsString()
    description: string 
   
}

export class UpdateTaskDto {

    @IsString()
    @IsOptional()
    title?: string
    
    @IsString()
    @IsOptional()
    description?: string 
    
    @IsString()
    @IsOptional()
    @IsIn([TastStatusEnun.CLOSE, TastStatusEnun.DONE, TastStatusEnun.IN_PROGRESS, TastStatusEnun.OPEN, TastStatusEnun.PENDING])
    status?: TastStatusEnun

}