
//REGISTRO USUARIO


// captura el valor que ingresa el usuario en el input de email del form de inicio de sesion
let inicioEmail;

// captura el valor que ingresa el usuario en el input de password del form de inicio de sesion
let inicioPassword;

// captura el valor que ingresa el usuario en el input de email del form de registro
let usuarioEmail;

// captura el valor que ingresa el usuario en el input de password del form de registro
let usuarioPassword;

let email;
let password;
const usuariosRegistrados = JSON.parse(localStorage.getItem("Usuario Email"));
// const usuariosRegistrados = [{email:"prueba@gmail.com", password:"Coder2020"}];

// expresiones regulares para el email de registro, el mismo solo puede contar con numeros, guiones y puntos
let emailValidacion = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9.-]+$/;

// expresiones regulares para la contraseña de registro, la misma debe tener entre 8 y 16 caracteres, al menos un dígito, al menos una minúscula y al menos una mayúscula.
let passwordValidacion = /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/;


// obtiene el valor del input de email, luego con un find busca si este primer valor coincide con alguno guardado en el array de nuestro local Storage. En caso de encontrar una coincidencia imprime
// en el dom un texto avisando que el usuario ya se encuentra en uso y guarda en la variable de email el booleno false para evitar al usuario poder registrarse clickeando el boton de registro. Por otro lado 
// si no encuentra coincidencias guarda el booleano true en email. 

$("#registroEmail").change((e) => {
    usuarioEmail = e.target.value;
    let yaRegistrado = usuariosRegistrados.find(usuario => usuario.email === usuarioEmail)
    if(yaRegistrado !== undefined){
        $(".emailNoValido").hide();
        $(".emailFallido").show();
        $("#registroEmail").css({
            "border": "1px solid red"
        });
        email = false;
    }   else {
        $(".emailFallido").hide();
        $("#registroEmail").css({
            "border": "1px solid black"
        })
        email = true;

// Con esta condición verificamos si el email ingresado cumple con las expresiones regulares guardades en emailValidacion. Si es true el programa guarda el booleano verdadero en email para aprobar
// el email como válido para el registro. En caso de que no cumpla con la expresión regular se muestra un texto especificando que puede contener el email y guarda el booleano falso en email así 
// el usuario no puede registrarse clickeando el botón hasta corregir este email.

        if(emailValidacion.test(usuarioEmail) === true){
            $(".emailNoValido").hide();
            $("#registroEmail").css({
                "boder": "1px solid black"
            })
            email = true;
        } else {
            $(".emailNoValido").show();
            $("#registroEmail").css({
                "border": "1px solid red"
            });
            email = false;
        }
    }
});

// tomamos el valor del input password y lo guardamos en la variable usuarioPassword, luego hacemos la condición, si él método test() da true significa que la contraseña cumple con los requisitos de 
// la expresión regular por lo cual se guarda en la variable password el booleano true necesario para poder permitir el registro del usuario. En caso de ser flase se mostrata un mensaje en pantalla indicando los requisitos que
// debe cumplir la contraseña para ser válida, luego se guarda el booleano false en password para impedir al usuario su registro hasta que ingrese una contraseña válida.

$("#registroPsw").change((e) => {
    usuarioPassword = e.target.value;
    if(passwordValidacion.test(usuarioPassword) === true){
        $(".pswFallido").hide();
        $("#registroPsw").css({
            "border": "1px solid black"
        })
        password = true;
    } else {
        $(".pswFallido").show();
        $("#registroPsw").css({
            "border": "1px solid red"
        })
        password = false;
    }
});

// con este evento al darle click en el boton de registrarme se chequea que los valores tanto en email como en password sean true, en caso de serlo se pushea al localStorage el email y contraseña del usario para ser almacenados
// y se muestra un modal avisando al cliente que el registro se completo . Por otro lado si algunos de los dos o ambos valores no son true se muestra un texto exigiendo que se comple el formulario de manera completa para permitir
// el registo al usuario.

$("#registrarme").click((e) =>{
    e.preventDefault();
    if(email && password === true){
        $(".registroFallido").hide();
        usuariosRegistrados.push({email:usuarioEmail, password:usuarioPassword});
        localStorage.setItem("Usuario Email", JSON.stringify(usuariosRegistrados));
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Usted se registró exitosamente',
            showConfirmButton: false,
            timer: 2000
        })
        formRegistro.reset();   
    }
    else{
        $(".registroFallido").show();
    }    
})


//INICIO SESION

// toma el valor del input de email del form de inicio sesión y lo guarda en la variable inicioEmail
$("#inputEmail").change( function (e) {
    e.preventDefault();
    inicioEmail = e.target.value;
    console.log(inicioEmail);
} );

// toma el valor del input de password del form de inicio sesión y lo guarda en la variable inicioPassword
$("#inputPsw").change((e) => {
    e.preventDefault()
    inicioPassword =  e.target.value;
    console.log(inicioPassword);
} );

// cuando damos click en el boton de inicio de sesion, se guarda en la variable succes el valor que resulta del método find aplicado al array usuariosRegistrados que traemos del localStorage y donde se guardan
// los usuarios registrados. dentro del find tenemos otra función buscar, la cual itera nuestro array verificando si existe algún objeto que tenga el usuario y contraseña coincidentes con los ingresados. En caso positivo retorna true
// y por lo contrario false.

$("#inicioSesion").click((e) => {
    e.preventDefault();
    let succes = usuariosRegistrados.find(user => buscar(user))
    ingreso(succes);
} );


function buscar(user){
    if(user.email === inicioEmail && user.password === inicioPassword){
        return true;
    } return false;
}

function ingreso(succes){
    if(succes !== undefined){
        $(".inicioFallido").hide();
        $("#inputEmail , #inputPsw").css({
            "border": "1px solid black"
        });
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Usted inició sesión exitosamente',
            showConfirmButton: false,
            timer: 2000
        });
        setTimeout(redireccionar,2000);
    } else{
        $(".inicioFallido").show();
        $("#inputEmail, #inputPsw").css({
            "border": "1px solid red"
        })
    }
}  

function redireccionar() {
    window.location.href = "../index.html"
}

