import {IVector, Vector} from '../Level/Vector.class';
import { ActorTyper } from './types';
import utl from 'utility';
import { Drawer } from '../Drawer';

var wobbleSpeed = 8, wobbleDist = 0.07;

export interface ICoin {
    id: string,
    position: IVector;
    basePos: IVector;
    size: IVector;
    wobble: number;
    type: ActorTyper;
    act: ( step:number ) => void;
    render:(tools:Drawer)=>void
}
export class Coin implements ICoin {
    public id: string;
    public position: IVector;
    public basePos: IVector;
    public size: IVector;
    public wobble: number;
    public type: ActorTyper = ActorTyper.coin;

    constructor( position: IVector ) {
        this.id = utl.generateGUID();
        this.position = this.basePos = position.plus( new Vector( 0.2, 0.1 ) );
        this.size = new Vector( 0.6, 0.6 );
        this.wobble = Math.random() * Math.PI * 2;
    }

    public act( step:number ) {
        this.wobble += step * wobbleSpeed;
        var wobblePos = Math.sin( this.wobble ) * wobbleDist;
        this.position = this.basePos.plus( new Vector( 0, wobblePos ) );
    };

    public render (draw:Drawer){
        let {ctx} = draw.canvas,{scale} = draw.gameSettings,{xShift,yShift} = draw.viewShift;
        ctx.fillStyle = 'yellow';
        ctx.fillRect(
            this.position.x * scale - xShift,
            this.position.y * scale - yShift,
            this.size.x * scale,
            this.size.y * scale
        )
    }
}