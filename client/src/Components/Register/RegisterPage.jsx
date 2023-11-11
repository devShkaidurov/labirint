import './register.css';
import { serverConnector } from '../../serverConnector';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const RegisterPage = () => {
    const connector = serverConnector();
    const [isRegister, setIsRegister] = useState(true);
    const [login, setLogin] = useState("");
    const [pass, setPass]   = useState("");
    const navigate = useNavigate();


    const handleChangeType = () => {
        setIsRegister(prevState => !prevState);
    }

    const handleChangePass = (e) => {
        setPass(e.target.value);
    }

    const handleChangeLogin = (e) => {
        setLogin(e.target.value);
    }

    const handleAction = () => {
        if (isRegister) {
            connector.register({login: login, pass: pass}).then(async (res) => {
                const result = await res.json();
                if (result.register) {
                    console.log("Successful register");
                    setIsRegister(false);
                } else {
                    if (result.msg) {
                        console.log("Ошибка: " + result.msg);
                    }
                }
            }, async (rej) => {
                const result = await rej.json();
                console.log("Непредвиденная ошибка: " + result);
            });
        } else {
            connector.auth({login: login, pass: pass}).then(async (res) => {
                const result = await res.json();
                if (result.auth) {
                    if (result.isAdmin) {
                        navigate("/admin")
                    } else {
                        navigate("/user")
                    }
                } else {
                    console.log("Неверный логин или пароль!")
                }
            }, async (rej) => {
                const result = await rej.json();
                console.log("Непредвиденная ошибка авторизации!")
                console.dir(result);
            });
        }
    }

    return (
        <div id="register_container">
            <div id="register_wrapper">
                <div id="register_header">{isRegister ? "Регистрация" : "Авторизация"}</div>
                <div id="register_main">
                    <div id="register_login_form">
                        <span>Логин</span>
                        <input type="text" onChange={handleChangeLogin}></input>
                    </div>
                    <div id="register_pass_form">
                        <span>Пароль</span>
                        <input type="password" onChange={handleChangePass}></input>
                    </div>
                </div>
                <div id="register_actions">
                    <button id="register_procced" onClick={handleAction}>{isRegister ? "Регистрация" : "Авторизация"}</button>
                    <button id="register_changetype" onClick={handleChangeType}>{isRegister ? "Уже есть аккаунт? Войти" : "Зарегистрироваться"}</button>
                </div>
            </div>
        </div>
    )
} 