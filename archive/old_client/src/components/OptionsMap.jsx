import '../styles/options.css';
import { useState } from 'react';
import Noty from './Noty';

export const OptionsMap = (props) => {
    const [methodCreateLab, setMethodCreateLab] = useState("");
    const [nameAlg, setNameAlg] = useState("");
    const [col, setCol] = useState();
    const [row, setRow] = useState();
    const notitier = new Noty();

    const handleClickRB = (e) => {
        console.dir(e);
        const value = e.target.id;
        if (value == "handle") 
            setMethodCreateLab("handle");
        else 
            setMethodCreateLab("auto");
        setNameAlg("");
    }   

    const handleClickAlgRB = (e) => {
        const value = e.target.id;
        if (value == "prima")
            setNameAlg("prima");
        else 
            setNameAlg("euler");
    }

    const handleEnterRow = (e) => {
        const value = e.target.value;
        if (value >= 9 && value <= 1511) {
            if (value % 2 == 1) {
                setRow(value);
            } else {
                // notitier.showNoty("Вы ввели четное количество строк!", 3000);
            }
        } else {
            // notitier.showNoty("Количество строк должно быть больше 9 и меньше 51!", 3000);
        }
    }

    const handleEnterCol = (e) => {
        const value = e.target.value;
        if (value >= 9 && value <= 1511) {
            if (value % 2 == 1) {
                setCol(value);
            } else {
                // notitier.showNoty("Вы ввели четное количество столбцов!", 3000);
            }
        } else {
            // notitier.showNoty("Количество столбцов должно быть больше 9 и меньше 51!", 3000);
        }
    }

    const handleCreateMaze = () => {
        props.handleCreateMaze({x: col, y: row});
    }

    return (
        <div id="options-map">
            <div id="option-map-header">Настройки карты</div>

            <div id="option-map-options">
                <div className="option-row-col" >
                    <div style={{margin: "10px 0px 0px 0px"}}>
                        <span>Строки</span>
                        <input type="text" placeholder='9, 11, 13, 15...' onChange={handleEnterRow}></input>
                    </div>

                    <div style={{margin: "15px 0px 10px 0px"}}>
                        <span>Столбцы</span>
                        <input type="text" placeholder='9, 11, 13, 15...' onChange={handleEnterCol}></input>
                    </div>
                </div>

                <div className="option-row-col">
                    <span style={{width: "100%", display: "flex", justifyContent: "center"}}>Способ создания лабиринта</span>
                    <div style={{ display: "flex", flexFlow: "column", left: "-5px"}}>
                        <div onClick={handleClickRB} style={{margin: "5px 0px 7px 0px"}}><input type="radio" id="handle" name="handle" value="handle" checked={methodCreateLab == "handle"} readOnly></input><label htmlFor="handle">Ручной</label></div>
                        <div onClick={handleClickRB} style={{margin: "0px 0px 10px 0px"}}><input type="radio" id="auto" name="auto" value="auto" checked={methodCreateLab == "auto"} readOnly></input><label htmlFor="auto">Автоматический</label></div>
                    </div>
                </div>

                <div className="option-row-col">
                <span style={{width: "100%", display: "flex", justifyContent: "center"}}>Алгоритм создания лабиринта</span>
                    <div style={{ display: "flex", flexFlow: "column", left: "-5px"}}>
                        <div onClick={handleClickAlgRB} style={{margin: "5px 0px 7px 0px"}}><input type="radio" id="euler" name="euler" value="euler" checked={nameAlg == "euler"} readOnly disabled={methodCreateLab == "handle"}></input><label htmlFor="euler">Эйлера</label></div>
                        <div onClick={handleClickAlgRB} style={{margin: "0px 0px 10px 0px"}}><input type="radio" id="prima" name="prima" value="prima" checked={nameAlg == "prima"} readOnly disabled={methodCreateLab == "handle"}></input><label htmlFor="prima">Прима</label></div>
                    </div>
                </div>
            </div>
            
            <div id="container_for_button_options_map">
                <button onClick={handleCreateMaze}> Создать лабиринт</button>
            </div>
        </div>
    )
}