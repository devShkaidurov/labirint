import './adminPage.css';
import { Show }  from '../Noty/Noty';
import { handleCloseNoty }  from '../Noty/Noty';
import { useState } from 'react';
import { ConfirmForm } from './ConfirmForm/ConfirmForm';
import { serverConnector } from '../../serverConnector';
import floppyDisk from '../../images/save.svg';

// x = j
// y = i
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
    const connector = serverConnector();

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
        const startCell = Array.from(document.getElementsByClassName("start"));
        const finishCell = Array.from(document.getElementsByClassName("finish"));
        if (startCell.length > 0) {
            startCell[0].classList.remove('start');
            startCell[0].classList.add("wall");
        }

        if (finishCell.length > 0) {
            finishCell[0].classList.remove('finish');
            finishCell[0].classList.add("wall");
        }

        const value = e.target.value;
        
        if (value === "handle") {
            handleSetStart();
        } else if (value === "random") {
            randomSetEntry();
        }

        setEntryType(value);
    }

    const handleGetRandomEntry = () => {
        if (entryType === "random") {
            randomSetEntry();
        }
    }

    const randomSetEntry = () => {
        connector.getEntries(map).then(async (payload) => {
            const ans = await payload.json();
            const start = ans.start;
            const finish = ans.finish;
            const arrayMap = [].concat(map);
            arrayMap.forEach((row, y) => {
                row.forEach((cell, x) => {
                    if (cell.isFinish)
                        cell.isFinish = false;
                    if (cell.isStart)
                        cell.isStart = false;
                    if (start.x === x && start.y === y)
                        cell.isStart = true;
                    if (finish.x === x && finish.y === y)
                        cell.isFinish = true;
                })
            })
            setMap(arrayMap);
        }, rej => {
            console.error(rej);
        })
        .catch(e => {
            console.error(e);
        })
    }



    const addPotentialStart = (event) => {
        const wall = event.target;
        wall.classList.add("potetial-start");
    }

    const removePotentialStart = (event) => {
        const wall = event.target;
        if (wall.classList.contains("potetial-start")) {
            wall.classList.remove("potetial-start");
        }
    }

    const startCell = {};
    const clickPotentialStart = (event) => {
        const wall = event.target;
        if (wall.classList.contains("potetial-start")) {
            wall.classList.remove("potetial-start");
            wall.classList.add("start-cell");
            startCell.x = parseInt(wall.dataset.x);
            startCell.y = parseInt(wall.dataset.y);
        }
        handleSetFinish();
    }

    const addPotentialFinish = (event) => {
        const wall = event.target;
        wall.classList.add("potetial-finish");
    }

    const removePotentialFinish = (event) => {
        const wall = event.target;
        if (wall.classList.contains("potetial-finish")) {
            wall.classList.remove("potetial-finish");
        }
    }

    const finishCell = {};
    const clickPotentialFinish = (event) => {
        const wall = event.target;
        if (wall.classList.contains("potetial-finish")) {
            wall.classList.remove("potetial-finish");
            wall.classList.add("finish-cell");
            finishCell.x = parseInt(wall.dataset.x);
            finishCell.y = parseInt(wall.dataset.y);
        }
        handleCleanFinishWall();
    }

    const handleSetStart = () => {
        const adminSettings = document.getElementById("admin_settings");
        const bg = document.getElementById('admin_bg');

        adminSettings.style.opacity = 0.4;
        adminSettings.style.pointerEvents = 'none';
        bg.className = 'bg_blur';

        Show("Выберите клетку для входа в лабиринт!", 'alert', 100000, false);
        const walls = Array.from(document.getElementsByClassName("wall"));
        walls.forEach((wall) => {
            if (wall.dataset.border === 'true') 
                return;

            wall.classList.add("flashing-start");
            wall.addEventListener('mouseover', addPotentialStart);
            wall.addEventListener('mouseout', removePotentialStart);
            wall.addEventListener('click', clickPotentialStart)
        })
    }

    const handleSetFinish = () => {
        // clean previous states
        handleCloseNoty();
        Show("Теперь выберите клетку для выхода из лабиринта!", 'alert', 100000, false);
        const walls = Array.from(document.getElementsByClassName("wall"));
        walls.forEach(wall => {
            wall.classList.remove("flashing-start");
            wall.removeEventListener('mouseover', addPotentialStart);
            wall.removeEventListener('mouseout', removePotentialStart);
            wall.removeEventListener('click', clickPotentialStart)
        })
        
        const needToBlockCell = [];
        if (startCell.x == 1 && startCell.y == 0) {
            needToBlockCell.push({
                x: 2,
                y: 0
            })
            needToBlockCell.push({
                x: 0,
                y: 1
            })
            needToBlockCell.push({
                x: 0,
                y: 2
            })
        } else if (startCell.x == 2 && startCell.y === 0) {
            needToBlockCell.push({
                x: 3,
                y: 0
            })
            needToBlockCell.push({
                x: 1,
                y: 0
            })
            needToBlockCell.push({
                x: 0,
                y: 1
            })
            needToBlockCell.push({
                x: 0,
                y: 2
            })
        } else if (startCell.x === width - 2 && startCell.y === 0) {
            needToBlockCell.push({
                x: width - 3,
                y: 0
            })
            needToBlockCell.push({
                x: width - 1,
                y: 1
            })
            needToBlockCell.push({
                x: width - 1,
                y: 2
            })
        } else if (startCell.x === width - 3 && startCell.y == 0) {
            needToBlockCell.push({
                x: width - 4,
                y: 0
            })
            needToBlockCell.push({
                x: width - 2,
                y: 0
            })
            needToBlockCell.push({
                x: width - 1,
                y: 1
            })
            needToBlockCell.push({
                x: width - 1,
                y: 2
            })
        } else if (startCell.x === 0 && startCell.y == 1) {
            needToBlockCell.push({
                x: 0,
                y: 2
            })
            needToBlockCell.push({
                x: 1,
                y: 0
            })
            needToBlockCell.push({
                x: 2,
                y: 0
            })
        } else if (startCell.x === 0 && startCell.y === 2) {
            needToBlockCell.push({
                x: 0,
                y: 1
            })
            needToBlockCell.push({
                x: 0,
                y: 3
            })
            needToBlockCell.push({
                x: 1,
                y: 0
            })
            needToBlockCell.push({
                x: 2,
                y: 0
            })
        } else if (startCell.x === width - 1 && startCell.y === 1) {
            needToBlockCell.push({
                x: width - 1,
                y: 2
            })
            needToBlockCell.push({
                x: width - 2,
                y: 0
            })
            needToBlockCell.push({
                x: width - 3,
                y: 0
            })
        } else if (startCell.x === width - 1 && startCell.y === 2) {
            needToBlockCell.push({
                x: width - 1,
                y: 1
            })
            needToBlockCell.push({
                x: width - 1,
                y: 3
            })
            needToBlockCell.push({
                x: width - 2,
                y: 0
            })
            needToBlockCell.push({
                x: width - 3,
                y: 0
            })
        } else if (startCell.x === 0 && startCell.y === height - 3) {
            needToBlockCell.push({
                x: 0,
                y: height - 2
            })
            needToBlockCell.push({
                x: 0,
                y: height - 4
            })
            needToBlockCell.push({
                x: 1,
                y: height - 1
            })
            needToBlockCell.push({
                x: 2,
                y: height - 1
            })
        } else if (startCell.x === 0 && startCell.y === height - 2) {
            needToBlockCell.push({
                x: 0,
                y: height - 3
            })
            needToBlockCell.push({
                x: 1,
                y: height - 1
            })
            needToBlockCell.push({
                x: 2,
                y: height - 1
            })
        } else if (startCell.x === 1 && startCell.y === height - 1) {
            needToBlockCell.push({
                x: 2,
                y: height - 1
            })
            needToBlockCell.push({
                x: 0,
                y: height - 2
            })
            needToBlockCell.push({
                x: 0,
                y: height - 3
            })
        } else if (startCell.x === 2 && startCell.y === height - 1) {
            needToBlockCell.push({
                x: 1,
                y: height - 1
            })
            needToBlockCell.push({
                x: 3,
                y: height - 1
            })
            needToBlockCell.push({
                x: 0,
                y: height - 2
            })
            needToBlockCell.push({
                x: 0,
                y: height - 3
            })
        } else if (startCell.x === width - 3 && startCell.y === height - 1) {
            needToBlockCell.push({
                x: width - 4,
                y: height - 1
            })
            needToBlockCell.push({
                x: width - 2,
                y: height - 1
            })
            needToBlockCell.push({
                x: width - 1,
                y: height - 2
            })
            needToBlockCell.push({
                x: width - 1,
                y: height - 3
            })
        } else if (startCell.x === width - 2 && startCell.y === height - 1) {
            needToBlockCell.push({
                x: width - 3,
                y: height - 1
            })
            needToBlockCell.push({
                x: width - 1,
                y: height - 2
            })
            needToBlockCell.push({
                x: width - 1,
                y: height - 3
            })
        } else if (startCell.x === width - 1 && startCell.y === height - 2) {
            needToBlockCell.push({
                x: width - 1,
                y: height - 1
            })
            needToBlockCell.push({
                x: width - 2,
                y: height - 1
            })
            needToBlockCell.push({
                x: width - 1,
                y: height - 3
            })
            needToBlockCell.push({
                x: width - 3,
                y: height - 1
            })
        } else if (startCell.x === width - 1 && startCell.y === height - 3) {
            needToBlockCell.push({
                x: width - 1,
                y: height - 4
            })
            needToBlockCell.push({
                x: width - 1,
                y: height - 2
            })
            needToBlockCell.push({
                x: width - 3,
                y: height - 1
            })
            needToBlockCell.push({
                x: width - 2,
                y: height - 1
            })
        } else if (startCell.x === 0) {
            needToBlockCell.push({
                x: 0,
                y: startCell.y - 1
            })
            needToBlockCell.push({
                x: 0,
                y: startCell.y + 1
            })
        } else if (startCell.x === width - 1) {
            needToBlockCell.push({
                x: width - 1,
                y: startCell.y - 1
            })
            needToBlockCell.push({
                x: width - 1,
                y: startCell.y + 1
            })
        } else if (startCell.y === 0) {
            needToBlockCell.push({
                x: startCell.x + 1,
                y: 0
            })
            needToBlockCell.push({
                x: startCell.x - 1,
                y: 0
            })
        } else if (startCell.y === height - 1) {
            needToBlockCell.push({
                x: startCell.x + 1,
                y: height - 1
            })
            needToBlockCell.push({
                x: startCell.x - 1,
                y: height - 1
            })
        }
       
       
        walls.forEach((wall, index) => {
            const banned = needToBlockCell.find(cell => {
                return cell.x === parseInt(wall.dataset.x) && cell.y === parseInt(wall.dataset.y);
            });
            if (wall.classList.contains("start-cell") || banned || wall.dataset.border === 'true')
                return;

            wall.classList.add("flashing-finish");
            wall.addEventListener('mouseover', addPotentialFinish);
            wall.addEventListener('mouseout', removePotentialFinish);
            wall.addEventListener('click', clickPotentialFinish)
        })
    }


    const setOpenConfirmForm = () => {
        const el = document.getElementById("confirm-container");
        console.dir(el);
        if (parseInt(el.style.opacity) === 1) {
            console.dir("block");
            el.style.opacity = 0;
            el.style.pointerEvents = 'none'
        } else {
            console.dir("able");
            el.style.opacity = 1;
            el.style.pointerEvents = 'all';
        }
    }

    const handleCleanFinishWall = () => {
        const arrayMap = new Array(height);
        for (let i = 0; i < height; i++) {
            arrayMap[i] = new Array(width);
            for (let j = 0; j < width; j++) {
                arrayMap[i][j] = {};
                if (i == 0 || i == height - 1 || j == 0 || j == width - 1)
                    arrayMap[i][j].isWall = true;
                else 
                    arrayMap[i][j].isWall = false; 

                if (finishCell.x === j && finishCell.y === i) {
                    arrayMap[i][j].isFinish = true;
                }
                
                if (startCell.x === j && startCell.y === i)
                    arrayMap[i][j].isStart = true;
            }
        }
        setMap(arrayMap);

        const walls = Array.from(document.getElementsByClassName("wall"));
        walls.forEach(wall => {
            if (wall.classList.contains("flashing-finish")) {
                wall.classList.remove("flashing-finish");
            }
            wall.removeEventListener('mouseover', addPotentialFinish);
            wall.removeEventListener('mouseout', removePotentialFinish);
            wall.removeEventListener('click', clickPotentialFinish);
        });
        handleCloseNoty();

        const adminSettings = document.getElementById("admin_settings");
        const bg = document.getElementById('admin_bg');

        adminSettings.style.opacity = 1;
        adminSettings.style.pointerEvents = 'all';
        if (bg.classList.contains("bg_blur"))
            bg.classList.remove("bg_blur");
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

    const manageCreateMaze = () => {
        if (methodCreate === "handle") 
            handleCreateMaze();
        // else if (methodCreate === "alg") 
        //     algCreateMaze();
    }

    const handleBuildWall = (e) => {
        const el = e.target;
        console.dir(el);
        if (el.classList.contains("avaliable")) {
            el.classList.remove("avaliable");
            el.classList.add("potential-wall");
        } else {
            el.classList.add("avaliable");
            el.classList.remove("potential-wall");
        }
    } 

    const handleCreateMaze = () => {
        const adminSettings = document.getElementById("admin_settings");
        const bg = document.getElementById('admin_bg');
        adminSettings.style.opacity = 0.4;
        adminSettings.style.pointerEvents = 'none';
        bg.className = 'bg_blur';
        Show("Творите!", 'alert', 99999999, false);

        setOpenConfirmForm();
        const tds = Array.from(document.getElementsByTagName("td"));
        const avaliable = tds.filter(el => !el.classList.contains("wall"));
        avaliable.forEach(el => {
            el.classList.add("avaliable");
            el.addEventListener('click', handleBuildWall);
        })

    }

    const handleReadyCF = () => {
        handleCloseNoty();
        const arrayMap = [].concat(map);
        const potentialWall = Array.from(document.getElementsByClassName("potential-wall"));
        potentialWall.forEach(el => {
            arrayMap[el.dataset.y][el.dataset.x].isWall = true;
        })
        connector.validateMaze(arrayMap).then(async (result) => {
            // const isValid = await result.json();
            const isValid = true;
            const saveBtn = document.getElementById("admin-floppy-disk");
            if (isValid) {
                saveBtn.style.pointerEvents = 'all';
                saveBtn.style.opacity = 1;

                const avaliable = Array.from(document.getElementsByTagName("td")).filter(el => !el.classList.contains("wall"));
                avaliable.forEach(el => {
                    el.classList.remove("avaliable");
                    el.removeEventListener('click', handleBuildWall);
                })

                setMap(arrayMap);
                setOpenConfirmForm();
                Show('Ваш лабиринт верен, можете его сохранить!', 'success', 3000, true);
                const adminSettings = document.getElementById("admin_settings");
                const bg = document.getElementById('admin_bg');
                adminSettings.style.opacity = 1;
                adminSettings.style.pointerEvents = 'all';
                bg.className = '';
            } else {
                saveBtn.style.pointerEvents = 'none';
                saveBtn.style.opacity = 0;
                Show('Ваш лабиринт неверен, исправьте стенки!', 'error', 3000, true);
            }
        }, rej => {
            console.error(rej);
        }).catch(e => {
            console.error(e);
        })
    }


    const handleRejectCF = () => {  
        const tds = Array.from(document.getElementsByTagName("td"));
        tds.forEach(el => {
            if (el.classList.contains("wall"))
                return;
            
            el.removeEventListener('click', handleBuildWall);

            if (el.classList.contains("potential-wall")) {
                el.classList.remove("potential-wall");
            }

            if (el.classList.contains("avaliable")) {
                el.classList.remove("avaliable");
            }
        })

        const adminSettings = document.getElementById("admin_settings");
        const bg = document.getElementById('admin_bg');
        adminSettings.style.opacity = 1;
        adminSettings.style.pointerEvents = 'all';
        bg.className = '';
        setMethodCreate(undefined)
        handleCloseNoty();
        setBlurAction(true);
        setOpenConfirmForm();
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
                            <input type="radio" name="entry" id="admin_entry_random" value="random" checked={entryType === "random"} onChange={handleChangeEntry} onClick={handleGetRandomEntry}></input>
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
                    <button onClick={manageCreateMaze}>Создать</button>
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
                                if (item.isStart) {
                                    return (
                                        <td style={{height: heightRow, width: widthRow}} key={index + "|" + indexOuter} className="wall start" data-x={index} data-y={indexOuter} data-border={((index === 0 && indexOuter === (height - 1)) || (index === 0 && indexOuter === 0) || (index === (width - 1) && indexOuter === 0) || (index === (width - 1) && indexOuter === (height - 1))) ? true : false}></td>
                                    )
                                }

                                if (item.isFinish) {
                                    return (
                                        <td style={{height: heightRow, width: widthRow}} key={index + "|" + indexOuter} className="wall finish" data-x={index} data-y={indexOuter} data-border={((index === 0 && indexOuter === (height - 1)) || (index === 0 && indexOuter === 0) || (index === (width - 1) && indexOuter === 0) || (index === (width - 1) && indexOuter === (height - 1))) ? true : false}></td>
                                    )
                                }

                                if (item.isWall) {
                                    // console.dir("x: " + index + " | y: " + indexOuter);
                                    return (
                                        <td style={{height: heightRow, width: widthRow, backgroundColor: "black", border: 'solid 2px white'}} key={index + "|" + indexOuter} className="wall" data-x={index} data-y={indexOuter} data-border={((index === 0 && indexOuter === (height - 1)) || (index === 0 && indexOuter === 0) || (index === (width - 1) && indexOuter === 0) || (index === (width - 1) && indexOuter === (height - 1))) ? true : false}></td>
                                    )
                                } else 
                                    return (
                                        <td style={{height: heightRow, width: widthRow, backgroundColor: "#007080", border: 'solid 2px white'}} key={index + "|" + indexOuter} data-x={index} data-y={indexOuter}></td>
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

            <ConfirmForm handleReady={handleReadyCF} handleReject={handleRejectCF}/>
           

            <div id='admin-floppy-disk'>
                <button title='Сохранить лабиринт'>
                    <img src={floppyDisk}></img>
                </button>
            </div>
        </div>
    )
}