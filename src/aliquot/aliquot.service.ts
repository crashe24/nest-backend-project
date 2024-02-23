import { Injectable } from '@nestjs/common';
import { Aliquot } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AliquotService {

    constructor(private prisma: PrismaService) {}

    async getAllAliquot(): Promise<Aliquot[]> {
        return await this.prisma.aliquot.findMany()
        }
    
    async getAliquotByid(id: number): Promise<Aliquot> {
            return await this.prisma.aliquot.findFirst({
                where : {
                    id
                },
                include : {
                    owner: true
                }
            })
        }
    
    async getAliquotByAliquotAndHousing(idOwner: number, idHousingComplex: number): Promise<Aliquot[]> {
            return await this.prisma.aliquot.findMany({
                    where : {
                        ownerId: idOwner,
                        housing_complex_id: idHousingComplex
                    }
             })
    }

    async getAliquotByAliquotAndHousingYearMonth(idOwner: number, idHousingComplex: number, year: number, month: number): Promise<Aliquot[]> {
        return await this.prisma.aliquot.findMany({
                where : {
                    ownerId: idOwner,
                    housing_complex_id: idHousingComplex,
                    year,
                    month
                }
         })
    }

    async getAliquotByAliquotAndHousingState(idOwner: number, idHousingComplex: number, state: string): Promise<Aliquot[]> {
        return await this.prisma.aliquot.findMany({
                where : {
                    ownerId: idOwner,
                    housing_complex_id: idHousingComplex,
                    state
                }
         })
    }

    async createAliquot(data: Aliquot): Promise<Aliquot> {
        return await this.prisma.aliquot.create({
            data
        })
    }

    async updateAliquot(id:number, data: Aliquot): Promise<Aliquot> {
        return await this.prisma.aliquot.update({
            where: {
                id
            },
            data
        })
    }

    async deleteAliquot(id: number): Promise<Aliquot> {
        return await this.prisma.aliquot.delete({
            where: {
                id
            }
        })
    }
}
