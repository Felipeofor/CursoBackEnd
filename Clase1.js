class Usuario{
    constructor(nombre, apellido, libros, mascotas){
        this.nombre = nombre || "";
        this.apellido = apellido || "";
        this.libros = libros || [];
        this.mascotas =  mascotas || [] ;
}

    getFullName(){
        return `${this.nombre} ${this.apellido}`;
    }

    addMascota(mascota){
        return this.mascotas.push(mascota);
    }

}

// Usuario.prototype.getFullName =  function(){
//     return `${this.nombre} ${this.apellido}`;
// };



// Usuario.prototype.addMascota = function(mascota){
//     this.mascota.push(mascota);
// }

// Usuario.prototype.getMascota = function(){
//     return this.mascotas;
// };

// Usuario.prototype.getLibros = function(){
//     return this.libros.map((libro => libro.nombre))
// }

// console.log(getFullName());