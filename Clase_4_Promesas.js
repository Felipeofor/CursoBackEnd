//Lanzar los 5 accesos en forma automática (es decir, el 2do debe lanzarse sin esperar que finalice el 1ero y así sucesivamente)
function yendoAConsultar1(valor) {
    return new Promise ((resolve, reject)=>{
        setTimeout(()=>{
            if (valor == 'ok') {
                resolve('Este es el contenido de la consulta 1');
            } else {
                reject ('Canceló la consulta sin valor 1');
            }
        },3000)
    });
}
function yendoAConsultar2(valor) {
    return new Promise ((resolve, reject)=>{
        setTimeout(()=>{
            if (valor == 'ok') {
                resolve('Este es el contenido de la consulta 2');
            } else {
                reject ('Canceló la consulta sin valor 2');
            }
        },2000)
    });
}
function yendoAConsultar3(valor) {
    return new Promise ((resolve, reject)=>{
        setTimeout(()=>{
            if (valor == 'ok') {
                resolve('Este es el contenido de la consulta 3');
            } else {
                reject ('Canceló la consulta sin valor 3');
            }
        },5000)
    });
}
function yendoAConsultar4(valor) {
    return new Promise ((resolve, reject)=>{
        setTimeout(()=>{
            if (valor == 'ok') {
                resolve('Este es el contenido de la consulta 4');
            } else {
                reject ('Canceló la consulta sin valor 4');
            }
        },1000)
    });
}
function yendoAConsultar5(valor) {
    return new Promise ((resolve, reject)=>{
        setTimeout(()=>{
            if (valor == 'ok') {
                resolve('Este es el contenido de la consulta 5');
            } else {
                reject ('Canceló la consulta sin valor 5');
            }
        },4000)
    });
}
//Luego de lanzar los accesos, pero sin esperar el retorno los mismos, ejecutar un sub-proceso que emita por consola 25 números al azar utilizando funciones generadoras e iteradores
function *creaIds(){
    let indice = 0;
    while (true) {
        yield Math.random() ;
    }
}
let creadorIds = creaIds();

//Emitir un mensaje previo a comenzar los accesos a internet
console.log('Iniciando...');
//Al regresar cada uno de los accesos, emitir el resultado (ok u error) y en caso de retornar ok, imprimir por consola el objeto recibido. 
yendoAConsultar1('okss')
    .then(x=>console.log('ok', x))
    .catch(x=>console.log('error', x))
    //A su vez, en cada acceso, haya vuelto ok o con error, imprimir por consola un nuevo número al azar utilizando el mismo iterador anterior
    .finally(()=>console.log(creadorIds.next().value));
//Al regresar cada uno de los accesos, emitir el resultado (ok u error) y en caso de retornar ok, imprimir por consola el objeto recibido. 
yendoAConsultar2('okss')
    .then(x=>console.log('ok', x))
    .catch(x=>console.log('error', x))
    //A su vez, en cada acceso, haya vuelto ok o con error, imprimir por consola un nuevo número al azar utilizando el mismo iterador anterior
    .finally(()=>console.log(creadorIds.next().value));
//Al regresar cada uno de los accesos, emitir el resultado (ok u error) y en caso de retornar ok, imprimir por consola el objeto recibido. 
yendoAConsultar3('okss')
    .then(x=>console.log('ok', x))
    .catch(x=>console.log('error', x))
    //A su vez, en cada acceso, haya vuelto ok o con error, imprimir por consola un nuevo número al azar utilizando el mismo iterador anterior
    .finally(()=>console.log(creadorIds.next().value));
//Al regresar cada uno de los accesos, emitir el resultado (ok u error) y en caso de retornar ok, imprimir por consola el objeto recibido. 
yendoAConsultar4('okss')
    .then(x=>console.log('ok', x))
    .catch(x=>console.log('error', x))
    //A su vez, en cada acceso, haya vuelto ok o con error, imprimir por consola un nuevo número al azar utilizando el mismo iterador anterior
    .finally(()=>console.log(creadorIds.next().value));
//Al regresar cada uno de los accesos, emitir el resultado (ok u error) y en caso de retornar ok, imprimir por consola el objeto recibido. 
yendoAConsultar5('okss')
    .then(x=>console.log('ok', x))
    .catch(x=>console.log('error', x))
    //A su vez, en cada acceso, haya vuelto ok o con error, imprimir por consola un nuevo número al azar utilizando el mismo iterador anterior
    .finally(()=>console.log(creadorIds.next().value));
console.log('Finalizando...');

//Luego de lanzar los accesos, pero sin esperar el retorno los mismos, ejecutar un sub-proceso que emita por consola 25 números al azar utilizando funciones generadoras e iteradores
function creador() {for (i=0; i<25; i++){
    console.log(creadorIds.next().value);
}}

creador();