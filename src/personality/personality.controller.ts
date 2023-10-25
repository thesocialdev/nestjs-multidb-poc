import {
  Controller,
  Get,
  Inject,
  Post,
  Put,
  Delete,
  Body,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { IPersonalityService } from '../interfaces/personality.service.interface';
import { CreatePersonalityDto } from './dto/create-personality.dto';

@Controller('personality')
export class PersonalityController {
  constructor(
    @Inject('PersonalityService') 
    private readonly personalityService: IPersonalityService
  ){}

  @Post()
  create(@Body() createPersonalityDto: CreatePersonalityDto) {
    return this.personalityService.create(createPersonalityDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.personalityService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updatePersonalityDto: CreatePersonalityDto,
  ) {
    return this.personalityService.update(id, updatePersonalityDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.personalityService.remove(id);
  }
}

