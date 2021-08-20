function primerAcceso() {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve('1er acceso');
      }, 3000);
   
    });
}

function segundoAcceso() {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve('2do acceso');
      }, 2000);
   
    });
}

function tercerAcceso() {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve('3er acceso');
      }, 5000);
   
    });
}

function cuartoAcceso() {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve('4to acceso');
      }, 1000);
   
    });
}

function quintoAcceso() {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve('5to acceso');
      }, 4000);
   
    });
}

async function asyncCall() {
    console.log('iniciando...');
    console.log('esperando...')
    console.log(await primerAcceso());
    console.log(await segundoAcceso());
    console.log(await tercerAcceso());
    console.log(await cuartoAcceso());
    console.log(await quintoAcceso());

    console.log('finalizando...');
    return 25;
}
  
// console.log('Inicio del PGM');
asyncCall().then(x=>console.log(x));
