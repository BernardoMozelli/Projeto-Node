function rotaCadastro() {
    document.getElementById("btn-cadastro").addEventListener("click", function() {
        window.location.href = '/cadastro';
    });
}

document.addEventListener("DOMContentLoaded", rotaCadastro);