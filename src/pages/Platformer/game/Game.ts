import { Level } from './Level/Level.class';
import { Drawer } from './Drawer';
import { tLevel } from 'config/levels';
import { CanvasProps } from 'types';


export interface IGame {
    runGame: () => void;
}

export class Game implements IGame {
    private plans: Array<tLevel>;
    private el: HTMLElement;
    private canvas: CanvasProps;
    private winCallBack: Function;

    private runAnimation( frameFunc: Function ) {
        var lastTime: any = null;
        let frame = ( time: number ) => {
            var stop = false;
            if ( lastTime != null ) {
                var timeStep = Math.min( time - lastTime, 100 ) / 1000;
                stop = frameFunc( timeStep ) === false;
            }
            lastTime = time;
            if ( !stop )
                requestAnimationFrame( frame );
        }
        requestAnimationFrame( frame );
    }

    private goTolevel( index: number ) {
        this.runLevel( new Level( this.plans[index] ), ( status: string ) => {
            if ( status == "lost" )
                this.goTolevel( index );
            else if ( index < this.plans.length - 1 )
                this.goTolevel( index + 1 );
            else if ( this.winCallBack )
                this.winCallBack();
        } )
    }

    private runLevel( level: Level, andThen: Function ) {
        var display = new Drawer( this.canvas, level );
        this.runAnimation( function ( step: number ) {
            level.animate( step );
            display.drawFrame();
            if ( level.isFinished() ) {
                display.clear();
                if ( andThen )
                    andThen( level.status );
                return false;
            }
        } );
    }
    public runGame() {
        this.goTolevel( 0 );
    }
    constructor( plans: Array<tLevel>, el: HTMLElement, winCallBack?: Function ) {
        this.el = el;
        this.plans = plans;
        this.winCallBack = winCallBack;

        let canvas = document.createElement( 'canvas' );
        let width = el.offsetWidth;
        let height = el.offsetHeight;
        canvas.width = width;
        canvas.height = height
        this.el.append( canvas );

        this.canvas = {
            width, height,
            ctx: canvas.getContext( '2d' )
        }
    }
}
