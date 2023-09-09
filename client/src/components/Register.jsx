import '../styles/register.css';

function Register() {
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
                            <input type="text" placeholder='Введите Вашу эл. почту'></input>
                        </div>

                        <div id="pass_block">
                            <span>Пароль</span>
                            <input type="password" placeholder='Придумайте пароль'></input>
                        </div>
                    </div>

                    <div id="register_enter">
                        <button>Вход</button>
                    </div>
                </div>


                <div id="footer">
                    <span>Уже есть аккаунт?</span><button>Авторизация</button>
                </div>
            </div>
        </div>

    )
}

export default Register;