import { IsNotEmpty, IsString, Max, max, MaxLength, MinLength } from "class-validator";

export class HousingDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(3, {message: 'Title is too short. Minimal length is $constraint1 characters, but actual is $value'})
    @MaxLength(50)
    name: string 
    description: string

    number_of_houses: string 
    
    administrator: string 
    direccion: string
    

    phone: string 

}

