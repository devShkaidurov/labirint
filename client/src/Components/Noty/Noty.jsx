import './noty.css'

function handleCloseNoty () {
    if (document.getElementsByTagName("body") && document.getElementsByTagName("body").length > 0) {
        const divEl = document.getElementById("noty_wrapper");
        if (divEl)
            document.getElementsByTagName("body")[0].removeChild(divEl);
    }
}

export function Show (text, type) {
    const divWrapper = document.createElement("div");
    const divEl = document.createElement("div");
    const spanEl = document.createElement("span");
    const buttonEl = document.createElement("button");
    
    divWrapper.style = type;
    divWrapper.id = "noty_wrapper"
    divEl.id = "noty_container";
    divEl.className = type;
    spanEl.innerHTML = text;
    buttonEl.id = "noty_button_close";
    buttonEl.innerHTML = 'x';
    buttonEl.onclick = handleCloseNoty;

    divEl.appendChild(spanEl);
    divEl.appendChild(buttonEl);
    divWrapper.appendChild(divEl);
    
    document.getElementsByTagName("body")[0].appendChild(divWrapper);
    setTimeout(() => {
        if (Array.from(document.getElementsByTagName("body")[0].childNodes).includes(divWrapper))
            document.getElementsByTagName("body")[0].removeChild(divWrapper);
    }, 4000);
}