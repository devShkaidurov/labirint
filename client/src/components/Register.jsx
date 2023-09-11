import '../styles/register.css';
import { useState } from 'react';
import { serverHook } from '../hooks/serverConnector';
import eye from '../images/other/eye.svg';
import eye_slash from '../images/other/eye-slash.svg';

function Register() {
    const [pass, setPass] = useState("");
    const [login, setLogin] = useState("");
    const obj = serverHook();

    function handleEnter () {
        console.dir(pass);
        console.dir(login);
        console.dir(obj)
        obj.findUser({password: pass, login: login}).then(ans => {
            console.dir(ans);
        })
    }

    function handleChangeLogin (e) {
        setLogin(e.target.value);
    }

    function handleChangePass (e) {
        setPass(e.target.value);
    }

    function watchPassword (e) {
        console.dir(e);
    }

    return (
        <div id="body_for_register">
            <div id="container_for_register">
                <div id="header">
                    <span id="header_span">Регистрация</span>
                </div>

                <div id="main">
                    <div>
                        <div id="login_block">
                            <span>Логин</span>
                            <div className="container-input"><input type="email" placeholder='Введите Вашу эл. почту' onChange={handleChangeLogin}></input></div>
                        </div>

                        <div id="pass_block">
                            <span>Пароль</span>
                            <div className="container-input">
                                <input type="password" placeholder='Придумайте пароль' onChange={handleChangePass}></input>
                                <img src={eye} className="icon_for_password" onClick={watchPassword}></img>
                            </div>
                        </div>
                    </div>

                    <div id="register_enter" onClick={handleEnter}>
                        <button>Регистрация</button>
                    </div>
                </div>


                <div id="footer">
                    <span>Уже есть аккаунт?</span><button>Войти</button>
                </div>
            </div>
        </div>

    )
}

export default Register;