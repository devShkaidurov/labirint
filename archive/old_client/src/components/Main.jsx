import '../styles/main.css';
import { Settings } from './Settings';
import bars from '../images/other/bars.svg';

export const Main = () => {

    // test map 
    const map = [
        [
          {
          "isWall": true,
          "isEntry": false,
          "isExit": false,
          "isMain": false,
          "isEnable": false
        },
          {
          "isWall": true,
          "isEntry": false,
          "isExit": false,
          "isMain": false,
          "isEnable": false
        },
          {
          "isWall": true,
          "isEntry": false,
          "isExit": false,
          "isMain": false,
          "isEnable": false
        },
          {
          "isWall": true,
          "isEntry": false,
          "isExit": false,
          "isMain": false,
          "isEnable": false
        },
          {
          "isWall": true,
          "isEntry": false,
          "isExit": false,
          "isMain": false,
          "isEnable": false
        },
          {
          "isWall": true,
          "isEntry": false,
          "isExit": false,
          "isMain": false,
          "isEnable": false
        },
          {
          "isWall": true,
          "isEntry": false,
          "isExit": false,
          "isMain": false,
          "isEnable": false
        },{
          "isWall": true,
          "isEntry": false,
          "isExit": false,
          "isMain": false,
          "isEnable": false
        },
          {
          "isWall": true,
          "isEntry": false,
          "isExit": false,
          "isMain": false,
          "isEnable": false
        },
          {
          "isWall": true,
          "isEntry": false,
          "isExit": false,
          "isMain": false,
          "isEnable": false
        }
        ],[
          {
          "isWall": true,
          "isEntry": false,
          "isExit": false,
          "isMain": false,
          "isEnable": false
        },
          {
          "isWall": false,
          "isEntry": false,
          "isExit": false,
          "isMain": false,
          "isEnable": false
        },
          {
          "isWall": true,
          "isEntry": false,
          "isExit": false,
          "isMain": false,
          "isEnable": false
        },
          {
          "isWall": false,
          "isEntry": false,
          "isExit": false,
          "isMain": false,
          "isEnable": false
        },
          {
          "isWall": false,
          "isEntry": false,
          "isExit": false,
          "isMain": false,
          "isEnable": false
        },
          {
          "isWall": false,
          "isEntry": false,
          "isExit": false,
          "isMain": false,
          "isEnable": false
        },
          {
          "isWall": false,
          "isEntry": false,
          "isExit": false,
          "isMain": false,
          "isEnable": false
        },{
          "isWall": false,
          "isEntry": false,
          "isExit": false,
          "isMain": false,
          "isEnable": false
        },
          {
          "isWall": false,
          "isEntry": false,
          "isExit": false,
          "isMain": false,
          "isEnable": false
        },
          {
          "isWall": true,
          "isEntry": false,
          "isExit": false,
          "isMain": false,
          "isEnable": false
        }
        ],[
          {
          "isWall": true,
          "isEntry": false,
          "isExit": false,
          "isMain": false,
          "isEnable": false
        },
          {
          "isWall": false,
          "isEntry": false,
          "isExit": false,
          "isMain": false,
          "isEnable": false
        },
          {
          "isWall": true,
          "isEntry": false,
          "isExit": false,
          "isMain": false,
          "isEnable": false
        },
          {
          "isWall": false,
          "isEntry": false,
          "isExit": false,
          "isMain": false,
          "isEnable": false
        },
          {
          "isWall": false,
          "isEntry": false,
          "isExit": false,
          "isMain": false,
          "isEnable": false
        },
          {
          "isWall": true,
          "isEntry": false,
          "isExit": false,
          "isMain": false,
          "isEnable": false
        },
          {
          "isWall": false,
          "isEntry": false,
          "isExit": false,
          "isMain": false,
          "isEnable": false
        },{
          "isWall": false,
          "isEntry": false,
          "isExit": false,
          "isMain": false,
          "isEnable": false
        },
          {
          "isWall": false,
          "isEntry": false,
          "isExit": false,
          "isMain": false,
          "isEnable": false
        },
          {
          "isWall": true,
          "isEntry": false,
          "isExit": false,
          "isMain": false,
          "isEnable": false
        }
        ],[
          {
          "isWall": true,
          "isEntry": false,
          "isExit": false,
          "isMain": false,
          "isEnable": false
        },
          {
          "isWall": false,
          "isEntry": false,
          "isExit": false,
          "isMain": false,
          "isEnable": false
        },
          {
          "isWall": true,
          "isEntry": false,
          "isExit": false,
          "isMain": false,
          "isEnable": false
        },
          {
          "isWall": true,
          "isEntry": false,
          "isExit": false,
          "isMain": false,
          "isEnable": false
        },
          {
          "isWall": true,
          "isEntry": false,
          "isExit": false,
          "isMain": false,
          "isEnable": false
        },
          {
          "isWall": true,
          "isEntry": false,
          "isExit": false,
          "isMain": false,
          "isEnable": false
        },
          {
          "isWall": false,
          "isEntry": false,
          "isExit": false,
          "isMain": false,
          "isEnable": false
        },{
          "isWall": false,
          "isEntry": false,
          "isExit": false,
          "isMain": false,
          "isEnable": false
        },
          {
          "isWall": false,
          "isEntry": false,
          "isExit": false,
          "isMain": false,
          "isEnable": false
        },
          {
          "isWall": true,
          "isEntry": false,
          "isExit": false,
          "isMain": false,
          "isEnable": false
        }
        ],[
          {
          "isWall": true,
          "isEntry": false,
          "isExit": false,
          "isMain": false,
          "isEnable": false
        },
          {
          "isWall": false,
          "isEntry": false,
          "isExit": false,
          "isMain": false,
          "isEnable": false
        },
          {
          "isWall": false,
          "isEntry": false,
          "isExit": false,
          "isMain": false,
          "isEnable": false
        },
          {
          "isWall": false,
          "isEntry": false,
          "isExit": false,
          "isMain": false,
          "isEnable": false
        },
          {
          "isWall": false,
          "isEntry": false,
          "isExit": false,
          "isMain": false,
          "isEnable": false
        },
          {
          "isWall": false,
          "isEntry": false,
          "isExit": false,
          "isMain": false,
          "isEnable": false
        },
          {
          "isWall": false,
          "isEntry": false,
          "isExit": false,
          "isMain": false,
          "isEnable": false
        },{
          "isWall": false,
          "isEntry": false,
          "isExit": false,
          "isMain": false,
          "isEnable": false
        },
          {
          "isWall": false,
          "isEntry": false,
          "isExit": false,
          "isMain": false,
          "isEnable": false
        },
          {
          "isWall": true,
          "isEntry": false,
          "isExit": false,
          "isMain": false,
          "isEnable": false
        }
        ],[
          {
          "isWall": true,
          "isEntry": false,
          "isExit": false,
          "isMain": false,
          "isEnable": false
        },
          {
          "isWall": false,
          "isEntry": false,
          "isExit": false,
          "isMain": false,
          "isEnable": false
        },
          {
          "isWall": false,
          "isEntry": false,
          "isExit": false,
          "isMain": false,
          "isEnable": false
        },
          {
          "isWall": false,
          "isEntry": false,
          "isExit": false,
          "isMain": false,
          "isEnable": false
        },
          {
          "isWall": false,
          "isEntry": false,
          "isExit": false,
          "isMain": false,
          "isEnable": false
        },
          {
          "isWall": false,
          "isEntry": false,
          "isExit": false,
          "isMain": false,
          "isEnable": false
        },
          {
          "isWall": false,
          "isEntry": false,
          "isExit": false,
          "isMain": false,
          "isEnable": false
        },{
          "isWall": false,
          "isEntry": false,
          "isExit": false,
          "isMain": false,
          "isEnable": false
        },
          {
          "isWall": false,
          "isEntry": false,
          "isExit": false,
          "isMain": false,
          "isEnable": false
        },
          {
          "isWall": true,
          "isEntry": false,
          "isExit": false,
          "isMain": false,
          "isEnable": false
        }
        ],[
          {
          "isWall": true,
          "isEntry": false,
          "isExit": false,
          "isMain": false,
          "isEnable": false
        },
          {
          "isWall": false,
          "isEntry": false,
          "isExit": false,
          "isMain": false,
          "isEnable": false
        },
          {
          "isWall": false,
          "isEntry": false,
          "isExit": false,
          "isMain": false,
          "isEnable": false
        },
          {
          "isWall": false,
          "isEntry": false,
          "isExit": false,
          "isMain": false,
          "isEnable": false
        },
          {
          "isWall": false,
          "isEntry": false,
          "isExit": false,
          "isMain": false,
          "isEnable": false
        },
          {
          "isWall": false,
          "isEntry": false,
          "isExit": false,
          "isMain": false,
          "isEnable": false
        },
          {
          "isWall": false,
          "isEntry": false,
          "isExit": false,
          "isMain": false,
          "isEnable": false
        },{
          "isWall": false,
          "isEntry": false,
          "isExit": false,
          "isMain": false,
          "isEnable": false
        },
          {
          "isWall": false,
          "isEntry": false,
          "isExit": false,
          "isMain": false,
          "isEnable": false
        },
          {
          "isWall": true,
          "isEntry": false,
          "isExit": false,
          "isMain": false,
          "isEnable": false
        }
        ],[
          {
          "isWall": true,
          "isEntry": false,
          "isExit": false,
          "isMain": false,
          "isEnable": false
        },
          {
          "isWall": false,
          "isEntry": false,
          "isExit": false,
          "isMain": false,
          "isEnable": false
        },
          {
          "isWall": false,
          "isEntry": false,
          "isExit": false,
          "isMain": false,
          "isEnable": false
        },
          {
          "isWall": false,
          "isEntry": false,
          "isExit": false,
          "isMain": false,
          "isEnable": false
        },
          {
          "isWall": false,
          "isEntry": false,
          "isExit": false,
          "isMain": false,
          "isEnable": false
        },
          {
          "isWall": false,
          "isEntry": false,
          "isExit": false,
          "isMain": false,
          "isEnable": false
        },
          {
          "isWall": false,
          "isEntry": false,
          "isExit": false,
          "isMain": false,
          "isEnable": false
        },{
          "isWall": false,
          "isEntry": false,
          "isExit": false,
          "isMain": false,
          "isEnable": false
        },
          {
          "isWall": false,
          "isEntry": false,
          "isExit": false,
          "isMain": false,
          "isEnable": false
        },
          {
          "isWall": true,
          "isEntry": false,
          "isExit": false,
          "isMain": false,
          "isEnable": false
        }
        ],[
          {
          "isWall": true,
          "isEntry": false,
          "isExit": false,
          "isMain": false,
          "isEnable": false
        },
          {
          "isWall": false,
          "isEntry": false,
          "isExit": false,
          "isMain": false,
          "isEnable": false
        },
          {
          "isWall": false,
          "isEntry": false,
          "isExit": false,
          "isMain": false,
          "isEnable": false
        },
          {
          "isWall": false,
          "isEntry": false,
          "isExit": false,
          "isMain": false,
          "isEnable": false
        },
          {
          "isWall": false,
          "isEntry": false,
          "isExit": false,
          "isMain": false,
          "isEnable": false
        },
          {
          "isWall": false,
          "isEntry": false,
          "isExit": false,
          "isMain": false,
          "isEnable": false
        },
          {
          "isWall": false,
          "isEntry": false,
          "isExit": false,
          "isMain": false,
          "isEnable": false
        },{
          "isWall": false,
          "isEntry": false,
          "isExit": false,
          "isMain": false,
          "isEnable": false
        },
          {
          "isWall": false,
          "isEntry": false,
          "isExit": false,
          "isMain": false,
          "isEnable": false
        },
          {
          "isWall": true,
          "isEntry": false,
          "isExit": false,
          "isMain": false,
          "isEnable": false
        }
        ],[
          {
          "isWall": true,
          "isEntry": false,
          "isExit": false,
          "isMain": false,
          "isEnable": false
        },
          {
          "isWall": true,
          "isEntry": false,
          "isExit": false,
          "isMain": false,
          "isEnable": false
        },
          {
          "isWall": true,
          "isEntry": false,
          "isExit": false,
          "isMain": false,
          "isEnable": false
        },
          {
          "isWall": true,
          "isEntry": false,
          "isExit": false,
          "isMain": false,
          "isEnable": false
        },
          {
          "isWall": true,
          "isEntry": false,
          "isExit": false,
          "isMain": false,
          "isEnable": false
        },
          {
          "isWall": true,
          "isEntry": false,
          "isExit": false,
          "isMain": false,
          "isEnable": false
        },
          {
          "isWall": true,
          "isEntry": false,
          "isExit": false,
          "isMain": false,
          "isEnable": false
        },{
          "isWall": true,
          "isEntry": false,
          "isExit": false,
          "isMain": false,
          "isEnable": false
        },
          {
          "isWall": true,
          "isEntry": false,
          "isExit": false,
          "isMain": false,
          "isEnable": false
        },
          {
          "isWall": true,
          "isEntry": false,
          "isExit": false,
          "isMain": false,
          "isEnable": false
        }
        ]
    ]

    function handleChangeWall (e) {
        if (!e.target.classList.contains("wall"))
            e.target.classList.add("wall");
        else    
            e.target.classList.remove("wall");
    }
    
    function handleCloseSettings () {
      const settings = document.getElementById("settings");
      if (settings.classList.contains("active-settings")) {
        settings.classList.add("animation-close-settings");
        setTimeout(() => {
          settings.classList.remove("active-settings");
          settings.classList.add("unactive-settings");
          document.getElementById("bars").classList.add("active-bar");
          settings.classList.remove("animation-close-settings");
          document.getElementById("bars").classList.remove("unactive-bar");
        }, 1000);

      }
    }

    function handleOpenSettings () {
      if (document.getElementById("bars").classList.contains("active-bar")) {
        document.getElementById("bars").classList.add("unactive-bar");
        setTimeout(() => {
          document.getElementById("bars").classList.remove("active-bar");
          if (document.getElementById("settings").classList.contains("unactive-settings")) {
            document.getElementById("settings").classList.add("animation-open-settings");
            document.getElementById("settings").classList.add("active-settings");
            document.getElementById("settings").classList.remove("unactive-settings");
            setTimeout(() => {
              document.getElementById("settings").classList.remove("animation-open-settings");
            }, 1000);
          }
        }, 1000);
      }
    }

    return (
      <div id="main_bg">

        <div id="settings" className="active-settings">
          <Settings handleClose={handleCloseSettings}/>
        </div>

        <div id="bars" onClick={handleOpenSettings}>
          <img src={bars}></img>
        </div>


        <div id="map">
          <table>
            <tbody>
            {
                map.map((array, indexOuter) => {
                    let row = array.map((item, index) => {
                        if (item.isWall) 
                            return (
                                <td key={index} className="wall" onClick={handleChangeWall}><img></img></td>
                            )
                        else 
                            return (
                                <td key={index} onClick={handleChangeWall}></td>
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
    );
}