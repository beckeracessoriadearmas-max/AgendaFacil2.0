function login(){

let user=document.getElementById("user").value;
let pass=document.getElementById("pass").value;

if(user==="admin" && pass==="123"){
localStorage.setItem("usuarioLogado","true");
window.location="index.html";
}else{
alert("Login inválido");
}

}

function verificarLogin(){

if(localStorage.getItem("usuarioLogado")!=="true"){
window.location="../login.html";
}

}

function logout(){
localStorage.removeItem("usuarioLogado");
window.location="login.html";
}