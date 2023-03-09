import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ModeratorModule } from './Moderator/moderator.module';
import { AdminModule } from './Admin/admin.module';


@Module({
  //import individual module here. Do not override this 
  //Don't delete this
  imports: [ModeratorModule, AdminModule, TypeOrmModule.forRoot({
    type:'postgres',
    host: 'localhost',
    port:5432,
    username:'postgres',
    password:'112233',
    database:'dbv1.4',
    autoLoadEntities: true,
    synchronize: true,
  })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
