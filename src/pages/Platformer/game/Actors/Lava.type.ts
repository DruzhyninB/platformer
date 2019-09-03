import {IVector, Vector} from '../Level/Vector.class';
import { ActorTyper } from './types';
import utl from 'utility';
import { Level } from '../Level/Level.class';
import { Drawer } from '../Drawer';

export interface ILava {
    id: string,
    position: IVector;
    repeatPos?: IVector;
    size: IVector;
    speed: IVector;
    type: ActorTyper;
    act: ( step: number, level: Level ) => void;
    render:(tools:Drawer)=>void
}
export class Lava implements ILava {
    public id: string;
    public position: IVector;
    public repeatPos: IVector;
    public speed: IVector;
    public size: IVector;
    public type: ActorTyper = ActorTyper.lava;
    private dynamic: boolean = true;

    constructor( position: IVector, ch: string ) {
        this.id = utl.generateGUID();
        this.position = position;
        this.size = new Vector( 1, 1 );
        switch ( ch ) {
            case '!':
                this.speed = new Vector( 0, 0 );
                this.dynamic = true;
                break;
            case '=':
                this.speed = new Vector( 2, 0 );
                break;
            case '|':
                this.speed = new Vector( 0, 2 );
                break;
            case 'v':
                this.speed = new Vector( 0, 3 );
                this.repeatPos = position;
                break;
        }
    }

    public act( step: number, level: Level ) {
        if ( !this.dynamic ) return;
        var newPos = this.position.plus( this.speed.times( step ) );
        if ( !level.obstacleAt( newPos, this ) )
            this.position = newPos;
        else if ( this.repeatPos )
            this.position = this.repeatPos;
        else
            this.speed = this.speed.times( -1 );
    };

    public render (draw:Drawer){
        let {ctx} = draw.canvas,{scale} = draw.gameSettings,{xShift,yShift} = draw.viewShift;
        ctx.fillStyle = 'red';
        ctx.fillRect(
            this.position.x * scale - xShift,
            this.position.y * scale - yShift,
            this.size.x * scale,
            this.size.y * scale
        )
    }
}