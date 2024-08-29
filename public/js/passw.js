
function validarSenha() {
    var senha1 = document.getElementById("senha");
    var s1 = senha1.value;  

    pattern = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,15}$/;
    if (!(pattern.test(s1))) {
        Swal.fire(
            'Favor Verificar!!!',
            'A senha informada não atende aos requisitos mínimos aceitaveis(Min 8, max 15 dígitos, letra, número e caracter especial)',
            'warning'
     )
      return false;
    }
    
}
