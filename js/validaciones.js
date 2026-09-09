
function validarRUN(rutCompleto) {
    rutCompleto = rutCompleto.replace(/[^0-9kK]/g, '');
    if (rutCompleto.length < 8) return false;
    
    let cuerpo = rutCompleto.slice(0, -1);
    let dv = rutCompleto.slice(-1).toUpperCase();
    
    let suma = 0;
    let multiplo = 2;
    
    for (let i = cuerpo.length - 1; i >= 0; i--) {
        suma += parseInt(cuerpo.charAt(i)) * multiplo;
        multiplo = multiplo < 7 ? multiplo + 1 : 2;
    }
    
    let dvEsperado = 11 - (suma % 11);
    if (dvEsperado === 11) dvEsperado = '0';
    else if (dvEsperado === 10) dvEsperado = 'K';
    else dvEsperado = dvEsperado.toString();
    
    return dv === dvEsperado;
}


function validarLogin(correo, password) {
    const errores = [];
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!correo || correo.length > 100 || !regexEmail.test(correo)) {
        errores.push("Ingrese un correo válido (máx. 100 caracteres).");
    }
    if (!password || password.length < 4 || password.length > 10) {
        errores.push("La contraseña debe tener entre 4 y 10 caracteres.");
    }
    return errores;
}


function validarContacto(nombre, correo, comentario) {
    const errores = [];
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!nombre || nombre.length > 100) {
        errores.push("El nombre es obligatorio (máx. 100 caracteres).");
    }
    if (!correo || correo.trim().length === 0 || correo.length > 100 || !regexEmail.test(correo)) {
        errores.push("El correo electrónico debe tener un formato válido.");
    }
    if (!comentario || comentario.length > 500) {
        errores.push("El comentario es obligatorio (máx. 500 caracteres).");
    }
    return errores;
}


function validarRegistro(datos) {
    const errores = [];
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!datos.run || !validarRUN(datos.run)) {
        errores.push("RUN inválido (ingrese sin puntos ni guion).");
    }
    if (!datos.nombre || datos.nombre.length > 50) {
        errores.push("El nombre es obligatorio (máx. 50 caracteres).");
    }
    if (!datos.apellidos || datos.apellidos.length > 100) {
        errores.push("Los apellidos son obligatorios (máx. 100 caracteres).");
    }
    if (!datos.correo || datos.correo.length > 100 || !regexEmail.test(datos.correo)) {
        errores.push("El correo es obligatorio y debe ser válido.");
    }
    if (!datos.password || datos.password.length < 4 || datos.password.length > 10) {
        errores.push("La contraseña debe tener entre 4 y 10 caracteres.");
    }
    if (!datos.direccion || datos.direccion.length > 300) {
        errores.push("La dirección es obligatoria (máx. 300 caracteres).");
    }
    return errores;
}