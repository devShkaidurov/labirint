import './noty.css'

export function handleCloseNoty () {
    if (document.getElementById("root")) {
        const divEl = document.getElementById("noty_wrapper");
        if (divEl)
            document.getElementById("root").removeChild(divEl);
    }
}

export function Show (text, type, _time, _closable) {
    const time = _time || 3000;
    console.dir(time);
    const closable = _closable || false;

    const divWrapper = document.createElement("div");
    const divEl = document.createElement("div");
    const spanEl = document.createElement("span");
    
    divWrapper.style = type;
    divWrapper.id = "noty_wrapper"
    divEl.id = "noty_container";
    divEl.className = type;
    spanEl.innerHTML = text;

    divEl.appendChild(spanEl);
    if (closable) {
        const buttonEl = document.createElement("button");
        buttonEl.id = "noty_button_close";
        buttonEl.innerHTML = 'x';
        buttonEl.onclick = handleCloseNoty;
        divEl.appendChild(buttonEl);
    }

    divWrapper.appendChild(divEl);
    
    document.getElementById("root").appendChild(divWrapper);
    setTimeout(() => {
        if (Array.from(document.getElementById("root").childNodes).includes(divWrapper))
            document.getElementById("root").removeChild(divWrapper);
    }, time);
}