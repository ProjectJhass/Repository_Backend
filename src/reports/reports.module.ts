import { Module } from '@nestjs/common';
// import { ReportsController } from './reports.controller';
import { PdfService } from './reports.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { PdfController } from './reports.controller';
import { Profile } from 'src/profile/entities/profile.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Profile])],
  controllers: [PdfController],
  providers: [PdfService],
  exports: [PdfService],
})
export class ReportsModule {}
