interface ITrackArrow {
    arrows: {
        up: boolean,
        left: boolean
        right: boolean
    }
};
class TrackArrow implements ITrackArrow {
    constructor() {
        this.isListening = true;
        this.arrowsState = {
            up: false,
            left: false,
            right: false
        }
        document.addEventListener( "keydown", this.eventHandler );
        document.addEventListener( "keyup", this.eventHandler );
    }
    private isListening: boolean;
    private arrowsState: {
        up: boolean,
        left: boolean,
        right: boolean
    }
    private arrowKeys: Object = {
        37: "left",
        38: "up",
        39: "right"
    }
    private eventHandler = ( event: KeyboardEvent ) => {
        if ( this.arrowKeys.hasOwnProperty( event.keyCode ) ) {
            var down = event.type == "keydown";
            this.arrowsState[this.arrowKeys[event.keyCode]] = down;
            event.preventDefault();
        }
    }
    get arrows() {
        return this.arrowsState;
    }
    public listen() {
        if ( !this.isListening ) {
            document.addEventListener( "keydown", this.eventHandler );
            document.addEventListener( "keyup", this.eventHandler );
            this.isListening = true;
        }
    }
    public dispose() {
        if ( this.isListening ) {
            document.removeEventListener( "keydown", this.eventHandler );
            document.removeEventListener( "keyup", this.eventHandler );
            this.isListening = false;
        }
    }
}
const ArrowTracker:ITrackArrow = new TrackArrow();
export default ArrowTracker;