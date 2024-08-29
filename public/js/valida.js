function validaCampos() {
    var usuario = document.getElementById("usuario");
    var senha = document.getElementById("senha");

    if (usuario || senha == ""){
        Swal.fire(
            'Alerta!!!',
            'Favor preencher todos os campos',
            'warning'
        )
}
}

function validaEmail() {
    var email = document.getElementById("usuario");

    patternMail = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!(patternMail.test(email))) {
        Swal.fire(
            'Favor Verificar!!!',
            'O e-mail informado não atende aos requisitos.',
            'warning'
     )
      return false;
    }
    
}