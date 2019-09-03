import { Wall, IWall } from './Wall';

export enum EnviromentTyper {
    wall = 'wall'
}
export type tEnviroment = IWall;

export const enviromentCharsMap = {
    "x": Wall
}