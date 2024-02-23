import { Module } from '@nestjs/common';
import { HousingComplexModule } from './hosting-complex/housting-complex.module';
import { TasksModule } from './tasks/tasks.module';
import { OwnerModule } from './owner/owner.module';
import { AliquotModule } from './aliquot/aliquot.module';
import { UserModule } from './user/user.module';


@Module({
  imports: [TasksModule, HousingComplexModule, OwnerModule, AliquotModule, UserModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
