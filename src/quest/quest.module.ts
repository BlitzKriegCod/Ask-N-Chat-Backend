import { Module, forwardRef } from '@nestjs/common';
import { QuestService } from './quest.service';
import { QuestController } from './quest.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Quest, QuestSchema } from 'src/schemas/quest.schema';
import { UserModule } from 'src/user/user.module';

@Module({
  controllers: [QuestController],
  providers: [QuestService],
  imports: [
    MongooseModule.forFeature([{ name: Quest.name, schema: QuestSchema }]),
    forwardRef(() => UserModule),
  ],
})
export class QuestModule {}
