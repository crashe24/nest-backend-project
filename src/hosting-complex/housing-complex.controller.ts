import { Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post, Put } from "@nestjs/common";
import { Housing_complex } from "@prisma/client";
import { HousingDto } from "./dto/housting-complex.dto";
import { HousingComplexService } from "./housing-conplex.service";

@Controller('housing-complex')
export class HousingComplexController {
    constructor(private housingComplexService: HousingComplexService) {
    }

    @Get()
    async getAllHostingController() {
        return  await this.housingComplexService.getAllHousing()
    }

    @Get(':name')
    async getHousingByNameController(@Param('name') name: string ) {
        const housingSearched =  await this.housingComplexService.getHousingByName(name)
        if (housingSearched) {
            return  housingSearched
        } else {
            const housingSearchedAll = await this.housingComplexService.getHousingByNameArray(name)
            return housingSearchedAll
        }
        
    }

    @Post()
    async createHousingComplex(@Body() dataHousing :HousingDto) {
        try {
            return await this.housingComplexService.createHousingComplex(dataHousing)    
        } catch (error) {
            throw new NotFoundException ('Conjunto no creado')
        }
        
    }

    @Delete(':name')
    async deleteHousingComplex(@Param('name') name: string ) {
     
       
        return await this.housingComplexService.deleteHousingComplex( (await this.getHousingComplex(name)).id)     
       /* try {
            const housingSearched =  await this.housingComplexService.getHousingByName(name)
            return await this.housingComplexService.deleteHousingComplex(housingSearched.id)
        } catch (error) {
            throw new NotFoundException ('Conjunto no encontrado')
            
        }*/
    }

    @Patch(':name')
    async updateHousingComplex(@Param('name') name: string, @Body() dataHousing: Housing_complex) {
        /*const housingFound =  await  this.housingComplexService.getHousingByName(name)
        if ( !housingFound) {
                throw new NotFoundException('Conjunto no encontrado')
        }*/
        await this.getHousingComplex(name)
        return await this.housingComplexService.updateHousingComplex((await this.getHousingComplex(name)).id, dataHousing)
    }
    
    async getHousingComplex(name: string ) {
        const housingFound =  await  this.housingComplexService.getHousingByName(name)
        if ( !housingFound) {
                throw new NotFoundException('Conjunto no encontrado')
        }

        return housingFound;
    }
}