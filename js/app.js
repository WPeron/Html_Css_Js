//Esperamos que todos os elementos da página carreguem para executar o script
if(document.readyState == 'loading'){
    document.addEventListener('DOMContentLoaded', ready)
}else{
    ready();
}
function ready(){
    
    
    var botaoEliminarItem = document.getElementsByClassName('btn-eliminar');
    for(var i=0;i<botaoEliminarItem.length; i++){
        var button = botaoEliminarItem[i];
        button.addEventListener('click',eliminarItemcarrinho);
    }

    
    var botaosomarqtd = document.getElementsByClassName('somar-qtd');
    for(var i=0;i<botaosomarqtd.length; i++){
        var button = botaosomarqtd[i];
        button.addEventListener('click',somarqtd);
    }

     
    var botaoRestarqtd = document.getElementsByClassName('restar-qtd');
    for(var i=0;i<botaoRestarqtd.length; i++){
        var button = botaoRestarqtd[i];
        button.addEventListener('click',restarqtd);
    }

    
    var botaoAgregarAlcarrinho= document.getElementsByClassName('buy-button');
    for(var i=0; i<botaoAgregarAlcarrinho.length;i++){
        var button = botaoAgregarAlcarrinho[i];
        button.addEventListener('click', agregarAlcarrinhoClicked);
    }

    
    document.getElementsByClassName('btn-pagar')[0].addEventListener('click',pagarClicked)
}
//Removemos todos os elementos do carrinho e os ocultamos
function pagarClicked(){
    alert("Obrigado pela compra!");
    //Eu removo todos os elementos do carrinho.
    var carrinhoItems = document.getElementsByClassName('carrinho-items')[0];
    while (carrinhoItems.hasChildNodes()){
        carrinhoItems.removeChild(carrinhoItems.firstChild)
    }
    actualizarTotalcarrinho();
    alternarVisibilidade()
}
//Função que controla o botão clicado de adicionar ao carrinho.
function agregarAlcarrinhoClicked(event){
    var button = event.target;
    var item = button.parentElement;
    var titulo = item.getElementsByClassName('titulo-item')[0].innerText;
    var preco = item.getElementsByClassName('preco')[0].innerText;
    var imagenSrc = item.getElementsByClassName('img-item')[0].src;
    console.log(imagenSrc);

    agregarItemAlcarrinho(titulo, preco, imagenSrc);

}
//Função que adiciona um item ao carrinho.
function agregarItemAlcarrinho(titulo, preco, imagenSrc){
    var item = document.createElement('div');
    item.classList.add = ('item');
    var itemscarrinho= document.getElementsByClassName('carrinho-items')[0];

    //Verificamos se o item que está sendo adicionado não está presente no carrinho.
    var nomeItemscarrinho= itemscarrinho.getElementsByClassName('carrinho-item-titulo');
    for(var i=0;i < nomeItemscarrinho.length;i++){
        if(nomeItemscarrinho[i].innerText==titulo){
            alert("El item ya se encuentra en el carrinho");
            return;
        }
    }

    var itemcarrinhoconteudo = `
        <div class="carrinho-item">
            <img src="${imagenSrc}" width="80px" alt="">
            <div class="carrinho-item-detalles">
                <span class="carrinho-item-titulo">${titulo}</span>
                <div class="selector-qtd">
                    <i class="fa-solid fa-minus restar-qtd"></i>
                    <input type="text" value="1" class="carrinho-item-qtd" disabled>
                    <i class="fa-solid fa-plus somar-qtd"></i>
                </div>
                <span class="carrinho-item-preco">${preco}</span>
            </div>
            <button class="btn-eliminar">
                <i class="fa-solid fa-trash"></i>
            </button>
        </div>
    `
    item.innerHTML = itemcarrinhoconteudo;
    itemscarrinho.append(item);

    //Adicionamos a funcionalidade de excluir ao novo item.
     item.getElementsByClassName('btn-eliminar')[0].addEventListener('click', eliminarItemcarrinho);

    //Adicionamos a funcionalidade de diminuir a quantidade do novo item.
    var botonRestarqtd = item.getElementsByClassName('restar-qtd')[0];
    botonRestarqtd.addEventListener('click',restarqtd);

    //Adicionamos a funcionalidade de aumentar a quantidade do novo item.
    var botonsomarqtd = item.getElementsByClassName('somar-qtd')[0];
    botonsomarqtd.addEventListener('click',somarqtd);

    //Atualizamos o total.
    actualizarTotalcarrinho();
}
//Aumentei em um a quantidade do elemento selecionado.
function somarqtd(event){
    var buttonClicked = event.target;
    var selector = buttonClicked.parentElement;
    console.log(selector.getElementsByClassName('carrinho-item-qtd')[0].value);
    var qtdActual = selector.getElementsByClassName('carrinho-item-qtd')[0].value;
    qtdActual++;
    selector.getElementsByClassName('carrinho-item-qtd')[0].value = qtdActual;
    actualizarTotalcarrinho();
}
//Reduzi em um a quantidade do elemento selecionado.
function restarqtd(event){
    var buttonClicked = event.target;
    var selector = buttonClicked.parentElement;
    console.log(selector.getElementsByClassName('carrinho-item-qtd')[0].value);
    var qtdActual = selector.getElementsByClassName('carrinho-item-qtd')[0].value;
    qtdActual--;
    if(qtdActual>=1){
        selector.getElementsByClassName('carrinho-item-qtd')[0].value = qtdActual;
        actualizarTotalcarrinho();
    }
}
//Excluo o item selecionado do carrinho.
function eliminarItemcarrinho(event){
    var buttonClicked = event.target;
    buttonClicked.parentElement.parentElement.remove();
    //Atualizamos o total do carrinho.
    actualizarTotalcarrinho();

    //A função a seguir controla se há elementos no carrinho.
    //Se não houver, eu excluo o carrinho.
    ocultarcarrinho();
}
//Function que verifica se há itens no carrinho. Se não houver, o carrinho é ocultado.
function ocultarcarrinho(){
    var carrinhoItems = document.getElementsByClassName('carrinho-items')[0];
    if(carrinhoItems.childElementCount==0){
    alternarVisibilidade()
    }
}
//Atualizamos o total do carrinho.
function actualizarTotalcarrinho(){
    //Selecionamos o contêiner do carrinho.
    var carrinhoContenedor = document.getElementsByClassName('carrinho')[0];
    var carrinhoItems = carrinhoContenedor.getElementsByClassName('carrinho-item');
    var total = 0;
    //Percorremos cada elemento do carrinho para atualizar o total.
    for(var i=0; i< carrinhoItems.length;i++){
        var item = carrinhoItems[i];
        var precoElemento = item.getElementsByClassName('carrinho-item-preco')[0];
        //Removemos o símbolo do peso e o separador de milhares.
        var preco = parseFloat(precoElemento.innerText.replace('$','').replace('.',''));
        var qtdItem = item.getElementsByClassName('carrinho-item-qtd')[0];
        console.log(preco);
        var qtd = qtdItem.value;
        total = total + (preco * qtd);
    }
    total = Math.round(total * 100)/100;

    document.getElementsByClassName('carrinho-preco-total')[0].innerText = '$'+total.toLocaleString("es") + ",00";

}
// Torna invisível se estiver visível.
function alternarVisibilidade(carinho) {
    var carrinho= document.getElementById('carrinho');
    if (carrinho.style.display !== "none") {
        carrinho.style.display = "none"; 
    } else {
        carrinho.style.display = "block"; 
    }
}

function adicionarAoCarrinho(botao) {
    // Obtém os elementos relativos ao botão clicado
    let product = botao.closest('.product');
    let imgSrc = product.querySelector('.img-item').src;
    let titulo = product.querySelector('.titulo-item').textContent;
    let preco = product.querySelector('.preco').textContent;
    
    // Cria um objeto com os detalhes do item
    let novoItem = {
        img: imgSrc,
        titulo: titulo,
        preco: preco,
        quantidade: 1
    };

    // Obtém a lista de itens do Local Storage ou cria uma nova lista
    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

    // Adiciona o novo item à lista do carrinho
    carrinho.push(novoItem);

    // Atualiza o Local Storage com a nova lista de itens
    localStorage.setItem('carrinho', JSON.stringify(carrinho));

    alert("Item adicionado ao carrinho!");
}




