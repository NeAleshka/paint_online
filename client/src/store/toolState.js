import {makeAutoObservable} from "mobx";

class ToolState {
    tool = null
    activeTool='brush'
    constructor() {
        makeAutoObservable(this)
    }

    setTool(tool,activeTool) {
        this.tool = tool
        this.activeTool=activeTool || 'brush'
    }
    setFillColor(color) {
        this.tool.fillColor = color
    }
    setStrokeColor(color) {
        this.tool.strokeColor = color
    }
    setLineWidth(width) {
        this.tool.lineWidth = width
    }
}

export default new ToolState()