const socket = io();

socket.on('productCatalog', (data) => render(data));

let render = (data) => {
    if (data.products.length > 0) {
        let html = data.products.map(e => `
        <div class="row product">
            <div class="col">${e.title}</div>
            <div class="col">$ ${e.price}</div>
            <div class="col-3"><img src="${e.thumbnail}" alt="" width="60" height="60"></div>
        </div>`
        ).join(' ');
        document.getElementById('viewTitle').innerHTML = data.viewTitle;
        document.getElementById('productCatalog').innerHTML = html;
    } else {
        let html = `<div class="error" style="padding:2em;text-align:center">${data.errorMessage}</div>`;
        document.getElementById('productCatalog').innerHTML = html;
    }
}

function createProd(form) {
    console.log("Nuevo producto agregado!");
    let newProduct = {
        title: document.getElementById('title').value,
        price: parseFloat(document.getElementById('price').value),
        thumbnail: document.getElementById('thumbnail').value
    }
    socket.emit('newProduct', newProduct)
    return false;
}
