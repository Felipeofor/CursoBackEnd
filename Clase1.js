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

    getMascotas(){
        return this.mascotas.length;
    }

    addBook(book, autor){
        this.libros.push({nombre: book, autor: autor});
    }

    getBooks(){
        return this.libros.map(this.libros.nombre);
    } 
}

const user = new Usuario(
    "Felipe",
    "Ramos",
    [{nombre: "Bolsa Argentina", autor: "Alejandro Daniel Romero"}],
    ["Rocky"]
);

console.log(user.getFullName());
console.log(user.addMascota());
console.log(user.getMascota());
console.log(user.addBook());
console.log(user.getBooks());