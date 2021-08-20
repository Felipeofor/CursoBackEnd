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

function *creaIds(){
    let indice = 0;
    while (true) {
        yield Math.random() ;
    }
}

let creadorIds = creaIds();


console.log('Iniciando...');
yendoAConsultar1('okss')
    .then(x=>console.log('Volvió la consulta', x))
    .catch(x=>console.log('Canceló la consulta', x))
    .finally(()=>console.log('Terminó la consulta'));

yendoAConsultar2('okss')
    .then(x=>console.log('Volvió la consulta', x))
    .catch(x=>console.log('Canceló la consulta', x))
    .finally(()=>console.log('Terminó la consulta'));

yendoAConsultar3('okss')
    .then(x=>console.log('Volvió la consulta', x))
    .catch(x=>console.log('Canceló la consulta', x))
    .finally(()=>console.log('Terminó la consulta'));

yendoAConsultar4('okss')
    .then(x=>console.log('Volvió la consulta', x))
    .catch(x=>console.log('Canceló la consulta', x))
    .finally(()=>console.log('Terminó la consulta'));

yendoAConsultar5('okss')
    .then(x=>console.log('Volvió la consulta', x))
    .catch(x=>console.log('Canceló la consulta', x))
    .finally(()=>console.log('Terminó la consulta'));
console.log('Finalizando...');

function creador() {for (i=0; i<25; i++){
    console.log(creadorIds.next().value);
}}

creador();


// console.log(creadorIds.next().value);
// console.log(creadorIds.next().value);
// console.log(creadorIds.next().value);
// console.log(creadorIds.next().value);