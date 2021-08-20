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
setTimeout(recorrerTexto, 500, 'Primer texto principal', fin);
setTimeout(recorrerTexto, 1000, 'Segundo', fin);
setTimeout(recorrerTexto, 1500, 'Tercer texto', fin);