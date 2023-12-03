import { MazeChooser } from "../MazeChooser/MazeChooser"
import { useState } from 'react';
import './userPage.css';

export const UserPage = () => {
    const [maze, setMaze] = useState();
    const [name, setName] = useState();
    const [solveMethod, setSolveMethod] = useState();
    const [alg, setAlg] = useState();
    const [type, setType] = useState();
    const [speed, setSpeed] = useState(0.5);
    const [blurAction, setBlurAction] = useState(true);
    const FIRST_SOLVE_ALG = "Первый алгоритм";
    const SECOND_SOLVE_ALG = "Второй алгоритм";
    const FIRST_SOLVE_TYPE = "Пошагово";
    const SECOND_SOLVE_TYPE = "Непрерывно";


    const handleChooseMaze = (chooserMaze) => {
        const el = document.getElementById("maze-chooser");
        if (el.style.opacity === 1 || el.style.opacity === "") {
            el.style.opacity = 0;
            el.style.pointerEvents = 'none';
            el.style.display = 'none';
        }   
        setMaze(JSON.parse(chooserMaze.structure));
        setName(chooserMaze.mazeName);
    }

    const handleChangeSolveMethod = () => {
        if (solveMethod === "alg")
            setSolveMethod("handle");
        else   
            setSolveMethod("alg");
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
        console.dir("start solving")
    }

    return (
        <div id='user-background'>
            <div id='user-maze-name-container'>
                <span>
                    {name}
                </span>
            </div>


            {/* Options */}
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

                <div id="user_method_create" className="user_option" >
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

                <div id="user_method_create" className="user_option" >
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

                <div id="user_method_create" className="user_option" >
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

                <div id="user_settings_action" className={blurAction ? "blurArea" : null}>
                    <button onClick={handleStartSolve}>Начать прохождение</button>
                </div>
            </div>


            <table>
                    <tbody>
                    {
                        maze ?
                            maze.map((array, indexOuter) => {
                                const heightRow = `${610 / maze.length}px`;
                                const widthRow  = `${610 / array.length}px`;
                                const length = maze.length;
                                const width = array.width;
                                let row = array.map((item, index) => {
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
                                            <td style={{height: heightRow, width: widthRow, backgroundColor: "black", border: 'solid 2px rgb(0, 112, 128)'}} key={index + "|" + indexOuter} className="wall" data-x={index} data-y={indexOuter} data-border={((index === 0 && indexOuter === (length - 1)) || (index === 0 && indexOuter === 0) || (index === (width - 1) && indexOuter === 0) || (index === (width - 1) && indexOuter === (length - 1))) ? true : false}></td>
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
        </div>
    )
}