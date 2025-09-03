import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  Min,
  IsInt,
  IsObject,
} from 'class-validator';

export enum GameState {
  WAITING = 'waiting',
  IN_PROGRESS = 'in_progress',
  FINISHED = 'finished',
}

export class CreateGameDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsInt()
  @Min(2)
  maxPlayers: number;

  @IsString({ each: true })
  @IsOptional()
  playersName?: string[];

  @IsEnum(GameState)
  @IsOptional()
  state?: GameState;

  @IsObject()
  @IsOptional()
  score?: Record<string, number>;
}
