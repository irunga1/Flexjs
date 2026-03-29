export const cardNews = (items = [], containerId = "container") => {
    
    let strContent = "";
    items.forEach((it)=>{
        strContent +=`
        <div class="card">
            <img src="${it.imagen}" alt="">
            <div class="card-content">
                <h3>${it.titulo}</h3>
                <p><strong>${it.descripcion_corta}</strong></p>
                <p style = 'display: none;'>${it.descripcion}</p>
            </div>
        </div>
        `;
    });
    document.getElementById(containerId).innerHTML = strContent;
}