const mensajeInicial = new Promise ((resolve, reject) => {
    resolve('Mensaje inicial!')
});

mensajeInicial
    .then(res => consolole.log(res));
    // .catch((error) => {
    //     respuestaError(error)
    // })
    // .finally(() => {
    //     respuestaFinal();
    // });

// const llamadaDos = fetch('')
// .then((res) => {
//     respuesta(res);
// })
// .catch((error) => {
//     respuestaError(error)
// })
// .finally(() => {
//     respuestaFinal();
// });

async function asyncCall(){
    console.log('Mensaje inicial')
}