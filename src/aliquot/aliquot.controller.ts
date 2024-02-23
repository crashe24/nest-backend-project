import { Body, Controller, Delete, Get, Param, Patch, Post, NotFoundException } from '@nestjs/common';
import { Aliquot } from '@prisma/client';

import { AliquotService } from './aliquot.service';

@Controller('aliquot')
export class AliquotController {

    constructor(private aliquotService: AliquotService) {}

    async getAliquByid( id: string) {
        const aliquot = await this.aliquotService.getAliquotByid(Number(id))
        if(!aliquot) {
            throw new NotFoundException('Alicuota no encontrada')
        }
        return aliquot
    }
    
    @Get()
    async getAllAliquot() {
        return await this.aliquotService.getAllAliquot()
    }

    @Get(':id')
    async getAliquitByid(@Param('id') id: string) {
        //return await this.aliquotService.getAliquotByid(Number(id))
        return await this.getAliquByid( id )
    }

    @Get(':idHousing/:idOwner')
    async getAliquotByAliquotAndHousing(@Param('idHousing') idHousing: string, @Param('idOwner') idOwner: string) {
        return await this.aliquotService.getAliquotByAliquotAndHousing(Number(idOwner),Number(idHousing))
    }

    @Get('alicuota/:idHousing/:idOwner')
    async getAliquotByAliquotAndHousingYearMonth(@Param('idHousing') idHousing: string, @Param('idOwner') idOwner: string, @Body() data: any) {
        return await this.aliquotService.getAliquotByAliquotAndHousingYearMonth(Number(idOwner), Number(idHousing), data.year, data.month)
    }

    @Post()
    async createAliquot(@Body() data: Aliquot) {
        return await this.aliquotService.createAliquot(data)
    }

    @Delete(':id')
    async deleteAliquot(@Param('id') id: string ) {
        await this.getAliquByid( id)
        return await this.aliquotService.deleteAliquot(Number(id))
    }
    
    @Patch(':id')
    async updteAliquot(@Param('id') id: string, @Body() data: Aliquot ) {
        await this.getAliquByid( id)
        return await this.aliquotService.updateAliquot(Number(id), data)
    }


}
