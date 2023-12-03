import { useEffect, useState } from 'react';
import { serverConnector } from '../../serverConnector';
import { Show }  from '../Noty/Noty';
import './mazeChooser.css';

export const MazeChooser = ({handleChooseMaze}) => {
    const [mazes, setMazes] = useState();
    const connector = serverConnector();
    
    useEffect(() => {
        connector.getMazes().then( async (res) => {
            const payload = await res.json();
            console.dir(payload);
            setMazes(payload);
        }, rej => {
            Show(rej, 'error', 5000, true);
            
        })
        .catch(e => {
            Show(e, 'error', 5000, true);
        })   
    }, []);

    const handleClick = (e) => {
        let index = -1;
        if (e.target.nodeName.toLowerCase() === "span") 
            index = e.target.parentNode.id.split("_")[1];
        else
            index = e.target.id.split("_")[1];
        handleChooseMaze(mazes[index]);
    }

    return (
        <div id='maze-chooser'>
            {
                mazes?.map((maze, index) => {
                    const dateMySQL = new Date(maze.creationTime).toISOString().slice(0, 19).replace('T', ' ');
                    const time = dateMySQL.split(" ")[1];
                    let hours = time.split(":")[0];
                    const mins = time.split(":")[1];

                    const date = dateMySQL.split(" ")[0].replaceAll('-', '.');
                    let year = date.split(".")[0];                    
                    let month = date.split(".")[1];                    
                    let day = date.split(".")[2]; 

                    if (hours + 4 >= 24) {
                        hours = parseInt(hours) + 4 - 24;
                    }

                    return (
                        <div key={index} id={"maze_" + index} className='maze' onClick={handleClick}>
                            <span key={index + "span1"} className="maze_name">{maze.mazeName}</span>
                            <span key={index + "span2"} className="creationTime">{hours + ":" + mins}</span>
                            <span key={index + "span3"} className="creationTime">{day + "." + month + "." + year}</span>
                        </div>
                    )
                })
            }
        </div>
    )
}