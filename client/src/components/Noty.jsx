import '../styles/noty.css';

export default class Noty {
    
    showNoty (message, time) {
        const noty = document.createElement("div");
        noty.id = "div-noty";
        noty.innerHTML = message;
        document.body.appendChild(noty);
        setTimeout(() => {
            document.getElementById("div-noty").classList.add("close-div-noty");
            setTimeout(() => {
                document.getElementById("div-noty").remove();
            }, 1000);
        }, time)

    }
}