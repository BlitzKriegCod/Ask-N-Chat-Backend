import { Test, TestingModule } from '@nestjs/testing';
import { QuestController } from './quest.controller';
import { QuestService } from './quest.service';

describe('QuestController', () => {
  let controller: QuestController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [QuestController],
      providers: [QuestService],
    }).compile();

    controller = module.get<QuestController>(QuestController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
