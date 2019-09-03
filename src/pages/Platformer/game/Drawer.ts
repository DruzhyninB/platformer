import { Level } from "./Level/Level.class";
import { CanvasProps, LevelShift, GameSettings } from 'types';
import clouds from 'assets/tiles/background/clouds.png';
import ground from 'assets/tiles/background/far-grounds.png';
import sea from 'assets/tiles/background/sea.png';
import sky from 'assets/tiles/background/sky.png';

export interface IDrawer {
    canvas: CanvasProps;
    level: Level;
    actorLayer: any;
}
export class Drawer implements IDrawer {
    public canvas: CanvasProps;
    public level: Level;
    public actorLayer: any;
    public viewShift:LevelShift = {
        yShift: 0,
        xShift: 0
    }
    public gameSettings: GameSettings = {
        scale:64
    }

    public clear() {
        let { width, height, ctx } = this.canvas;
        ctx.clearRect( 0, 0, width, height );
    }

    public drawBackground() {
        let { width, height, ctx } = this.canvas;
        let tempCanvas = document.createElement( 'canvas' ),
            tempCtx = tempCanvas.getContext( '2d' );

        // let { xShift } = this.viewShift;
        // let bgShift = xShift%width;

        let cloudsImage = new Image(),
            groundImage = new Image(),
            seaSprite = new Image(),
            seaSpriteAdjustment = 150,
            skySprite = new Image();
        cloudsImage.src = clouds;
        groundImage.src = ground;groundImage.width = 616; groundImage.height = 110;
        seaSprite.src = sea; seaSprite.width = 112; seaSprite.height = 96;
        skySprite.src = sky; skySprite.width = 112; skySprite.height = 304;

        //Draw sky
        tempCanvas.width = skySprite.width; tempCanvas.height = height;
        tempCtx.drawImage( skySprite, 0, 0, skySprite.width, skySprite.height, 0, 0, skySprite.width, height );
        ctx.fillStyle = ctx.createPattern( tempCanvas, 'repeat-x' );
        ctx.fillRect( 0, 0, width, height );
        //Draw ground
        ctx.drawImage( groundImage, 200, 200, 816, 310 );
        //Draw sea
        tempCanvas.width = seaSprite.width; tempCanvas.height = height;
        tempCtx.drawImage( seaSprite, 0, 0, seaSprite.width, seaSprite.height, 0, height - seaSprite.height - seaSpriteAdjustment, seaSprite.width, seaSprite.height + seaSpriteAdjustment );
        ctx.fillStyle = ctx.createPattern( tempCanvas, 'repeat-x' );
        ctx.fillRect( 0, 0, width, height );

        // ctx.drawImage( bgImage, 3, 3, 510, 430, -bgShift, 0, width, height );
        // ctx.drawImage( bgImage, 3, 3, 510, 430, width-bgShift, 0, width, height );
    }
    public drawStaticObjects() {
        this.level.enviroment.forEach( env => {
            env.render(this);
        } )
    }
    public drawActors() {
        this.level.actors.forEach( ( actor ) => {
            actor.render(this);
        } );
    };

    private setViewShift() {
        let { scale } = this.gameSettings;
        let { width, height } = this.canvas;
        let { yShift, xShift } = this.viewShift;
        let wMargin = width / 3, hMargin = height / 4;
        let top = yShift,
            bottom = yShift + height,
            left = xShift,
            right = xShift + width;

        var player = this.level.player;
        var center = player.position.plus( player.size.times( 0.5 ) )
            .times( scale );

        if ( center.x < left + wMargin )
            this.viewShift.xShift = Math.ceil( center.x - wMargin );
        else if ( center.x > right - wMargin )
            this.viewShift.xShift = Math.ceil( center.x + wMargin - width );
        if ( center.y < top + hMargin )
            this.viewShift.yShift = Math.ceil( center.y - hMargin );
        else if ( center.y > bottom - hMargin )
            this.viewShift.yShift = Math.ceil( center.y + hMargin - height );
    }

    public drawFrame() {
        this.clear();
        this.setViewShift();
        this.drawBackground();
        this.drawStaticObjects();
        this.drawActors();
    }
    constructor( canvas: CanvasProps, level: Level ) {
        this.level = level;
        this.canvas = canvas;
        this.actorLayer = null;
        this.drawFrame();
    }

};
