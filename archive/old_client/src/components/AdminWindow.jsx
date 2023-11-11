import '../styles/admin.css';
import { OptionsMap } from './OptionsMap';
import { serverHook } from '../hooks/serverConnector';
import { useState, useCallback } from 'react';

export const AdminWindow = () => {
    const connector = serverHook();
    const [map, setMap] = useState();
    const [serverAns, setServerAns] = useState(0);

    const handleCreateMap = () => {
        document.getElementById("chooser-container").style.display = "none";
        document.getElementById("options-map").style.display = "block";
        document.getElementById("map-container").style.display = "block";
    }

    const handleRepairOld = () => {
        document.getElementById("chooser-container").style.display = "none";

    }

    const handleCreateMaze = (payload) => {
        connector.createMaze(payload).then(async (ans) => {
            const result = await ans.json();
            setMap(result);
            setServerAns(serverAns + 1);
        })
    }

    
    const scrollCallback = useCallback((event) => { 
        handleManage(event);
    }, [serverAns]);

    function handleManage (event) {
        if (!map)
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
        const x = Number(document.getElementById("person").dataset.index.split(":")[0]);
        const y = Number(document.getElementById("person").dataset.index.split(":")[1]);
        if (dir == 'w') {
            if(!checkOnValid(x - 1, y))
                return;            
            const newMap = map.slice(0);
            newMap[x - 1][y].isCurrent = true;
            newMap[x][y].isCurrent = false;
            setMap(newMap);
        } else if (dir == 's') {
            if(!checkOnValid(x + 1, y))
                return;
            const newMap = map.slice(0);
            newMap[x + 1][y].isCurrent = true;
            newMap[x][y].isCurrent = false;
            setMap(newMap);
        } else if (dir == 'd') {
            if(!checkOnValid(x, y + 1))
                return;
            const newMap = map.slice(0);
            newMap[x][y + 1].isCurrent = true;
            newMap[x][y].isCurrent = false;
            setMap(newMap);
        } else if (dir == 'a') {
            if(!checkOnValid(x, y - 1))
                return;
            const newMap = map.slice(0);
            newMap[x][y - 1].isCurrent = true;
            newMap[x][y].isCurrent = false;
            setMap(newMap);
        }
    }

    const checkOnValid = (x, y) => {
        if (x <= 0 || x >= map.length || y <= 0 || y >= map.length)
            return false;

        if (map[x][y].isWall) 
            return false;

        return true;
    } 

    
    return (
        <div id="main_bg" >
            <div id="chooser-container">
                <button onClick={handleCreateMap}>Создать новую карту</button>
                <button onClick={handleRepairOld}>Редактировать свои карты</button>
            </div>

            <div id="map-container">
                <table>
                    <tbody>
                        {
                            map?.map((array, indexOuter) => {
                                let row = array.map((item, index) => {
                                    if (indexOuter == map.length - 1) {
                                        document.removeEventListener('keyup', scrollCallback);
                                        document.addEventListener('keyup', scrollCallback);
                                    }
                                    const size = `${700 / map.length}px`;
                                    let td;
                                    if (item.isWall) 
                                        td = <td key={index} className="wall" style={{height: size, width: size, backgroundColor: "black"}}>{item.isCurrent ? <div id="person" data-index={`${indexOuter}:${index}`}></div> : null}</td>
                                    else if (item.isStart) {
                                        td = <td key={index} className="start" style={{height: size, width: size}}>{item.isCurrent ? <div id="person" data-index={`${indexOuter}:${index}`}></div> : null}</td>
                                    } else if (item.isFinish) {
                                        td = <td key={index} className="finish" style={{height: size, width: size}}>{item.isCurrent ? <div id="person" data-index={`${indexOuter}:${index}`}></div> : null}</td>
                                    } else 
                                        td = <td key={index} style={{height: size, width: size}}>{item.isCurrent ? <div id="person" data-index={`${indexOuter}:${index}`}></div> : null}</td>
                                    return td;
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
            <OptionsMap handleCreateMaze={handleCreateMaze}/>
        </div>
    )
}