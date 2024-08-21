import { IsMongoId } from 'class-validator';

export class FindByIdDto {
  @IsMongoId({ message: ' Id must be a MongoId ' })
  id: string;
}
