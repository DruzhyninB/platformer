import { Vector} from '../Level/Vector.class';
import { tActor, actorCharsMap, ActorTyper } from '../Actors/types';
import { tEnviroment, enviromentCharsMap, EnviromentTyper } from '../Enviroment/types'
import utl from 'utility';
import { tLevel } from 'config/levels';

var maxStep = 0.05;
export interface ILevel {
    id: string;
    width: number;
    height: number;
    enviroment: tEnviroment[];
    actors: tActor[];
    player: tActor;
    status: any;
    finishDelay: any;
    isFinished: () => Boolean;
    obstacleAt: ( pos: Vector, size: tActor ) => ActorTyper | EnviromentTyper;
    actorAt: ( actor: tActor ) => tActor;
    animate: ( step: number, keys: any ) => void;
    playerTouched: ( type: ActorTyper | EnviromentTyper, actor?: tActor ) => void;
}
export class Level implements ILevel {
    public id: string;
    public width: number;
    public height: number;
    public enviroment: tEnviroment[];
    public actors: tActor[];
    public player: tActor;
    public status: any;
    public finishDelay: any;

    constructor( plan: tLevel ) {
        this.id = utl.generateGUID();
        this.width = plan[0].length;
        this.height = plan.length;
        this.enviroment = []
        this.actors = [];

        for ( var y = 0; y < this.height; y++ ) {
            let line = plan[y];
            for ( var x = 0; x < this.width; x++ ) {
                let ch = line[x],
                    Actor = actorCharsMap[ch],
                    Enviroment = enviromentCharsMap[ch];

                if ( Actor )
                    this.actors.push( new Actor( new Vector( x, y ), ch ) );
                else
                    if ( Enviroment )
                        this.enviroment.push( new Enviroment( new Vector( x, y ) ) );
                    else
                        console.log( `Unknown map element! x:${ x }, y:${ y }, ch:${ ch }` );
            }
        }

        this.player = this.actors.find( actor => actor.type == ActorTyper.player );

        this.status = this.finishDelay = null;
    }

    public isFinished() {
        return this.status != null && this.finishDelay < 0;
    }

    public obstacleAt( pos: Vector, currentActor: tActor ) {
        var xStart = Math.floor( pos.x );
        var xEnd = Math.ceil( pos.x + currentActor.size.x );
        var yStart = Math.floor( pos.y );
        var yEnd = Math.ceil( pos.y + currentActor.size.y );

        if ( xStart < 0 || xEnd > this.width || yStart < 0 )
            return EnviromentTyper.wall;
        if ( yEnd > this.height )
            return ActorTyper.lava;
        for ( let env of this.enviroment ) {
            if (
                env.position.x + env.size.x > xStart &&
                env.position.x < xEnd &&
                env.position.y + env.size.y > yStart &&
                env.position.y < yEnd )
                return env.type;
        }

    };

    public actorAt( actor: tActor ) {
        for ( var i = 0; i < this.actors.length; i++ ) {
            var other = this.actors[i];
            if ( other != actor &&
                actor.position.x + actor.size.x > other.position.x &&
                actor.position.x < other.position.x + other.size.x &&
                actor.position.y + actor.size.y > other.position.y &&
                actor.position.y < other.position.y + other.size.y )
                return other;
        }
    };

    public animate( step: number ) {
        if ( this.status != null )
            this.finishDelay -= step;

        while ( step > 0 ) {
            var thisStep = Math.min( step, maxStep );
            this.actors.forEach( ( actor ) => {
                actor.act( thisStep, this );
            } );
            step -= thisStep;
        }
    };

    public playerTouched( type: ActorTyper | EnviromentTyper, actor?: tActor ) {
        if ( type == ActorTyper.lava && this.status == null ) {
            this.status = "lost";
            this.finishDelay = 1;
        } else if ( type == ActorTyper.coin ) {
            this.actors = this.actors.filter( function ( other ) {
                return other != actor;
            } );
            if ( !this.actors.some( function ( actor ) {
                return actor.type == ActorTyper.coin;
            } ) ) {
                this.status = "won";
                this.finishDelay = 1;
            }
        }
    };
}