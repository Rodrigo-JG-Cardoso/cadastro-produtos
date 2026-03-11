let produtos = [];

const nomeEl = document.getElementById("nome");
const precoEl = document.getElementById("preco");
const qtdEl = document.getElementById("qtd");
const indiceEl = document.getElementById("indice");
const idxRemoverEl = document.getElementById("idxRemover");
const saida = document.getElementById("saida");

function limparCampos(){
nomeEl.value="";
precoEl.value="";
qtdEl.value="";
indiceEl.value="";
}

function validarProduto(nome,preco,qtd){
if(nome.trim()==="") return "Informe o nome do produto.";
if(!Number.isFinite(preco)||preco<=0) return "Informe um preço válido.";
if(!Number.isInteger(qtd)||qtd<=0) return "Informe uma quantidade válida.";
return null;
}

document.getElementById("btnAdicionar").onclick=()=>{

const indice = Number(indiceEl.value);
const nome = nomeEl.value;
const preco = Number(precoEl.value);
const qtd = Number(qtdEl.value);

const erro=validarProduto(nome,preco,qtd);

if(erro){
alert(erro);
return;
}

const produto={
nome:nome.trim(),
preco:preco,
qtd:qtd
};

if(Number.isInteger(indice) && indice>=0){
produtos[indice]=produto;
}else{
produtos.push(produto);
}

saida.innerHTML="<p>Produto adicionado.</p>";

limparCampos();
};

document.getElementById("btnListar").onclick=()=>{

if(produtos.length===0){
saida.innerHTML="<p>Nenhum produto cadastrado</p>";
return;
}

let html="<h3>Produtos cadastrados</h3>";
html+="<table>";
html+="<tr><th>Índice</th><th>Produto</th><th>Preço</th><th>Qtd</th><th>Subtotal</th></tr>";

for(let i=0;i<produtos.length;i++){

if(produtos[i]){

const p=produtos[i];
const subtotal=p.preco*p.qtd;

html+=`
<tr>
<td>${i}</td>
<td>${p.nome}</td>
<td>${p.preco.toFixed(2)}</td>
<td>${p.qtd}</td>
<td>${subtotal.toFixed(2)}</td>
</tr>
`;

}

}

html+="</table>";

saida.innerHTML=html;

};

document.getElementById("btnResumo").onclick=()=>{

let totalItens=0;
let totalValor=0;

for(let p of produtos){

if(p){
totalItens+=p.qtd;
totalValor+=p.preco*p.qtd;
}

}

saida.innerHTML=`
<h3>Resumo</h3>
<p>Total de itens: <b>${totalItens}</b></p>
<p>Valor total do estoque: <b>R$ ${totalValor.toFixed(2)}</b></p>
`;

};

document.getElementById("btnRemover").onclick=()=>{

const idx=Number(idxRemoverEl.value);

if(!Number.isInteger(idx)||!produtos[idx]){
alert("Índice inválido");
return;
}

produtos.splice(idx,1);

saida.innerHTML="<p>Produto removido.</p>";

idxRemoverEl.value="";
};

document.getElementById("btnLimpar").onclick=()=>{
produtos=[];
saida.innerHTML="<p>Todos os produtos removidos.</p>";
};