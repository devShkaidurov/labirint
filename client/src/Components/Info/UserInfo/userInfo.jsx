import './userInfo.css';
import img1 from "./win_auth2.png";
import img2 from './choose_labirint.png';
import img3 from "./game_user.png";
import img4 from "./win_auth.png";

export const UserInfo = () => {

    function scrollToTop () {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
          });
      };

      window.onscroll = function() {
        const btn = document.getElementById("scrollToTopBtn");
        if(!btn)
            return;
        if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
          btn.style.display = "block";
        } else {
          btn.style.display = "none";
        }
      };
    return (
        <div>
            <h1>Автоматизированная система генерирования структуры лабиринта</h1>
            <h1>и</h1>
            <h1>нахождения выхода из него</h1>
            <h2>Оглавление</h2>
            <ul>
                <li><a href="#paragraph1">Введение</a></li>
                <li><a href="#paragraph2">Авторизация, регистрация</a></li>
                <li><a href="#paragraph3">Выбор лабиринта</a></li>
                <li><a href="#paragraph4">Прохождение лабиринта</a></li>
            </ul>
            <h2 id="paragraph1">Введение</h2>
            <p>
                Автоматизированная система генерирования структуры лабиринта и нахождения выхода из него. Система рассчитана на два типа пользователей: администратор и пользователь.
                Администратор может создавать лабиринт вручную или автоматически с помощь двух алгоритмов. Далее может сохранить его в базу данных, чтобы лабиринт был доступен для всех пользователей.
                Пользователь может выбрать способ прохождения лабиринта и пройти его.
            </p>
            <p>
                Система использует базу данных MySQL(требует предустановленния сервера MySQL и базы данных). Програмная система совместима с Windows 7,Windows 10,Windows 11.
                Для работы также требуется наличие браузера.
            </p>

            <h2 id="paragraph2">Авторизация, регистрация</h2>
            <p>
                При запуске системы появится окно авторизации, для продолжения необходимо авторизоваться. Если ранее аккаунт не было создан, его можно создать нажав на кнопку "Зарегистрироваться". Если аккаунт уже создан, в поля "Логин" и "Пароль" необходимо ввести данные зарегистрированного пользователя и нажать на кнопку "Авторизация".
                Далее, система проверит наличи вашего аккаунта в базе данных и разрешит доступ.
            </p>
            <img src={img4} alt="Placeholder Image"></img>
                <h5>Авторизация и Зарегистрироваться</h5>
                <img src={img1} alt="Placeholder Image"></img>
                    <h5>Регистрация</h5>





            <h2 id="paragraph3">Выбор лабиринта</h2>
            <p>
                После успешной авторизации, пользватель может выбрать одну из карт, которые хранятся в базе данных.
            </p>
            <img src={img2} alt="Placeholder Image"></img>
                <h5>Выбор лабиринта</h5>


                <h2 id="paragraph4">Прохождение лабиринта</h2>
                <p>
                    После успешного выбора карты, пользователь может начать прохождение. Для начала пользователю нужно выбрать способ прохождения : ручной или автоматический.В ручном варианте пользователю необходимо с помощью кнопок на клавиатуре (WASD) передвигать персонажа до выхода.
                    В автоматическом режиме, необоходимо выбрать алгоритм автоматического прохожедния лабиринта : Алгоритм Ли или алгоритм одной руки.
                    После этого, необходимо выбрать режим автоматического прохожения: Пошагово(клик - один шаг) или Непрерывно с возможностью выбора скорости(путь будет строиться автоматически с указанной скоростью).
                    Нажать на кнопку "Начать прохождение".
                </p>
                <img src={img3} alt="Placeholder Image"></img>
                    <h5>Начать прохождение</h5>
            <button id="scrollToTopBtn" onClick={scrollToTop}>Подняться вверх</button>
        </div>
    )
}