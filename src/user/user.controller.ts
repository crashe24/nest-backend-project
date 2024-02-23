import { Body, Controller, Delete, Get, HttpCode, NotFoundException, Param, Patch, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { UserHousing } from '@prisma/client'

@Controller('user')
export class UserController {
    constructor(private userService: UserService) {}


    async checkUser(id:String )  {
        const userSearched = await  this.userService.getUserById(Number(id))
        if (!userSearched) {
         
              throw new NotFoundException('No encontrado', { cause: new Error(), description: 'Some error description' })

        }
       return userSearched
    }

    async checkUserName(email: string) {
        const userSearched = await this.userService.getUserByEmail(email)    
        if (!userSearched) {
       
            throw new NotFoundException('No encontrado', { cause: new Error(), description: 'Some error description' })

      }
     return userSearched
    }

    @Get()
    async getAllUser () {
        return await this.userService.getAllUser()
    }

    @Get(':id')
    async getUserById (@Param('id') id: string) {
        return await this.checkUser(id )
    }

    @Get('email/:email')
    async getUserByEmail (@Param('email') email: string) {
        return await this.checkUserName(email)
        
    }

    @Post()
    @HttpCode(204)
    async createUser (@Body() data : UserHousing) {
        return await this.userService.createUser(data) 
    }

    @Patch(':email')
    async updateUser (@Param('email') email : string,  @Body() data: UserHousing) {
        await this.checkUserName(email)
        return await this.userService.updateUser(email,data)
    }

    @Delete(':email')
    async deleteUser(@Param('email') email : string ) {
        await this.checkUserName(email)
        return await this.userService.deleteUser(email)
    }
}
