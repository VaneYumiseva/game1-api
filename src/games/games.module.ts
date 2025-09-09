import { Module } from '@nestjs/common';
import { GamesService } from './games.service';
import { GamesController } from './games.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Game } from './entities/game.entity';
import { GamePlayer } from './entities/game-player.entity';
import { UsersModule } from 'src/users/users.module';
import { User } from 'src/users/entities/user.entity';

@Module({
  controllers: [GamesController],
  providers: [GamesService],
  imports: [SequelizeModule.forFeature([Game, User, GamePlayer]), UsersModule],
})
export class GamesModule {}
