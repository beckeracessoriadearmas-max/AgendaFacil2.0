document.addEventListener("DOMContentLoaded",()=>{

if(localStorage.getItem("usuarioLogado")!=="true"){
window.location="login.html";
}

gerarCalendario();
atualizarDashboard();

if("serviceWorker" in navigator){
navigator.serviceWorker.register("sw.js");
}

});

function pegarDiarias(){
return JSON.parse(localStorage.getItem("diarias"))||[];
}

function atualizarDashboard(){

let diarias=pegarDiarias();
let total=0;

diarias.forEach(d=>total+=Number(d.valor||0));

document.getElementById("totalMes").innerText="R$ "+total.toFixed(2);
document.getElementById("totalDiarias").innerText=diarias.length;
}

function gerarCalendario(){

let calendario=document.getElementById("calendario");
calendario.innerHTML="";

for(let i=1;i<=31;i++){

let dia=document.createElement("div");
dia.className="dia";
dia.innerText=i;

dia.onclick=()=>abrirModal(i);

calendario.appendChild(dia);
}
}

function abrirModal(dia){

let lista=document.getElementById("listaServicos");
let titulo=document.getElementById("tituloModal");

let diarias=pegarDiarias();

lista.innerHTML="";
titulo.innerText="Dia "+dia;

let filtrados=diarias.filter(d=>Number(d.data.split("-")[2])===dia);

if(filtrados.length===0){
lista.innerHTML="<p>Nenhum serviço</p>";
}else{
filtrados.forEach(d=>{
lista.innerHTML+=`
<div class="card">
⏰ ${d.horario}<br>
👤 ${d.cliente}<br>
💰 R$ ${d.valor}
</div>`;
});
}

document.getElementById("modal").style.display="flex";
}

function fecharModal(){
document.getElementById("modal").style.display="none";
}
