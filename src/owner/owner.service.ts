import { Injectable } from '@nestjs/common';
import { Owner } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class OwnerService {
    constructor(private prisma: PrismaService) {}

    async getAllOwner(): Promise<Owner[]> {
        return await this.prisma.owner.findMany()
        }
    
    async getOwnerByFullName(name: string): Promise<Owner> {
            return await this.prisma.owner.findFirst({
                where : {
                    fullName: name.toLowerCase() }
            })
        }
    
    async getOwnerByid(id: number): Promise<Owner> {
            return await this.prisma.owner.findFirst({
                where : {
                   id }
            })
    }

    async getOwnerByHousing(idHousing: number): Promise<Owner[]> {
        return await this.prisma.owner.findMany({
            where: {
                housing_complex_id: idHousing
            }
        })
    }

    async getOwnerByHouse(numberHouse: number) : Promise<Owner> {
        return await this.prisma.owner.findFirst({
            where: {
                house: numberHouse
            }
        })
    }
    
    async getOwnerByHouseAndHousing(numberHouse: number, housing: number) : Promise<Owner> {
        return await this.prisma.owner.findFirst({
            where: {
                house: numberHouse,
                housing_complex_id: housing
            }
        })
    }

    async createOwner(data: Owner): Promise<Owner> {
            return await this.prisma.owner.create({data})    
    }

    async deleteOwner(id: number): Promise<Owner> {
        return await this.prisma.owner.delete({
            where: {id}
        })
    }
    async updateOwner(id: number, data: Owner): Promise<Owner> {
        return await this.prisma.owner.update({
            where : {
                id
            },
            data
        })
    }

    

}
