import { Type } from 'class-transformer';
import { IsArray, IsString, ValidateNested } from 'class-validator';

class HistoryItem {
  @IsString()
  role: string;

  @IsString()
  parts: string;
}

export class CreateChatDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => HistoryItem)
  history: HistoryItem[];
  
  @IsString()
  question: string;
}
