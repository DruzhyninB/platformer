export interface IVector {
    x: number,
    y: number,
    plus: ( vector: IVector ) => IVector,
    times: ( factor: number ) => IVector
}
export class Vector implements IVector {
    public x: number;
    public y: number;

    constructor( x: number, y: number ) {
        this.x = x;
        this.y = y;
    }
    public plus = ( vector: IVector ) => new Vector(
        this.x + vector.x,
        this.y + vector.y
    );

    public times = ( factor: number ) => new Vector(
        this.x * factor,
        this.y * factor
    );
}