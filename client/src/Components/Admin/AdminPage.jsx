import './adminPage.css';
import { Show }  from '../Noty/Noty';
import { useState } from 'react';

export const AdminPage = () => {
    const MAXVALUE = 19;
    const MINVALUE = 9;
    const [width, setWidth] = useState(MINVALUE);
    const [height, setHeight] = useState(MINVALUE);
    const [blurAction, setBlurAction] = useState(true);
    const [entryType, setEntryType] = useState();
    const [methodCreate, setMethodCreate] = useState();
    const [alg, setAlg] = useState();
    const [map, setMap] = useState();

    const handleSetHeight = (e) => {
        const value = e.target.value;
        setHeight(value);
    }

    const handleSetWidth = (e) => {
        const value = e.target.value;
        setWidth(value);
    }

    const handleBlurWidth = (e) => {
        const value = e.target.value;
        if (value < MINVALUE) {
            setWidth(MINVALUE);
            Show(`Ширина не может быть меньше ${MINVALUE}!`, 'error');
        } else if (value > MAXVALUE) {
            setWidth(MAXVALUE);
            Show(`Ширина не может быть больше ${MAXVALUE}!`, 'error');

        }
        createTester();
    }

    const handleBlurHeight = (e) => {
        const value = e.target.value;
        if (value < MINVALUE) {
            setHeight(MINVALUE);
            Show(`Высота не может быть меньше ${MINVALUE}!`, 'error');
        } else if (value > MAXVALUE) {
            setHeight(MAXVALUE);
            Show(`Высота не может быть больше ${MAXVALUE}!`, 'error');
        
        }
        createTester();
    }

    const handleChangeEntry = (e) => {
        const value = e.target.value;
        
        if (value === "handle") {
            handleSetStart();
            handleSetFinish();
        }

        setEntryType(value);


    }

    const handleSetStart = () => {
        const adminSettings = document.getElementById("admin_settings");
        const bg = document.getElementById('admin_bg');

        adminSettings.style.opacity = 0.4;
        adminSettings.style.pointerEvents = 'none';
        bg.className = 'bg_blur';

        Show("Выберите клетку для входа в лабиринт!", 'alert')
    }

    const handleSetFinish = () => {

    }

    const handleChangeMethodCreate = (e) => {
        const value = e.target.value;
        if (value === "handle") {
            setAlg();
            if (entryType) 
                setBlurAction(false);
        } else {
            setBlurAction(true);
        }
        setMethodCreate(value);
    }

    const handleChangeAlg = (e) => {
        const value = e.target.value;
        setAlg(value);
        if (entryType) 
            setBlurAction(false);
    }

    const createTester = () => {
        const arrayMap = new Array(height);
        for (let i = 0; i < height; i++) {
            arrayMap[i] = new Array(width);
            for (let j = 0; j < width; j++) {
                if (i == 0 || i == height - 1 || j == 0 || j == width - 1)
                    arrayMap[i][j] = { isWall: true }
                else 
                    arrayMap[i][j] = { isWall: false } 
            }
        }
        setMap(arrayMap);
    }

    return (
        <div id="admin_bg">

            {/* settings for maze */}
            <div id="admin_settings">
                <div id="admin_settings_header"><span>Параметры лабиринта</span></div>
                <div id="admin_sizes" className="admin_option">
                    <div className="admin_option_header">
                        <span>Размеры</span>
                    </div>
                    <div className="admin_option_body">
                        <div id="admin_width">
                            <span>Ширина</span>
                            <input type="number" step="2" min={MINVALUE} max={MAXVALUE} value={width} onChange={handleSetWidth} onBlur={handleBlurWidth}></input>
                        </div>
                        <div id="admin_height">
                            <span>Высота</span>
                            <input type="number" step="2" min={MINVALUE} max={MAXVALUE} value={height} onChange={handleSetHeight} onBlur={handleBlurHeight}></input>
                        </div>
                    </div>
                </div>

                <div id="admin_entries" className="admin_option">
                    <div className="admin_option_header">
                        <span>Способ расстановки входа/выхода</span>
                    </div>
                    <div className="admin_option_body">
                        <div>
                            <input type="radio" name="entry" id="admin_entry_handle" value="handle" checked={entryType === "handle"} onChange={handleChangeEntry}></input>
                            <label htmlFor="admin_entry_handle">Вручную</label>
                        </div>
                        <div>
                            <input type="radio" name="entry" id="admin_entry_random" value="random" checked={entryType === "random"} onChange={handleChangeEntry}></input>
                            <label htmlFor="admin_entry_random">Случайно</label>
                        </div>
                    </div>
                </div>

                <div id="admin_method_create" className="admin_option" >
                    <div className="admin_option_header">
                        <span>Способ создания лабиринта</span>
                    </div>
                    <div className="admin_option_body">
                        <div>
                            <input type="radio" name="method_create" id="admin_method_create_handle" checked={methodCreate === "handle"} value="handle" onChange={handleChangeMethodCreate}></input>
                            <label htmlFor="admin_method_create_handle">Вручную</label>
                        </div>
                        <div>
                            <input type="radio" name="method_create" id="admin_method_create_alg" checked={methodCreate === "alg"} value="alg" onChange={handleChangeMethodCreate}></input>
                            <label htmlFor="admin_method_create_alg">Алгоритмом</label>
                        </div>
                    </div>
                </div>

                <div id="admin_alg" className={methodCreate && methodCreate === "alg" ? "admin_option" : "admin_option blurArea"} >
                    <div className="admin_option_header">
                        <span>Алгоритм создания лабиринта</span>
                    </div>
                    <div className="admin_option_body">
                        <div>
                            <input type="radio" name="alg" id="admin_alg_prima" value="prima" checked={alg === "prima"} onChange={handleChangeAlg}></input>
                            <label htmlFor="admin_alg_prima">Прима</label>
                        </div>
                        <div>
                            <input type="radio" name="alg" id="admin_alg_bt" value="backtracking" checked={alg === "backtracking"} onChange={handleChangeAlg}></input>
                            <label htmlFor="admin_alg_bt">Бэктрекинга</label>
                        </div>
                    </div>
                </div>

                <div id="admin_settings_action" className={blurAction ? "blurArea" : null}>
                    <button>Создать</button>
                </div>
            </div>


            {/* maze field */}
            <div id="admin_maze">
                <table>
                    <tbody>
                    {
                        map?.map((array, indexOuter) => {
                            const heightRow = `${document.getElementById("admin_maze")?.clientHeight / height}px`;
                            const widthRow  = `${document.getElementById("admin_maze")?.clientWidth / width}px`;
                            let row = array.map((item, index) => {
                                if (item.isWall) 
                                    return (
                                        <td style={{height: heightRow, width: widthRow, backgroundColor: "black", border: 'solid 2px white'}} key={index} className="wall" ></td>
                                    )
                                else 
                                    return (
                                        <td style={{height: heightRow, width: widthRow, backgroundColor: "green", border: 'solid 2px white'}} key={index}></td>
                                    )
                            })

                            return (
                                <tr key={"tr" + indexOuter}>
                                    {row}
                                </tr>
                            )
                        })
                    }
                    </tbody>
                </table>
            </div>
        </div>
    )
}