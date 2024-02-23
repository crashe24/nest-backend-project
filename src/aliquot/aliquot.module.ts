import { Module } from '@nestjs/common';
import { AliquotService } from './aliquot.service';
import { AliquotController } from './aliquot.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  providers: [AliquotService],
  controllers: [AliquotController],
  imports: [PrismaModule]
})
export class AliquotModule {}
