import { Module } from '@nestjs/common';
import { OwnerService } from './owner.service';
import { OwnerController } from './owner.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  providers: [OwnerService],
  controllers: [OwnerController],
  imports: [PrismaModule]
})
export class OwnerModule {}
