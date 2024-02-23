import { Body, Controller, Delete, Get, InternalServerErrorException, NotAcceptableException, NotFoundException, Param, Patch, Post } from '@nestjs/common';
import { Owner } from '@prisma/client';
import { OwnerService } from './owner.service';

@Controller('owner')
export class OwnerController {
    constructor(private ownerService: OwnerService) {}

    async searchOwner ( name: string ) {
        const ownerSearch = await this.ownerService.getOwnerByFullName(name)
        if (!ownerSearch) {
            throw new NotFoundException('Copropietario no encontrado')
        }
        return ownerSearch
    }

    async searchOwnerById ( id: string ) {
        const ownerSearch = await this.ownerService.getOwnerByid(Number(id))
        if (!ownerSearch) {
            throw new NotFoundException('Copropietario no encontrado')
        }
        return ownerSearch
    }
    @Get()
    async getAllOwner() {
        return await this.ownerService.getAllOwner()
    }

    @Get(':id')
    async getAllOwnerById(@Param('id') id: string) {
        return await this.ownerService.getOwnerByid(Number(id))
    }

    @Get('nombre/:name')
    async getAllOwnerByName(@Param('name') name: string) {
        return await this.ownerService.getOwnerByFullName(name.toLocaleLowerCase())
    }
    
    @Get('conjunto/:housing')
    async getAllOwnerByHousing(@Param('housing') housing: string) {
        return await this.ownerService.getOwnerByHousing(Number(housing))
    }

    @Get('casa/:house')
    async getAllOwnerByHouse(@Param('house') house: string) {
        return await this.ownerService.getOwnerByHouse(Number(house))
    }

    // validar si es del mismo conjunto y ya tiene registrado un propietario de la casa  no dejarle ingresar
    @Post()
    async createOwner(@Body() data: Owner) {
        try {
            const ownerCreated = {...data}

            const ownerSearchedByNumberHouse = await this.ownerService.getOwnerByHouseAndHousing(Number(data.house), Number(data.housing_complex_id))
            if (ownerSearchedByNumberHouse) {
                throw new NotAcceptableException('Ya existe un propietario ingresado para esa casa y ese conjunto')
            }

            ownerCreated.fullName = ownerCreated.fullName.toLocaleLowerCase() 
            return await this.ownerService.createOwner(ownerCreated)    
        } catch (error) {
            console.log('error', error)
            throw new InternalServerErrorException('Copropietario no creado')

        }
        
    }

    @Patch(':name')
    async updateOwner(@Param('name') name: string, @Body() data:Owner) {
       /* const ownerSearch = await this.ownerService.getOwnerByFullName(name)
        if (!ownerSearch) {
            throw new NotFoundException('Copropietario no encontrado')
        }*/
        
        //return await this.ownerService.updateOwner(ownerSearch.id, data)
        return await this.ownerService.updateOwner((await this.searchOwner(name)).id, data)
    }

    @Delete(':id')
    async deleteOwner(@Param('id') id: string) {
        /*const ownerDeleted = await this.ownerService.getOwnerByid(Number(id))
        if (!ownerDeleted) {
            throw new NotFoundException('Copropietario no encontrado')
        }*/
        await this.searchOwnerById ( id )
        return await this.ownerService.deleteOwner(Number(id))
    }

    @Delete('nombre/:name')
    async deleteOwnerByName(@Param('name') name: string) {
       /*
        const ownerSearch = await this.ownerService.getOwnerByFullName(name)
        if (!ownerSearch) {
            throw new NotFoundException('Copropietario no encontrado')
        }
        */
        
        return await this.ownerService.deleteOwner((await this.searchOwner(name)).id)
        // return await this.ownerService.deleteOwner(ownerSearch.id)
    }

  
}
