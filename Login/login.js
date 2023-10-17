var email = document.getElementById('email');
var password = document.getElementById('password');

async function login(){
    var banco = await fetch('./banco.json')
    banco = await banco.json()

    var nick = document.getElementById('email').value;
    var pass = document.getElementById('password').value;    

    banco.nicks.push(nick)
    banco.senhas.push(pass)

    console.log(banco)

    // banco.nicks.map((user, idx) => {
    //     if(nick == user && pass == banco.senhas[idx]){
    //         console.log('logado')
    //         return;
    //     } else if(nick == user && pass != banco.senhas[idx]){
    //         console.log('dados incorretos')
    //         return;
    //     }
    // });

    return false
}