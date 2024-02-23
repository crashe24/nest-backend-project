import { Module } from "@nestjs/common";
import { PrismaModule } from "src/prisma/prisma.module";
import { HousingComplexController } from "./housing-complex.controller";
import { HousingComplexService } from "./housing-conplex.service";

@Module({
    controllers: [HousingComplexController],
    providers: [HousingComplexService],
    imports: [PrismaModule]
  })
  export class HousingComplexModule {}