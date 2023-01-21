import React from 'react';
import '../styles/toolbar.scss'
import toolState from "../store/toolState";

const SettingsBar = () => {
    return (
        <div className={'settings_bar'}>
            <label htmlFor={'line_width'}>Толщина Линии</label>
            <input
                type={'number'}
                onChange={(event)=>toolState.setLineWidth(event.target.value)}
                id={'line_width'}
                defaultValue={1}
                min={1}
                max={50}/>
            <label htmlFor={'stroke_color'}>Цвет обводки</label>
            <input
                type={'color'}
                onChange={(event)=>toolState.setStrokeColor(event.target.value)}
                id={'stroke_color'}
                defaultValue={1}
                min={1}
                max={50}/>
        </div>
    );
};

export default SettingsBar;