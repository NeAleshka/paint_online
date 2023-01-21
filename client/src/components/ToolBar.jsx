import React from 'react';
import '../styles/toolbar.scss'
import {observer} from "mobx-react-lite";
import canvasState from "../store/canvasState";
import toolState from "../store/toolState";
import Brush from "../tools/Brush";
import Rect from "../tools/Rect";
import Circle from "../tools/Circle";
import Eraser from "../tools/Eraser";
import Line from "../tools/Line";

const ToolBar = observer(() => {

    const activeTool = toolState.activeTool
    const changeColor = (event) => {
        toolState.setStrokeColor(event.target.value)
        toolState.setFillColor(event.target.value)
    }

    return (
        <div className={'toolbar'}>
            <button className={`${activeTool === 'brush' ? 'active_btn' : ''} toolbar__button brush`}
                    onClick={() => toolState.setTool(new Brush(canvasState.canvas,canvasState.socket,canvasState.sessionId), 'brush')}></button>
            <button className={`${activeTool === 'rect' ? 'active_btn' : ''} toolbar__button rect`}
                    onClick={() => toolState.setTool(new Rect(canvasState.canvas,canvasState.socket,canvasState.sessionId), 'rect')}></button>
            <button className={`${activeTool === 'circle' ? 'active_btn' : ''} toolbar__button circle`}
                    onClick={() => toolState.setTool(new Circle(canvasState.canvas,canvasState.socket,canvasState.sessionId), 'circle')}></button>
            <button className={`${activeTool === 'eraser' ? 'active_btn' : ''} toolbar__button eraser`}
                    onClick={() => toolState.setTool(new Eraser(canvasState.canvas,canvasState.socket,canvasState.sessionId), 'eraser')}></button>
            <button className={`${activeTool === 'line' ? 'active_btn' : ''} toolbar__button line`}
                    onClick={() => toolState.setTool(new Line(canvasState.canvas,canvasState.socket,canvasState.sessionId), 'line')}></button>
            <input type={'color'} style={{marginRight: '16px'}} onChange={(event) => changeColor(event)}/>
            <button disabled={!canvasState.undoList.length}
                    className={`${!canvasState.undoList.length ? 'disabled' : ''} toolbar__button undo`}
                    onClick={() => canvasState.undo()}></button>
            <button disabled={!canvasState.redoList.length}
                    className={`${!canvasState.redoList.length ? 'disabled' : ''} toolbar__button redo`}
                    onClick={() => canvasState.redo()}></button>
            <button className="toolbar__button save"></button>
        </div>
    );
});

export default ToolBar;
