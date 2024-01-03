import './adminInfo.css';
import img1 from "./win_auth.png";
import img2 from "./win_auth2.png";
import img3 from "./create_labirint.png";
import img4 from "./save_labirint.png";

export const AdminInfo = () => {

    function scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };

    window.onscroll = function () {
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
                <li><a href="#paragraph3">Создание лабиринта</a></li>
                <li><a href="#paragraph4">Сохранение лабиринта</a></li>
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
            <img src={img1} alt="Placeholder Image"></img>
            <h5>Авторизация и Зарегистрироваться</h5>
            <img src={img2} alt="Placeholder Image"></img>
            <h5>Регистрация</h5>





            <h2 id="paragraph3">Создание лабиринта</h2>
            <p>
                После успешной авторизации, администратор может создать лабиринт. Для создания лабринта, администратору необходимо указать параметры лабиринта ширину и высоту (Ограничие: от 9 до 51).
                Далее выбрать способ расстоновки входа\выхода: вручную(кликнув левой кнопкой мыши на выбранные клетки) или автоматически (система случайно расставит вход и выход).
                Следующим шагом, необходимо выбрать способ создания лабиринта вручную или автоматически. Ручной способ: кликнув на выбранную клетку поставить стену и так проставить все стены.
                Если выбран автоматический способ создания лабиринта, можно выбрать алгоритм по которому будет создавать лабиринт: алгоритм Прима или алгоритм Бэктрэкинга.
                После чего нажать кнопку "Создать".
            </p>
            <img src={img3} alt="Placeholder Image"></img>
            <h5>Создать</h5>


            <h2 id="paragraph4">Сохранение лабиринта</h2>
            <p>
                После успешного создания лабиринта, появится окно, в котором можно сохранить лабиринт, чтобы лабиринт был виден обычному пользователю.
                Чтобы сохранить, необходимо нажать на кнопку "Готово".
            </p>
            <img src={img4} alt="Placeholder Image"></img>
                <h5>Сохранить</h5>




                <button id="scrollToTopBtn" onClick={scrollToTop}>Подняться вверх</button>
        </div>
    )
}