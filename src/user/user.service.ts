import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserHousing } from '@prisma/client';

@Injectable()
export class UserService {
    constructor( private prisma: PrismaService) {}
    
    async getAllUser() : Promise<UserHousing[]> {
        return await this.prisma.userHousing.findMany()
    }

    async getUserById(id: number) : Promise<UserHousing> {
        return await this.prisma.userHousing.findFirst({
            where: { id}
        })
    }

    async getUserByEmail(email:string) : Promise<UserHousing>{
        return await this.prisma.userHousing.findFirst({
            where: { email }
        })
    }

    async createUser(data: UserHousing) : Promise<UserHousing>{
        return await this.prisma.userHousing.create({
            data
        })
    }

    async updateUser( email: string, data: UserHousing): Promise<UserHousing> {
        return await this.prisma.userHousing.update({
            where: { email },
            data
        })
    }

    async deleteUser(email: string ): Promise<UserHousing> {
        return await this.prisma.userHousing.delete({
            where: { email }
        })
    }

}
