import { PlatformerActionsType } from 'pages/Platformer/store/actions';
import { CounterActionsTypes } from './init.action';

export * from './init.action';

export type AppActions = PlatformerActionsType | CounterActionsTypes;