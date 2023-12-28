import './register.css';
import { serverConnector } from '../../serverConnector';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Show }  from '../Noty/Noty';
import info from '../../images/info.svg';

export const RegisterPage = () => {
    const connector = serverConnector();
    const [isRegister, setIsRegister] = useState(true);
    const [login, setLogin] = useState("");
    const [pass, setPass]   = useState("");
    const [disable, setDisable] = useState(true);
    const MINVALUE = 4;
    const MAXVALUE = 20;
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

    const handleBlurPass = (e) => {
        if (e.target.value.length > MAXVALUE || e.target.value.length < MINVALUE) {
            Show("Вы вышли за рамки ввода!", 'error', 1500, true);
            setDisable(true);
        } else {
            setDisable(false);
        }
    }

    const handleBlurLogin = (e) => {
        if (e.target.value.length > MAXVALUE || e.target.value.length < MINVALUE) {
            Show("Вы вышли за рамки ввода!", 'error', 1500, true);
            setDisable(true)
        } else {
            setDisable(false);
        }
    }

    const handleOpenInfo = () => {
        navigate("info");
    }

    const handleAction = () => {
        if (isRegister) {
            connector.register({login: login, pass: pass}).then(async (res) => {
                const result = await res.json();
                if (result.register) {
                    console.log("Successful register");
                    Show("Вы успешно зарегистировались, теперь можете войти!", 'success', 3000, true);
                    setIsRegister(false);
                } else {
                    if (result.msg) {
                        console.log("Ошибка: " + result.msg);
                        Show(result.msg, 'error', 3000, true);
                    }
                }
            }, async (rej) => {
                const result = await rej.json();
                console.log("Непредвиденная ошибка: " + result);
            }).catch(e => {
                Show('Нет ответа от сервера!', 'error', 3000, true);

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
                    console.log("Неверный логин или пароль!");
                    Show('Неверный логин или пароль!', 'error', 3000, true);
                }
            }, async (rej) => {
                const result = await rej.json();
                console.log("Непредвиденная ошибка авторизации!");
                Show('Нет ответа от сервера!', 'error', 3000, true);
                console.dir(result);
            }).catch(e => {
                Show('Нет ответа от сервера!', 'error', 3000, true);
            })
        }
    }

    return (
        <div id="register_container">
            <div id="register_wrapper">
                <div id="register_header">{isRegister ? "Регистрация" : "Авторизация"}</div>
                <div id="register_main">
                    <div id="register_login_form">
                        <span>Логин</span>
                        <input type="text" onBlur={handleBlurLogin} onChange={handleChangeLogin}></input>
                    </div>
                    <div id="register_pass_form">
                        <span>Пароль</span>
                        <input type="password" onBlur={handleBlurPass} onChange={handleChangePass}></input>
                    </div>
                </div>
                <div id="register_actions" >
                    <button id="register_procced" disabled={disable} onClick={handleAction}>{isRegister ? "Регистрация" : "Авторизация"}</button>
                    <button id="register_changetype" onClick={handleChangeType}>{isRegister ? "Уже есть аккаунт? Войти" : "Зарегистрироваться"}</button>
                </div>
            </div>
            <div id='info-info'>
                <button onClick={handleOpenInfo}>
                    <img src={info}></img>
                </button>
            </div>
        </div>
    )
} 