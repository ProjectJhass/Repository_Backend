import { Module } from '@nestjs/common';
import { NoveltyService } from './novelty.service';
import { NoveltyController } from './novelty.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Novelty } from './entities/novelty.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Novelty])],
  controllers: [NoveltyController],
  providers: [NoveltyService],
  exports: [NoveltyService]
})
export class NoveltyModule {}
