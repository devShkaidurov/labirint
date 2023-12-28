import './info.css';
import img1 from "./egor.png";
import img2 from "./sergey.jpg";
import img3 from "./chat.png";

export const Info = () => {
    return (
        <div>
            <h1>Разработчики</h1>

            <div class="developer">
                <img src={img1} alt="Developer 1"></img>
                <h2>Фронтэнд</h2>
                <p>Шкайдуров Е.А</p>
                <p>Программист</p>
            </div>

            <div class="developer">
                <img src={img2} alt="Developer 2"></img>
                <h2>Бэкэнд </h2>
                <p>Клюшкин С.Д.</p>
                <p>Программист</p>
            </div>
            <div class="developer">
                <img src={img3} alt="Developer 2"></img>
                <h2>Бэкэнд </h2>
                <p>Chat GPT</p>
                <p>Просто бот, без души</p>
            </div>
            </div>
    )
}