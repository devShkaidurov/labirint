import winter from '../../images/winter.svg';
import spring from '../../images/spring.svg';
import summer from '../../images/summer.svg';
import autumn from '../../images/autumn.svg';
import './themes.css';

export const Theme = ({setTheme}) => {
    return (
        <div id="themes-container">
            <div className="theme" onClick={() => { setTheme("winter") }}>
                <img src={winter}></img>
            </div>

            <div className="theme" onClick={() => { setTheme("spring") }}>
                <img src={spring}></img>
            </div>

            <div className="theme" onClick={() => { setTheme("summer") }}>
                <img src={summer}></img>
            </div>

            <div className="theme" onClick={() => { setTheme("autumn") }}>
                <img src={autumn}></img>
            </div>
        </div>
    )
}