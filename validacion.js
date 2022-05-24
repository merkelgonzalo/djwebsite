const formulario = document.getElementById("formulario");
const input = document.querySelectorAll('#formulario input');

const expresiones = {
	nombreApellido: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
	correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
	telefono: /^\d{7,14}$/ // 7 a 14 numeros.
}

const validezCampos = { //Representa la validez de los campos
    nombre: false,
    apellido: false,
    email: false,
    telefono: false
}

const validarFormulario = (evento) => {
    switch(evento.target.id){
        case "nombre":
            validarCampo(expresiones.nombreApellido, evento.target, evento.target.id);
        break;
        case "apellido":
            validarCampo(expresiones.nombreApellido, evento.target, evento.target.id);
        break;
        case "email":
            validarCampo(expresiones.correo, evento.target, evento.target.id);
        break;
        case "telefono":
            validarCampo(expresiones.telefono, evento.target, evento.target.id);
        break;
    }
}

const validarCampo = (expresion, input, campo) => {
    if(expresion.test(input.value)){
        document.getElementById(`grupo__${campo}`).classList.remove("formulario__grupo-incorrecto");
        document.getElementById(`grupo__${campo}`).classList.add("formulario__grupo-correcto");
        validezCampos[campo] = true;
    }else{
        document.getElementById(`grupo__${campo}`).classList.add("formulario__grupo-incorrecto");
        validezCampos[campo] = false;
    }
}

input.forEach((input) => {
    input.addEventListener('keyup', validarFormulario); //Cuando el usuario presiona una tecla, cuando la suelta se va a ejecuta la funcion validarFormulario
    input.addEventListener('blur', validarFormulario); //Cuando el usuario presiona fuera del campo, ejecuta la funcion validarFormulario
})

formulario.addEventListener('submit', (evento) => {
    evento.preventDefault(); //Evita que te redirija a otra pagina

    if(validezCampos.nombre && validezCampos.apellido && validezCampos.email && validezCampos.telefono){
        formulario.reset();

        document.getElementById('formulario__mensaje-exito').classList.add('formulario__mensaje-exito-activo');
        document.getElementById('formulario__mensaje').classList.remove('formulario__mensaje-activo');
    }else{
        document.getElementById('formulario__mensaje').classList.add('formulario__mensaje-activo');
    }
});