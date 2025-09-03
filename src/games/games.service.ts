import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { CreateGameDto, GameState } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';
import { Game } from './entities/game.entity';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class GamesService {
  findAll() {
    throw new Error('Method not implemented.');
  }
  private readonly logger = new Logger(GamesService.name);
  gameService: any;

  constructor(@InjectModel(Game) private gameModel: typeof Game) {}

  async create(createGameDto: CreateGameDto) {
    const { name, maxPlayers, playersName, state } = createGameDto;

    try {
      const newGame = await this.gameModel.create({
        name: name,
        maxPlayers: maxPlayers,
        players: playersName ? [playersName] : [],
        state: state || 'waiting',
        score: null,
      });

      return newGame;
    } catch (error) {
      this.handleDBException(error);
    }
  }

  async findOne(id: number) {
    const game = await this.gameModel.findOne({
      where: {
        id: id,
      },
    });

    if (!game) {
      throw new BadRequestException(`Game with ID ${id} not found`);
    }

    return game;
  }

  async joinGame(id: number, updateGameDto: UpdateGameDto) {
    const { playersName } = updateGameDto;
    const game = await this.findOne(id);

    if (game.dataValues.players.includes(playersName!)) {
      throw new BadRequestException('The player has already joined!');
    }

    const newPlayers = [...game.dataValues.players, playersName!];
    if (newPlayers.length >= game.dataValues.maxPlayers) {
      throw new BadRequestException('Max players limit reached');
    }

    try {
      await game.update({ players: newPlayers });
      return { message: 'Joined success!' };
    } catch (error) {
      this.handleDBException(error);
    }
  }

  async startGame(id: number) {
    const game = await this.findOne(id);

    try {
      await game.update({ state: GameState.IN_PROGRESS });
      return { message: 'Game started successfully' };
    } catch (error) {
      this.handleDBException(error);
    }
  }

  async endGame(id: number, updateGameDto: UpdateGameDto) {
    const game = await this.findOne(id);

    try {
      await game.update({
        score: updateGameDto.score,
        state: GameState.FINISHED,
      });

      return {
        message: 'Game ended successfully',
      };
    } catch (error) {
      this.handleDBException(error);
    }

    return this.gameService.endGame(+id, updateGameDto);
  }

  private handleDBException(error: any) {
    //this.logger.error(error);
    if (error.parent.code === '23505') {
      throw new BadRequestException(error.parent.detail);
    }
    this.logger.error(error);
    throw new BadRequestException('Something went wrong');
  }
}
