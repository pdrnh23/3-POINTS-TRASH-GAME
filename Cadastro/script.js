function validacao() {
    var email = document.getElementById('email').value;
    var senha = document.getElementById('senha').value;

    if ( email === '' || senha === '') {
        alert('Por favor, preencha todos os campos.');
        return false; 
    }
    return true; 
} 