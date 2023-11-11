import '../styles/admin-page.css';
import { useState } from 'react';
import next from '../images/next.svg';
import previous from '../images/previous.svg';
import { serverHook } from '../hooks/serverConnector';

export const AdminPage = () => {
    const [menuName, setMenuName] = useState("main"); 
    const [width, setWidth] = useState(9);
    const [heigth, setHeigth] = useState(9);
    const [entryType, setEntryType] = useState();
    const [createMethod, setCreateMethod] = useState();
    const [alg, setAlg] = useState();
    const connector = serverHook();
    const [map, setMap] = useState();

    const handleSetToSize = () => {
        setMenuName("size");
    }

    const handleSetToMain = () => {
        setMenuName("main");
    }

    const handleSetMenuToEntry = () => {
        setMenuName("entry");
    }

    const handleSetMenuToMethodCreate = () => {
        setMenuName("methodCreate");
    }

    const handleSetMenuToConfirm = () => {
        setMenuName("confirm");
    } 
    
    const handleSetMenuToAlg = () => {
        setMenuName("alg");
    }

    const handleSetWidth = (e) => {
        const value = e.target.value;
        if (value < 9) {
            const el = document.getElementById("width-input");
            el.value = 9;
            return;
        }

        if (value > 51) {
            const el = document.getElementById("width-input");
            el.value = 51;
            return;
        }
        setWidth(value);
    }

    const handleSetHeigth = (e) => {
        const value = e.target.value;
        if (value < 9) {
            const el = document.getElementById("heigth-input");
            el.value = 9;
            return;
        }

        if (value > 51) {
            const el = document.getElementById("heigth-input");
            el.value = 51;
            return;
        }
        setHeigth(value);
    }

    const handleChangeEntry = (e) => {
        const value = e.target.value;
        setEntryType(value);
    }

    const handleChangeCreateMethod = (e) => {
        const value = e.target.value;
        setCreateMethod(value);
    }


    const handleChangeAlg = (e) => {
        const value = e.target.value;
        setAlg(value);
    }

    const handleCreate = () => {
        setMenuName("field");
        const payload = {
            x: width,
            y: heigth,
            isHandleEntry: entryType === "handle",
            isHandleGenerate: createMethod === "handle",
            isPrima: alg === "prima"
        };

        connector.createMaze(payload).then(async (ans) => {
            const result = await ans.json();
            setMap(result);
        })
    }


    const displayManager = () => {
        switch (menuName) {
            case "main":
                return (
                    <div id="admin-page">
                        <div id="admin-wrapper">
                            <div className="admin-container">
                                <span>Мои лабиринты</span>
                            </div>
                            <div className="admin-container" onClick={handleSetToSize}>
                                <span>Создать новый лабиринт</span>
                            </div>
                        </div>
                    </div>
                )

            case "size":
                return (
                    <div id="admin-page">
                        <div id="size-wrapper">
                        <span id="header">Настройка размеров лабиринта</span>
                            <div>
                                <label id="width">Ширина</label>
                                <input id="width-input" type="number" step="2" htmlFor="width" min="9" max="51" defaultValue="9" onChange={handleSetWidth}></input>
                            </div>
                            <div>
                                <label id="heigth">Высота</label>
                                <input id="heigth-input" type="number" step="2" htmlFor="heigth" min="9" max="51" defaultValue="9" onChange={handleSetHeigth}></input>
                            </div>
                            <div id="admin-next-prev-menu">
                                <button onClick={handleSetToMain}>
                                    <img src={previous}></img>
                                </button>
                                <button onClick={handleSetMenuToEntry}>
                                    <img src={next}></img>
                                </button>
                            </div>
                        </div>
                    </div>
                )

            case "entry":
                return (
                    <div id="admin-page">
                        <div id="size-wrapper">
                            <span id="header">Как будем расставлять вход и выход?</span>
                            <div>
                                <label id="handleEntry">Вручную</label>
                                <input type="radio" value="handle" name="entry" htmlFor="handleEntry" checked={entryType === "handle"} onChange={handleChangeEntry}></input>
                            </div>
                            <div>
                                <label id="randomlyEntry">Случайно</label>
                                <input type="radio" value="randomly" name="entry" htmlFor="randomlyEntry" checked={entryType === "randomly"} onChange={handleChangeEntry}></input>
                            </div>
                            <div id="admin-next-prev-menu">
                                <button onClick={handleSetToSize}>
                                    <img src={previous}></img>
                                </button>
                                <button disabled={entryType === undefined} onClick={handleSetMenuToMethodCreate}>
                                    <img src={next}></img>
                                </button>
                            </div>
                        </div>
                    </div>
                )

            case "methodCreate":
                    return (
                        <div id="admin-page">
                            <div id="size-wrapper">
                                <span id="header">Как будем создавать лабиринт?</span>
                                <div>
                                    <label id="handleCreateMethod">Вручную</label>
                                    <input type="radio" value="handle" name="createMethod" htmlFor="handleCreateMethod" checked={createMethod === "handle"} onChange={handleChangeCreateMethod}></input>
                                </div>
                                <div>
                                    <label id="scriptCreateMethod">Программно</label>
                                    <input type="radio" value="script" name="createMethod" htmlFor="scriptCreateMethod" checked={createMethod === "script"} onChange={handleChangeCreateMethod}></input>
                                </div>
                                <div id="admin-next-prev-menu">
                                    <button onClick={handleSetMenuToEntry}>
                                        <img src={previous}></img>
                                    </button>
                                    <button disabled={createMethod === undefined} onClick={createMethod === "handle" ? handleSetMenuToConfirm : handleSetMenuToAlg}>
                                        <img src={next}></img>
                                    </button>
                                </div>
                            </div>
                        </div>
                    )

            case "alg":
                return (
                    <div id="admin-page">
                        <div id="size-wrapper">
                            <span id="header">Какой алгоритм будем использовать при генерации лабиринта?</span>
                            <div>
                                <label id="handleCreateMethod">Прима</label>
                                <input type="radio" value="prima" name="alg" htmlFor="handleCreateMethod" checked={alg === "prima"} onChange={handleChangeAlg}></input>
                            </div>
                            <div>
                                <label id="scriptCreateMethod">Бэктрекинга</label>
                                <input type="radio" value="backtracking" name="alg" htmlFor="scriptCreateMethod" checked={alg === "backtracking"} onChange={handleChangeAlg}></input>
                            </div>
                            <div id="admin-next-prev-menu">
                                <button onClick={handleSetMenuToMethodCreate}>
                                    <img src={previous}></img>
                                </button>
                                <button disabled={alg === undefined} onClick={handleSetMenuToConfirm}>
                                    <img src={next}></img>
                                </button>
                            </div>
                        </div>
                    </div>
                )

            case "confirm": 
                return (
                    <div id="admin-page">
                            <div id="size-wrapper">
                                <span id="header">Настройки: </span>
                                <div id="admin-container-settings">
                                    <div>
                                        <span>Ширина: {width}</span>
                                    </div>
                                    <div>
                                        <span>Высота: {heigth}</span>
                                    </div>
                                    <div>
                                        <span>Способ расстановки входа/выхода: {entryType === "handle" ? "Ручной" : "Автоматический"}</span>
                                    </div>
                                    <div>
                                        <span>Способ генерации лабиринта: {createMethod === "handle" ? "Ручной" : "Автоматический"}</span>
                                    </div>
                                    {
                                        createMethod === "handle" ?
                                            null
                                        :
                                            <div>
                                                <span>Алгоритм генерации лабиринта: {alg === "prima" ? "Прима" : "Бэктрекинга"}</span>
                                            </div>

                                    }
                                </div>
                                <div id="admin-next-prev-menu">
                                    <button onClick={createMethod === "handle" ? handleSetMenuToMethodCreate : handleSetMenuToAlg}>
                                        <img src={previous}></img>
                                    </button>
                                    <button >
                                        <img src={next} onClick={handleCreate}></img>
                                    </button>
                                </div>
                            </div>
                        </div>
                )

            case "maze":
                return (
                    <div>
                        There is map
                    </div>
                )
    
        }
        
    }

    return (
        displayManager()
    )
}
