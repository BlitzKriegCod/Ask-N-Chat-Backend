import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ValidationPipe,
  UsePipes,
} from '@nestjs/common';
import { QuestService } from './quest.service';
import { CreateQuestDto } from './dto/create-quest.dto';
import { UpdateQuestDto } from './dto/update-quest.dto';
import { Public } from 'src/decorators/public.decorator';
import { FindByIdDto } from 'src/user/dto/FindById.dto';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('Questions')
@Controller('quest')
@UsePipes(new ValidationPipe({ enableDebugMessages: true }))
export class QuestController {
  constructor(private readonly questService: QuestService) {}
  @Public()
  @Post()
  create(@Body() createQuestDto: CreateQuestDto) {
    return this.questService.create(createQuestDto);
  }

  @Get()
  findAll() {
    return this.questService.findAll();
  }
  @Public()
  @Get(':id')
  findOne(@Param() params: FindByIdDto) {
    return this.questService.findOne(params.id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateQuestDto: UpdateQuestDto) {
    return this.questService.update(id, updateQuestDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.questService.remove(+id);
  }
}
