export type GameSettings = {
    scale:number
}
export type CanvasProps = {
    width: number;
    height: number;
    ctx: CanvasRenderingContext2D;
}
export type RenderTools = {
    canvas: CanvasProps,
    shift: LevelShift,
    settings: GameSettings
}
export type LevelShift = {
    yShift: number;
    xShift: number;
}