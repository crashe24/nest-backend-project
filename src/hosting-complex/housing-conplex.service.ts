import { Injectable } from "@nestjs/common";
import { Housing_complex } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";
import { HousingDto } from "./dto/housting-complex.dto";

@Injectable()
export class HousingComplexService {
    constructor(private prisma: PrismaService) {  }


    async getAllHousing(): Promise<Housing_complex[]> {
        return this.prisma.housing_complex.findMany()
        }
    
    async getHousingByName(name: string) : Promise<Housing_complex> {
        return this.prisma.housing_complex.findFirst({
            where : {
                name
            }
        })
    }

    async getHousingByNameArray(name: string) : Promise<Housing_complex[]> {
        return this.prisma.housing_complex.findMany({
            where : {
                name: {
                    startsWith: name,
                  }
            }
        })
    }

    async createHousingComplex(data: HousingDto) : Promise<Housing_complex> {
        return this.prisma.housing_complex.create({
            data
        })
    }

    async deleteHousingComplex(id: number): Promise<Housing_complex> {
        return this.prisma.housing_complex.delete({ 
            where: { id }
        })
    }

    async updateHousingComplex(id:number, data:Housing_complex): Promise<Housing_complex> {
        return this.prisma.housing_complex.update({
            where : { id },
            data
        })
    }
}