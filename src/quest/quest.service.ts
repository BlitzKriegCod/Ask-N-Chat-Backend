import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateQuestDto } from './dto/create-quest.dto';
import { UpdateQuestDto } from './dto/update-quest.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Quest } from 'src/schemas/quest.schema';
import { Model } from 'mongoose';
import { filter } from 'rxjs';

@Injectable()
export class QuestService {
  constructor(@InjectModel(Quest.name) private questModel: Model<Quest>) {}
  async create(createQuestDto: CreateQuestDto) {
    await this.questModel.create(createQuestDto);
    return {
      message: 'Quest created successfully',
    };
  }

  async findAll(): Promise<Quest[] | null> {
    try {
      return await this.questModel
        .find()
        .populate('Author', '_id name email google status role img')
        .exec();
    } catch (err) {
      throw new InternalServerErrorException({ msg: err });
    }
  }
  async findOne(id: string): Promise<Quest | null> {
    const quest = await this.questModel
      .findById(id)
      .populate('Author', '_id name email google status role img')
      .exec();
    return quest;
  }

  async update(id: string, updateQuestDto: UpdateQuestDto) {
    const quest = await this.questModel.findById(id);
    if (!quest)
      throw new BadRequestException({
        msg: `Question whit id: ${id} not found`,
      });
    try {
      return await this.questModel.findByIdAndUpdate(id, updateQuestDto);
    } catch (err) {
      throw new InternalServerErrorException();
    }
  }

  remove(id: number) {
    return `This action removes a #${id} quest`;
  }
}
