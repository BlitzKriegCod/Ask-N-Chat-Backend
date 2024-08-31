import { Module } from '@nestjs/common';
import { QuestService } from './quest.service';
import { QuestController } from './quest.controller';

@Module({
  controllers: [QuestController],
  providers: [QuestService],
})
export class QuestModule {}
