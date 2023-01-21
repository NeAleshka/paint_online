import Tool from "./Tool";
import {useLocalStore} from "mobx-react-lite";
import canvasState from "../store/canvasState";
import toolState from "../store/toolState";

export default class Brush extends Tool{
    constructor(canvas, socket,id) {
        super(canvas,socket,id);
        this.listen()
    }

    listen(){
        this.canvas.onmousedown=this.mouseDownHandler.bind(this)
        this.canvas.onmouseup=this.mouseUpHandler.bind(this)
        this.canvas.onmousemove=this.mouseMoveHandler.bind(this)
    }

    mouseUpHandler(){
        this.mouseDown=false
        this.socket.send(JSON.stringify({
            method:'draw',
            id:this.id,
            figure:{
                type:'finish',
            },
        }))
    }

    mouseDownHandler(event){
        this.mouseDown=true
        this.ctx.beginPath()
        this.ctx.moveTo(event.pageX-event.target.offsetLeft,event.pageY-event.target.offsetTop)
    }

    mouseMoveHandler(event){
        if (this.mouseDown){
            this.socket.send(JSON.stringify({
                method:'draw',
                id:this.id,
                figure:{
                    type:toolState.activeTool,
                    x:event.pageX-event.target.offsetLeft,
                    y:event.pageY-event.target.offsetTop,
                },
            }))
        }
    }
   static draw(ctx, x,y){
      if (toolState.activeTool==='eraser') {
          ctx.strokeStyle = "white"
      }
        ctx.lineTo(x,y)
        ctx.stroke()
    }
}