import { Player, IPlayer } from './Player.type';
import { Coin, ICoin } from './Coin.type';
import { Lava, ILava } from './Lava.type';

export enum ActorTyper {
    player = 'player',
    lava = 'lava',
    coin = 'coin'
}
export type tActor = IPlayer | ICoin | ILava;
export const actorCharsMap = {
    '@': Player,
    "o": Coin,
    "=": Lava, "|": Lava, "v": Lava, "!": Lava
}

export enum AnimStatus {
    idle = 'idle',
    run = 'run',
    jump = 'jump'
}
export enum AnimDirection {
    left = 'left',
    right = 'right'
}
export type AnimationProps = {
    direction: AnimDirection,
    status: AnimStatus
}