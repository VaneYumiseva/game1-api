import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  ParseEnumPipe,
} from '@nestjs/common';
import { GamesService } from './games.service';
import { CreateGameDto, GameState } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';

@Controller('games')
export class GamesController {
  constructor(private readonly gamesService: GamesService) {}

  @Post()
  create(@Body() createGameDto: CreateGameDto) {
    return this.gamesService.create(createGameDto);
  }

  @Get()
  findAll() {
    return this.gamesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.gamesService.findOne(+id);
  }

  @Patch(':id/join')
  joinGame(@Param('id') id: string, @Body() updateGameDto: UpdateGameDto) {
    return this.gamesService.joinGame(+id, updateGameDto);
  }

  @Patch(':id/start')
  startGame(@Param('id') id: string) {
    return this.gamesService.startGame(+id);
  }

  @Patch(':id/end')
  endGame(@Param('id') id: string, @Body() updateGameDto: UpdateGameDto) {
    return this.gamesService.endGame(+id, updateGameDto);
  }

  @Get('status/:state')
  findByState(@Param('state', new ParseEnumPipe(GameState)) state: GameState) {
    return this.gamesService.findByState(state);
  }
}
