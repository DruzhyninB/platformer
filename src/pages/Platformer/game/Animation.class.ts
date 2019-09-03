import { Drawer } from "./Drawer";
import { Vector } from "./Level/Vector.class";

export interface ISprite {
    render: ( draw: Drawer, position: Vector ) => void
}
export type SpriteSettings = {
    width: number;
    height: number;
    imageSrc: string;
    size:Vector,
    speed: number; // higher - anim slower
    numberOfFrames?: number;
    loop?: boolean;
}
export class Sprite implements ISprite {
    private width: number;
    private height: number;
    private image: HTMLImageElement;
    private size:Vector

    private frameIndex: number;
    private tickCount: number;
    private ticksPerFrame: number;

    private numberOfFrames: number;
    private loop: boolean;

    constructor( options: SpriteSettings ) {
        this.frameIndex = 0;
        this.tickCount = 0;
        this.ticksPerFrame = options.speed || 0;
        this.numberOfFrames = options.numberOfFrames || 1;
        this.loop = options.loop || false;
        this.width = options.width;
        this.height = options.height;
        this.size = options.size;
        let imgEl = new Image();
        imgEl.src = options.imageSrc
        this.image = imgEl;

    }


    public render( draw: Drawer, position: Vector ) {
        this.tickCount++;
        if ( this.tickCount > this.ticksPerFrame ) {
            this.tickCount = 0;
            // If the current frame index is in range
            if ( this.frameIndex < this.numberOfFrames - 1 ) {
                // Go to the next frame
                this.frameIndex++;
            } else  if (this.loop){
                this.frameIndex = 0;
            }
        }
        // Draw the animation
        draw.canvas.ctx.drawImage(
            this.image,
            this.frameIndex * this.width,
            0,
            this.width,
            this.height,
            position.x,
            position.y,
            this.size.x * draw.gameSettings.scale,
            this.size.y * draw.gameSettings.scale);
    };
}