import './styles/app.scss'
import ToolBar from "./components/ToolBar";
import SettingsBar from "./components/SettingsBar";
import Canvas from "./components/Canvas";
import {Navigate, Route, Routes} from "react-router-dom";
import { v4 as idSession } from 'uuid';


function App() {
    return (
        <div className="app">
            <Routes>
                <Route path='/:id' element={<><ToolBar/><SettingsBar/><Canvas/></>}/>
                <Route path='/' element={<><ToolBar/><SettingsBar/><Canvas/>
                    <Navigate to={`${idSession()}`} replace/></>}/>
            </Routes>
        </div>
    );
}

export default App;
