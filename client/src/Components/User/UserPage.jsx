import { MazeChooser } from "../MazeChooser/MazeChooser"
import { useState, useCallback } from 'react';
import { serverConnector } from '../../serverConnector';
import { Show }  from '../Noty/Noty';
import './userPage.css';
import { useEffect } from "react";
import step from '../../images/step.svg';
import { Theme } from "../Theme/Theme";
import winter from '../../images/winter.svg';
import spring from '../../images/spring.svg';
import summer from '../../images/summer.svg';
import autumn from '../../images/autumn.svg';

export const UserPage = () => {
    const [maze, setMaze] = useState();
    const [name, setName] = useState();
    const [solveMethod, setSolveMethod] = useState();
    const [alg, setAlg] = useState();
    const [type, setType] = useState();
    const [speed, setSpeed] = useState(0.5);
    const [viewOptions, setViewOptions] = useState(false);
    const FIRST_SOLVE_ALG = "Алгоритм Ли";
    const SECOND_SOLVE_ALG = "Второй алгоритм";
    const FIRST_SOLVE_TYPE = "Пошагово";
    const SECOND_SOLVE_TYPE = "Непрерывно";
    const connector = serverConnector();
    const [path, setPath] = useState();
    const [stepSolve, setStepSolve] = useState();
    const [indexPath, setIndexPath] = useState();
    const [theme, setTheme] = useState("no-theme");
    const [update, setUpdate] = useState(0);

    const themes = {
        "winter" : winter,
        "spring" : spring,
        "autumn" : autumn,
        "summer" : summer
    };


    useEffect(() => {
        if (!path || stepSolve === true)
            return;
        for (let index = 0; index < path.length; index++) {
            setTimeout(() => {
                const currentCellPath = path[index];
                const x = currentCellPath[1];
                const y = currentCellPath[0];
                const newMap = new Array(maze.length);
                for (let i = 0; i < maze.length; i++) {
                    newMap[i] = new Array(maze[0].length)
                    for (let j = 0; j < maze[0].length; j++) {
                        newMap[i][j] = maze[i][j];
                        if (i === x && j === y) 
                            newMap[i][j].isCurrent = true;
                    }
                }
                setMaze(newMap);
            }, (200 * index + 100) / (speed * 10))
        }

        setTimeout(() => {
            Show("Лабиринт пройден!", "success", 2000, false);
        }, (200 * path.length + 150) / (speed * 10))
    }, [path])


    const handleChooseMaze = (chooserMaze) => {
        const el = document.getElementById("maze-chooser");
        if (el.style.opacity === 1 || el.style.opacity === "") {
            el.style.opacity = 0;
            el.style.pointerEvents = 'none';
            el.style.display = 'none';
        }   
        setMaze(JSON.parse(chooserMaze.structure));
        setName(chooserMaze.mazeName);
        setViewOptions(true);
    }

    const handleChangeSolveMethod = () => {
        if (solveMethod === "alg") {
            setSolveMethod("handle");
            setAlg();
            setType();
        } else {
            setSolveMethod("alg");
        }
    }

    const handleChangeAlg = () => {
        if (alg === FIRST_SOLVE_ALG)
            setAlg(SECOND_SOLVE_ALG);
        else   
            setAlg(FIRST_SOLVE_ALG);
    }

    const handleChangeType = () => {
        if (type === FIRST_SOLVE_TYPE) 
            setType(SECOND_SOLVE_TYPE);
        else    
            setType(FIRST_SOLVE_TYPE);
    }

    const handleChangeSpeed = (e) => {
        setSpeed(e.target.value);
    }

    const handleStartSolve = () => {
        console.dir("Способ прохождения: " + solveMethod);
        console.dir("Алгоритм прохождения: " + alg);
        console.dir("Тип прохождения: " + type);
        console.dir("Скорость прохождения: " + speed);
        if (solveMethod === "handle") {
            // start handly solving maze
            solveMaze();
        } else {
            // send data to server for work with algs
            connector.getPath({alg: alg, maze: maze}).then( async (res) => {
                const payload = await res.json();
                const path = payload.path;
                setPath(path);
                if (type === FIRST_SOLVE_TYPE) {
                    setStepSolve(true);
                    setIndexPath(0);
                }
            }, rej => {
                Show(rej, 'error', 5000, true);
            })
            .catch(e => {
                Show(e, 'error', 5000, true);
            })   
        }
    }

    const handleDoStep = () => {
        if (indexPath === path.length) {
            Show("Лабиринт пройден!", "success", 2000, false);
            setStepSolve(false);
            return;
        }
        const currentCellPath = path[indexPath];
        const x = currentCellPath[1];
        const y = currentCellPath[0];
        const newMap = new Array(maze.length);
        for (let i = 0; i < maze.length; i++) {
            newMap[i] = new Array(maze[0].length)
            for (let j = 0; j < maze[0].length; j++) {
                newMap[i][j] = maze[i][j];
                if (i === x && j === y) 
                    newMap[i][j].isCurrent = true;
            }
        }
        setMaze(newMap);
        setIndexPath(prev => prev + 1)
    }

    // const scrollCallback = (event) => { 
    //     console.dir("eee")
    //     handleManage(event);
    // };

    const solveMaze = () => {
        document.addEventListener('keyup', scrollCallback);
        maze.forEach((row, y) => {
            row.forEach((cell, x) => {
                const els = Array.from(document.getElementsByTagName("td"));
                if (cell.isStart)
                    cell.isCurrent = true;
            })
        })
        setUpdate(update + 1);
    }

    const scrollCallback = useCallback((event) => { 
        handleManage(event);
    }, [maze, update]);

    function handleManage (event) {
        console.dir(maze);
        console.dir("Key event")
        if (!maze)
            return;
        const keyCodes = {
            87: 'w',
            83: 's',
            68: 'd',
            65: 'a'
        };
        movePerson(keyCodes[event.keyCode])
    }

    const movePerson = (dir) => {
        console.dir(document.getElementById("person"))
        const y = Number(document.getElementById("person").dataset.x);
        const x = Number(document.getElementById("person").dataset.y);
        if (dir == 'a') {
            if(!checkOnValid(x, y - 1))
                return;            
            const newMap = maze.slice(0);
            newMap[x][y - 1].isCurrent = true;
            newMap[x][y].isCurrent = false;
            console.dir(newMap);
            setMaze(newMap);
        } else if (dir == 'd') {
            if(!checkOnValid(x, y + 1))
                return;
            const newMap = maze.slice(0);
            newMap[x][y + 1].isCurrent = true;
            newMap[x][y].isCurrent = false;
            setMaze(newMap);
        } else if (dir == 's') {
            console.dir(checkOnValid(x + 1, y));
            console.dir(x + 1);
            console.dir(y);
            if(!checkOnValid(x + 1, y))
                return;
            const newMap = maze.slice(0);
            newMap[x + 1][y].isCurrent = true;
            newMap[x][y].isCurrent = false;
            console.dir(newMap);
            setMaze(newMap);
        } else if (dir == 'w') {
            if(!checkOnValid(x - 1, y))
                return;
            const newMap = maze.slice(0);
            newMap[x - 1][y].isCurrent = true;
            newMap[x][y].isCurrent = false;
            setMaze(newMap);
        }
    }

    const checkOnValid = (x, y) => {
        console.dir("1st: " + (x <= 0 || x >= maze.length || y <= 0 || y >= maze.length));
        console.dir(maze)
        if (x <= 0 || x >= maze.length || y <= 0 || y >= maze.length)
            return false;

        if (maze[x][y].isWall) 
            return false;

        return true;
    } 

    return (
        <div id='user-background'>
            <div id='user-maze-name-container'>
                <span>
                    {name}
                </span>
            </div>


            {/* Options */}
            {
                viewOptions ?
                    <div id='user-options-maze-solution'>
                        <div id="user_settings_header"><span>Параметры лабиринта</span></div>
                        <div id="user_alg" className="user_option" >
                            <div className="user_option_header">
                                <span>Способ прохождения лабиринта</span>
                            </div>
                            <div className="user_option_body">
                                <div>
                                    <input type="radio" name="method_create" id="user_method_create_handle" checked={solveMethod === "handle"} value="handle" onChange={handleChangeSolveMethod}></input>
                                    <label htmlFor="user_method_create_handle">Вручную</label>
                                </div>
                                <div>
                                    <input type="radio" name="method_create" id="user_method_create_alg" checked={solveMethod === "alg"} value="alg" onChange={handleChangeSolveMethod}></input>
                                    <label htmlFor="user_method_create_alg">Алгоритмом</label>
                                </div>
                            </div>
                        </div>

                        <div id="user_method_create" className={solveMethod === "alg" ? "user_option" : "user_option blurArea"} >
                            <div className="user_option_header">
                                <span>Алгоритм прохождения лабиринта</span>
                            </div>
                            <div className="user_option_body">
                                <div>
                                    <input type="radio" name="alg" id={"user_alg" + FIRST_SOLVE_ALG} checked={alg === FIRST_SOLVE_ALG} value={FIRST_SOLVE_ALG} onChange={handleChangeAlg}></input>
                                    <label htmlFor={"user_alg" + FIRST_SOLVE_ALG}>{FIRST_SOLVE_ALG}</label>
                                </div>
                                <div>
                                    <input type="radio" name="alg" id={"user_alg" + SECOND_SOLVE_ALG} checked={alg === SECOND_SOLVE_ALG} value={SECOND_SOLVE_ALG} onChange={handleChangeAlg}></input>
                                    <label htmlFor={"user_alg" + SECOND_SOLVE_ALG}>{SECOND_SOLVE_ALG}</label>
                                </div>
                            </div>
                        </div>

                        <div id="user_type_create" className={alg ? "user_option" : "user_option blurArea"} >
                            <div className="user_option_header">
                                <span>Тип прохождения лабиринта</span>
                            </div>
                            <div className="user_option_body">
                                <div>
                                    <input type="radio" name="type" id={"user_type" + FIRST_SOLVE_TYPE} checked={type === FIRST_SOLVE_TYPE} value={FIRST_SOLVE_TYPE} onChange={handleChangeType}></input>
                                    <label htmlFor={"user_type" + FIRST_SOLVE_TYPE}>{FIRST_SOLVE_TYPE}</label>
                                </div>
                                <div>
                                    <input type="radio" name="type" id={"user_type" + SECOND_SOLVE_TYPE} checked={type === SECOND_SOLVE_TYPE} value={SECOND_SOLVE_TYPE} onChange={handleChangeType}></input>
                                    <label htmlFor={"user_type" + SECOND_SOLVE_TYPE}>{SECOND_SOLVE_TYPE}</label>
                                </div>
                            </div>
                        </div>

                        <div id="user_solve_speed" className={type && type === SECOND_SOLVE_TYPE? "user_option" : "user_option blurArea"} >
                            <div className="user_option_header" style={{paddingBottom: '25px'}}>
                                <span>Скорость непрервыного прохождения</span>
                            </div>
                            <div className="user_option_body">
                                <div>
                                    <label htmlFor="solveSpeed">Скорость</label>
                                    <input type="range" id="solveSpeed" name="solveSpeed" step={0.01} value={speed} min={0.01} max={0.99} onChange={handleChangeSpeed} style={{ marginTop: "8px", marginLeft: "5px"}}></input>
                                </div>
                            </div>
                        </div>

                        <div id="user_settings_action" className={type ? null : solveMethod === "handle" ? null : "blurArea"} >
                            <button onClick={handleStartSolve}>Начать прохождение</button>
                        </div>
                    </div>
                : 
                    null
            }


            <table>
                    <tbody>
                    {
                        maze ?
                            maze.map((array, indexOuter) => {
                                console.dir("Theme: " + theme)
                                const heightRow = `${610 / maze.length}px`;
                                const widthRow  = `${610 / array.length}px`;
                                const length = maze.length;
                                const width = array.width;
                                let row = array.map((item, index) => {
                                    if (item.isCurrent) {
                                        return (
                                            <td style={{height: heightRow, width: widthRow}} key={index + "|" + indexOuter} id="person" className={`current ${item.isFinish ? "wall finish" : null} ${item.isStart ? "wall start" : null}`} data-x={index} data-y={indexOuter} data-border={((index === 0 && indexOuter === (length - 1)) || (index === 0 && indexOuter === 0) || (index === (width - 1) && indexOuter === 0) || (index === (width - 1) && indexOuter === (maze.length - 1))) ? true : false}><img src={themes[theme]}></img></td>
                                        )
                                    }

                                    if (item.isStart) {
                                        return (
                                            <td style={{height: heightRow, width: widthRow}} key={index + "|" + indexOuter} className="wall start" data-x={index} data-y={indexOuter} data-border={((index === 0 && indexOuter === (length - 1)) || (index === 0 && indexOuter === 0) || (index === (width - 1) && indexOuter === 0) || (index === (width - 1) && indexOuter === (maze.length - 1))) ? true : false}></td>
                                        )
                                    }

                                    if (item.isFinish) {
                                        return (
                                            <td style={{height: heightRow, width: widthRow}} key={index + "|" + indexOuter} className="wall finish" data-x={index} data-y={indexOuter} data-border={((index === 0 && indexOuter === (length - 1)) || (index === 0 && indexOuter === 0) || (index === (width - 1) && indexOuter === 0) || (index === (width - 1) && indexOuter === (maze.length - 1))) ? true : false}></td>
                                        )
                                    }


                                    if (item.isWall) {
                                        return (
                                            <td style={{height: heightRow, width: widthRow, backgroundColor: "black", border: 'solid 2px rgb(0, 112, 128)'}} key={index + "|" + indexOuter} className={`wall ${theme}-cell`} data-x={index} data-y={indexOuter} data-border={((index === 0 && indexOuter === (length - 1)) || (index === 0 && indexOuter === 0) || (index === (width - 1) && indexOuter === 0) || (index === (width - 1) && indexOuter === (length - 1))) ? true : false}></td>
                                        )
                                    } else 
                                        return (
                                            <td style={{height: heightRow, width: widthRow, backgroundColor: "#007080", border: 'solid 2px rgb(0, 112, 128)'}} key={index + "|" + indexOuter} data-x={index} data-y={indexOuter}></td>
                                        )
                                })

                                return (
                                    <tr key={"tr" + indexOuter}>
                                        {row}
                                    </tr>
                                )
                            })
                        : null
                    }
                    </tbody>
                </table>


            <MazeChooser handleChooseMaze={handleChooseMaze}/>

            {
                stepSolve ? 
                    <div id='user-step-container' onClick={handleDoStep}>
                        <span>Шаг</span>
                        <img src={step}></img>
                    </div>
                :
                null
            }

            <Theme setTheme={setTheme}/>
        </div>
    )
}