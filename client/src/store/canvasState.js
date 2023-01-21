import {makeAutoObservable} from "mobx";

class ToolState{
    canvas=null
    undoList=[]
    redoList=[]
    userName=null
    sessionId=null
    socket=null
    constructor() {
        makeAutoObservable(this)
    }

    setCanvas(canvas){
        this.canvas=canvas
    }

    setSessionId(id){
        this.sessionId=id
    }

    setSocket(socket){
        this.socket=socket
    }
    pushToUndo=(data)=>{
        this.undoList.push(data)
        this.wsSend('draw',{
            type:'setUndoList',
            list:this.undoList
        })
    }

    undo(){
        let ctx=this.canvas.getContext('2d')
        let dataUrl=this.undoList.pop()
        if(this.undoList.length>0){
            this.redoList.push(this.canvas.toDataURL())
            let img=new Image()
            img.src=dataUrl
            img.onload=()=>{
                ctx.clearRect(0,0, this.canvas.width,this.canvas.height)
                ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height)
            }
        }
        else {
            ctx.clearRect(0,0, this.canvas.width,this.canvas.height)
        }
        this.wsSend('draw',{
            type:'undoRedo',
            dataUrl,
            redoList:this.redoList,
            undoList:this.undoList,
        })
    }

    wsUndoRedo(ctx, dataUrl, width, height){
        let img=new Image()
        img.src=dataUrl
        img.onload=()=>{
            ctx.clearRect(0,0, width,height)
            ctx.drawImage(img, 0, 0, width, height)
        }
    }

    redo(){
        let ctx=this.canvas.getContext('2d')
        if(this.redoList.length){
            let dataUrl=this.redoList.pop()
            this.undoList.push(this.canvas.toDataURL())
            let img = new Image()
            img.src = dataUrl
            img.onload =  () => {
                ctx.clearRect(0,0, this.canvas.width, this.canvas.height)
                ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height)
            }
        this.wsSend('draw',{
            type:'undoRedo',
            dataUrl,
            redoList:this.redoList,
            undoList:this.undoList,
        })
        }
    }

    setUndoList(list){
        this.undoList=list
    }

    setRedoList(list){
        this.redoList=list
    }

    setUserName(name){
        this.userName=name
    }

    wsSend(method,figure){
        this.socket.send(JSON.stringify({
            method,
            id:this.sessionId,
            figure
        }))
    }
}

export default new ToolState()