import { IVector, Vector } from '../Level/Vector.class';
import { ActorTyper, AnimationProps, AnimStatus, AnimDirection } from './types';
import utl from 'utility';
import { Level } from '../Level/Level.class';
import ArrowTracker from '../ArrowTracker';
import { Drawer } from '../Drawer';
import { Sprite } from '../Animation.class';
// Sprites
import idleLeftSprite from 'assets/tiles/player/p-idle-left.png'
import idleRightSprite from 'assets/tiles/player/p-idle-right.png'
import runRightSprite from 'assets/tiles/player/p-run-right.png';
import runLeftSprite from 'assets/tiles/player/p-run-left.png';

var playerXSpeed = 6;
var gravity = 30;
var jumpSpeed = 17;

export interface IPlayer {
    id: string,
    position: IVector;
    size: IVector;
    speed: IVector;
    type: ActorTyper;

    act: ( step: number, level: Level ) => void;
    render: ( tools: Drawer ) => void
}
// 23 * 27
export class Player implements IPlayer {
    public id: string;
    public position: IVector;
    public size: IVector;
    public speed: IVector;
    public animationProps: AnimationProps;
    public type: ActorTyper = ActorTyper.player;


    private idleLeftSprite: Sprite;
    private idleRightSprite: Sprite;
    private runLeftSprite: Sprite;
    private runRightSprite: Sprite;

    constructor( position: IVector ) {
        this.id = utl.generateGUID();
        this.position = position.plus( new Vector( 0, -0.5 ) );
        this.size = new Vector( 0.60, 0.84 );
        this.speed = new Vector( 0, 0 );

        this.animationProps = {
            status: AnimStatus.idle,
            direction: AnimDirection.right
        }

        this.idleLeftSprite = new Sprite( {
            width: 22,
            height: 27,
            size: this.size,
            imageSrc: idleLeftSprite,
            speed: 7,
            numberOfFrames: 4,
            loop: true
        } );
        this.idleRightSprite = new Sprite( {
            width: 22,
            height: 27,
            size: this.size,
            imageSrc: idleRightSprite,
            speed: 7,
            numberOfFrames: 4,
            loop: true
        } );
        this.runRightSprite = new Sprite( {
            width: 23,
            height: 27,
            size: this.size,
            imageSrc: runRightSprite,
            speed: 3,
            numberOfFrames: 6,
            loop: true
        } );
        this.runLeftSprite = new Sprite( {
            width: 23,
            height: 27,
            size: this.size,
            imageSrc: runLeftSprite,
            speed: 3,
            numberOfFrames: 6,
            loop: true
        } )
    }

    private _defineAnimationProps( NewPosition: Vector ) {
        if ( NewPosition.x > this.position.x ) {
            this.animationProps.direction = AnimDirection.right;
            this.animationProps.status = AnimStatus.run;
        } else if ( NewPosition.x < this.position.x ) {
            this.animationProps.direction = AnimDirection.left;
            this.animationProps.status = AnimStatus.run;
        } else if ( NewPosition.x == this.position.x ) {
            this.animationProps.status = AnimStatus.idle;
        }
    }

    private moveX( step: number, level: Level ) {
        this.speed.x = 0;
        if ( ArrowTracker.arrows.left ) this.speed.x -= playerXSpeed;
        if ( ArrowTracker.arrows.right ) this.speed.x += playerXSpeed;

        var motion = new Vector( this.speed.x * step, 0 );
        var newPos = this.position.plus( motion );
        this._defineAnimationProps( newPos )

        var obstacle = level.obstacleAt( newPos, this );
        if ( obstacle )
            level.playerTouched( obstacle );
        else
            this.position = newPos;
    };
    private moveY( step: number, level: Level ) {
        this.speed.y += step * gravity;
        var motion = new Vector( 0, this.speed.y * step );
        var newPos = this.position.plus( motion );
        var obstacle = level.obstacleAt( newPos, this );
        if ( obstacle ) {
            level.playerTouched( obstacle );
            if ( ArrowTracker.arrows.up && this.speed.y > 0 )
                this.speed.y = -jumpSpeed;
            else
                this.speed.y = 0;
        } else {
            this.position = newPos;
        }
    };
    public act( step: number, level: Level ) {
        this.moveX( step, level );
        this.moveY( step, level );

        var otherActor = level.actorAt( this );
        if ( otherActor )
            level.playerTouched( otherActor.type, otherActor );
        // Losing animation
        if ( level.status == "lost" ) {
            this.position.y += step;
            this.size.y -= step;
        }
    };

    public render( draw: Drawer ) {
        let { scale } = draw.gameSettings, { xShift, yShift } = draw.viewShift,
            { status, direction } = this.animationProps;

            console.log(status, direction)

        if ( status == AnimStatus.idle && direction == AnimDirection.left ) {
            this.idleRightSprite.render( draw, new Vector( this.position.x * scale - xShift, this.position.y * scale - yShift ) )
        }
        if ( status == AnimStatus.idle && direction == AnimDirection.right ) {
            this.idleLeftSprite.render( draw, new Vector( this.position.x * scale - xShift, this.position.y * scale - yShift ) )
        }
        if ( status == AnimStatus.run && direction == AnimDirection.left ) {
            console.log('RUN LEF!')
            this.runLeftSprite.render( draw, new Vector( this.position.x * scale - xShift, this.position.y * scale - yShift ) )
        }
        if ( status == AnimStatus.run && direction == AnimDirection.right ) {
            this.runRightSprite.render( draw, new Vector( this.position.x * scale - xShift, this.position.y * scale - yShift ) )
        }
    }
}