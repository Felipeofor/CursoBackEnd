const recorrerTexto = (texto, callback) => {
    let splitTexto = texto.split(' ')
    let i = 0;
    let interval = setInterval (
        () => {
            console.log(splitTexto[i++]);
            if(i == splitTexto.length){
                clearInterval (interval);
                callback(splitTexto);
            }
        },200
    )
    
}


const fin = (splitTexto) => console.log(`proceso completo ${splitTexto.length}`);
setTimeout(recorrerTexto, 250, 'Primer texto', fin);
setTimeout(recorrerTexto, 250, 'Segundo texto', fin);
setTimeout(recorrerTexto, 250, 'Tercer texto', fin);