import '../styles/admin.css';
import { OptionsMap } from './OptionsMap';
import { serverHook } from '../hooks/serverConnector';
import { useState } from 'react';
import Noty from './Noty';

export const AdminWindow = () => {
    const connector = serverHook();
    const [map, setMap] = useState();
    const notitier = new Noty();

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
            console.dir(result);
            setMap(result);
        })
    }

    const handleStep = () => {
        connector.doStep().then(async (ans) => {
            const result = await ans.json();
            setMap(result);
        })
    }

    return (
        <div id="main_bg">
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
                                
                                 if (item.visit) {
                                    return (
                                        <td key={index} style={{height: `${700 / map.lenght}px`, backgroundColor: "green"}}></td>
                                    )
                                }
                                else if (item.isWall) 
                                    return (
                                        <td key={index} className="wall" style={{height: `${700 / map.lenght}px`}}><img></img></td>
                                    )
                                else 
                                    return (
                                        <td key={index} style={{height: `${700 / map.lenght}px`}}></td>
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
            <OptionsMap handleCreateMaze={handleCreateMaze}/>
            <button onClick={handleStep}>Шаг</button>
        </div>
    )
}