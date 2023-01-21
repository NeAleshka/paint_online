import React, {useEffect, useRef, useState} from 'react';
import '../styles/canvas.scss'
import {observer} from "mobx-react-lite";
import canvasState from "../store/canvasState";
import toolState from "../store/toolState";
import Brush from "../tools/Brush";
import Modal from "./Modal";
import {useLocation} from "react-router-dom";
import Circle from "../tools/Circle";
import Rect from "../tools/Rect";
import Eraser from "../tools/Eraser";
import Line from "../tools/Line";

const Canvas =observer (() => {
    const canvasRef=useRef()
    const [showModal,setShowModal]=useState(true)
    const {pathname:idSession}=useLocation()
    const clientWidth=document.body.clientWidth


    useEffect(()=>{
        if(canvasState.userName){
            const socket=new WebSocket('ws://localhost:5000/')
            canvasState.setSocket(socket)
            canvasState.setSessionId(idSession)
            toolState.setTool(new Brush(canvasRef.current,socket,idSession))
            socket.onopen=()=>{
                socket.send(JSON.stringify({
                    id:canvasState.sessionId,
                    userName:canvasState.userName,
                    method:'connection'
                }))
            }
            socket.onmessage=(event)=>{
                let {msg,allClientsName} = JSON.parse(event.data)
                switch (msg.method){
                    case 'connection':
                        console.log(`Пользователь ${msg.userName} подключился`)
                        console.log('allClientsName',allClientsName)
                        break
                    case 'draw':{
                        drawHandler(msg)
                        break
                    }
                }
            }
        }
    },[canvasState.userName])

    useEffect(()=>{
        canvasState.setCanvas(canvasRef.current)
        toolState.setTool(new Brush(canvasRef.current))
    },[])


    const mouseDownHandler = () => {
        canvasState.pushToUndo(canvasRef.current.toDataURL())
    }

    const drawHandler =(msg)=>{
        const figure=msg.figure
        const ctx=canvasRef.current.getContext('2d')
        switch (figure.type){
            case 'brush':{
                Brush.draw(ctx,figure.x,figure.y)
                break
            }
            case 'circle':{
                Circle.staticDraw(ctx,figure.x,figure.y,figure.r)
                ctx.beginPath()
                break
            }
            case 'rect':{
                Rect.staticDraw(ctx,figure.x,figure.y,figure.width,figure.height)
                ctx.beginPath()
                break
            }
            case 'eraser':{
                Eraser.draw(ctx,figure.x,figure.y)
                break
            }

            case 'line':{
                Line.staticDraw(ctx,figure.startX,figure.startY,figure.endX,figure.endY)
                ctx.beginPath()
                break
            }

            case 'undoRedo':{
                canvasState.setUndoList(figure.undoList)
                canvasState.setRedoList(figure.redoList)
                canvasState.wsUndoRedo(ctx,figure.dataUrl,canvasRef.current.clientWidth,canvasRef.current.clientHeight )
                break
            }

            case 'setUndoList':{
                canvasState.setUndoList(figure.list)
                break
            }

            case 'finish':{
                ctx.beginPath()
                break
            }
        }
    }

    return (
        <div className={'canvas'}>
            <Modal showModal={showModal} setShowModal={setShowModal}/>
            <canvas onMouseDown={()=>mouseDownHandler()} width={1400} height={800} ref={canvasRef}/>
        </div>
    );
});

export default Canvas;