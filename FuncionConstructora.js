// Funcion constructura Usuario que reciba : nombre(string), apellido(string,), libros(array de objetos) y mascotas (array de strings).
function Usuario(nombre, apellido, libros, mascotas){
        this.nombre = nombre;
        this.apellido = apellido;
        this.libros = libros;
        this.mascotas =  mascotas;
}
    // Debe retornar un string con el nombre y apellido del usuario. Utilizar template string.

    Usuario.prototype.getFullName = function(){
        return `${this.nombre} ${this.apellido}`;
    };

    // Debe agregar una mascota(mascota) al arreglo de mascotas del usuario.

    Usuario.prototype.addMascota = function(mascota){
        this.mascotas.push(mascota);
    }

    // Debe retornar la cantidad de mascotas que tiene el usuario.

    Usuario.prototype.getMascotas = function(){
        return this.mascotas.length;
    }

    //Recibe un string 'book' y un string 'autor' y debe retornar un objeto: {nombre: book, autor: autor} al arreglo de libros de usuario. NO debe retornar nada.

    Usuario.prototype.addBook = function(book, autor){
        this.libros.push({nombre: book, autor: autor});
    }

    //Debe retornar un arrlgo con solo los nombres del arreglo de libros del usuario.

    Usuario.prototype.getBooks = function(){
        return this.libros.map(libro => libro.nombre);
    } 


const user = new Usuario(
    "Felipe",
    "Ramos",
    [{nombre: "Bolsa Argentina", autor: "Alejandro Daniel Romero"}],
    ["Rocky"]
);

console.log(user.getFullName());
user.addMascota("Jose");
console.log(user.getMascotas());
user.addBook("Como ganar amigos e influir en las personas", "Dale Carnegie");
console.log(user.getBooks());