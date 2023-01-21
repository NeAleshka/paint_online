import Brush from "./Brush";

export default class Eraser extends Brush {
    constructor(canvas, socket,id) {
        super(canvas, socket,id);
    }


  static draw(ctx, x, y) {
        ctx.strokeStyle = "white"
        ctx.lineTo(x, y)
        ctx.stroke()
    }
}