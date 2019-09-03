import {IVector, Vector} from '../Level/Vector.class';
import { EnviromentTyper } from './types';
import { Drawer } from '../Drawer';

export interface IWall {
    position: IVector;
    size: IVector;
    type: EnviromentTyper;
    render:(tools:Drawer)=>void
}
export class Wall implements IWall {
    public position: IVector;
    public size: IVector;
    public type: EnviromentTyper = EnviromentTyper.wall;

    constructor( position: IVector, ) {
        this.position = position;
        this.size = new Vector( 1, 1 );
    }

    public render (draw:Drawer){
        let {ctx} = draw.canvas,{scale} = draw.gameSettings,{xShift,yShift} = draw.viewShift;
        ctx.fillStyle = 'brown';
        ctx.fillRect(
            this.position.x * scale - xShift,
            this.position.y * scale - yShift,
            this.size.x * scale,
            this.size.y * scale
        )
    }
}