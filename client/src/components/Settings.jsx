import '../styles/settings.css';
import closeImg from "../images/other/close.svg";


export const Settings = (props) => {

    const handleClose = props.handleClose;



    const displayManager = () => {
        return (
            <div>
                <div id="header-settings">
                    <span>Настройки</span>
                    <button onClick={handleClose}><img src={closeImg}></img></button>
                </div>

                <div id="container-for-settings">

                </div>
            </div>
        )
    }


    return (
        displayManager()
    )
}