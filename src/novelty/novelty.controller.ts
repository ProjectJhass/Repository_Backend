import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { NoveltyService } from './novelty.service';
import { CreateNoveltyDto } from './dto/create-novelty.dto';
import { UpdateNoveltyDto } from './dto/update-novelty.dto';

@Controller('novelty')
export class NoveltyController {
  constructor(private readonly noveltyService: NoveltyService) {}

  @Post()
  create(@Body() createNoveltyDto: CreateNoveltyDto) {
    return this.noveltyService.create(createNoveltyDto);
  }

  @Post()
  createt(@Body() createNoveltyDto: CreateNoveltyDto) {
    return this.noveltyService.create(createNoveltyDto);
  }

  @Get()
  findAll() {
    return this.noveltyService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.noveltyService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateNoveltyDto: UpdateNoveltyDto) {
    return this.noveltyService.update(+id, updateNoveltyDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.noveltyService.remove(+id);
  }
}
