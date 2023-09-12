import '../styles/register.css';
import { useState } from 'react';
import { serverHook } from '../hooks/serverConnector';
import eye from '../images/other/eye.svg';
import eye_slash from '../images/other/eye-slash.svg';
import Noty from './Noty';

function Register() {
    const [pass, setPass] = useState("");
    const [login, setLogin] = useState("");
    const [isOpenPass, setIsOpenPass] = useState(false);
    const [isRegister, setIsRegister] = useState(false);
    const [isCorrectPass, setIsCorrectPass] = useState(false);
    const [isCorrectLogin, setIsCorrectLogin] = useState(false);
    const connector = serverHook();
    const notitier = new Noty();


    function handleEnter () {
        if(!(isCorrectLogin && isCorrectPass)) {
            notitier.showNoty("Проверьте Ваши данные!", 3000);
            return;
        }

        if (isRegister) {
            connector.registerUser({password: pass, login: login}).then(ans => {
                console.dir(ans);
            })
        } else {
            connector.authUser({password: pass, login: login}).then(ans => {
                console.dir(ans);
            })
        }
    }

    function handleChangeLogin (e) {
        if (!e.target.value.match(/[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g)) {
            if (!e.target.parentElement.classList.contains("error_data"))
                e.target.parentElement.classList.add("error_data");
            setIsCorrectLogin(false);
        } else {
            if (e.target.parentElement.classList.contains("error_data"))
                e.target.parentElement.classList.remove("error_data");
            setIsCorrectLogin(true);
        }
        setLogin(e.target.value);
    }

    function handleChangePass (e) {
        if (e.target.value.length > 5 && e.target.value.length < 15) {
            if (e.target.parentElement.classList.contains("error_data"))
                e.target.parentElement.classList.remove("error_data");
            setIsCorrectPass(true);
        } else {
            if (!e.target.parentElement.classList.contains("error_data"))
                e.target.parentElement.classList.add("error_data");
            setIsCorrectPass(false);
        }
        setPass(e.target.value);
    }

    function checkErrorPass (e) {
        if (!(e.target.value.length > 5 && e.target.value.length < 15)) {
            notitier.showNoty("Длина пароля должна быть от 5 до 15 символов!", 3000);
        }
    }

    function checkErrorLogin (e) {
        if (!e.target.value.match(/[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g)) {
            notitier.showNoty("Неправильный адрес эл. почты!", 3000);
        }
    }

    function watchPassword (e) {
        setIsOpenPass(prevState => !prevState);
    }

    function changeAction () {
        setIsRegister(prevState => !prevState);
    }

    return (
        <div id="body_for_register">
            <div id="container_for_register">
                <div id="header">
                    <span id="header_span">{isRegister ? "Регистрация" : "Авторизация"}</span>
                </div>

                <div id="main">
                    <div>
                        <div id="login_block">
                            <span>Логин</span>
                            <div className="container-input"><input type="email" placeholder={isRegister ? "Почта для регистрации..." : "Введите Вашу почту..."} onChange={handleChangeLogin} onBlur={checkErrorLogin}></input></div>
                        </div>

                        <div id="pass_block">
                            <span>Пароль</span>
                            <div className="container-input">
                                <input type={isOpenPass ? "text" : "password"} placeholder={isRegister ? "Придумайте пароль..." : "Введите Ваш пароль..."} onChange={handleChangePass} onBlur={checkErrorPass}></input>
                                <img src={isOpenPass ? eye_slash : eye} className="icon_for_password" onClick={watchPassword}></img>
                            </div>
                        </div>
                    </div>

                    <div id="register_enter" onClick={handleEnter}>
                        <button >{isRegister ? "Регистрация" : "Вход"}</button>
                    </div>
                </div>

                <div id="footer">
                    <span>{isRegister ? "Уже есть аккаунт?" : "Создать новый аккаунт?"}</span><button onClick={changeAction}>{isRegister ? "Войти" : "Регистрация"}</button>
                </div>
            </div>
        </div>

    )
}

export default Register;