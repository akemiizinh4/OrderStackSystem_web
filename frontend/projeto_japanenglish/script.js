// --- DADOS PERSISTENTES (LOCAL STORAGE) ---
let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
let cadastrado = localStorage.getItem('cadastrado') === 'true';
let dadosUsuario = JSON.parse(localStorage.getItem('dadosUsuario')) || {};
let produtoAtual = null;
let totalPedidoGlobal = 0;
let meuGrafico = null;

let historicoPilha = []; 
let contadorUndo = 0;    

let tempoBubbleFront = 0;
let tempoQuickFront = 0;

const menu = {
    pratos: [
        {n: "Lamen", p: 38.00, d: "Caldo à base de missô ou shoyu, macarrão, carne suína, ovo cozido, cebolinha e alga."},
        {n: "Udon", p: 36.00, d: "Macarrão grosso japonês, caldo leve, legumes, proteína e cebolinha."},
        {n: "Yakissoba", p: 32.00, d: "Macarrão oriental, legumes, carne/frango e molho shoyu."},
        {n: "Uramaki (8 un.)", p: 28.00, d: "Arroz por fora, recheio de salmão ou kani, cream cheese e gergelim."},
        {n: "Sashimi (10 un.)", p: 42.00, d: "Fatias de peixe cru (salmão ou atum)."},
        {n: "Temaki", p: 26.00, d: "Alga nori, arroz, salmão/kani, cream cheese e cebolinha."},
        {n: "Temaki Frito", p: 30.00, d: "Temaki empanado e frito com recheio de salmão e cream cheese."},
        {n: "Temaki Grelhado", p: 32.00, d: "Temaki com salmão grelhado, cream cheese e molho especial."},
        {n: "Missoshiru", p: 12.00, d: "Sopa de missô com tofu, cebolinha e alga."},
        {n: "Hossomaki (8 un.)", p: 24.00, d: "Arroz e alga com recheio simples (salmão, pepino ou kani)."},
        {n: "Hot Roll (8 un.)", p: 30.00, d: "Sushi empanado e frito com salmão e cream cheese."},
        {n: "Hambúrguer", p: 28.00, d: "Pão, carne bovina, queijo, alface, tomato e molho da casa."},
        {n: "Mac and Cheese", p: 25.00, d: "Macarrão com molho cremoso de queijos."},
        {n: "Buffalo Wings (6 un.)", p: 30.00, d: "Asinhas de frango com molho picante."},
        {n: "Barbecue Ribs", p: 45.00, d: "Costela suína ao molho barbecue."},
        {n: "Hot Dog", p: 18.00, d: "Pão, salsicha, molho, milho, batata palha e vinagrete."},
        {n: "Fried Chicken", p: 28.00, d: "Frango empanado e frito, crocante."},
        {n: "Pulled Pork Sandwich", p: 32.00, d: "Pão, carne suína desfiada, molho barbecue e salada."}
    ],
    acompanhamentos: [
        {n: "Gohan", p: 10.00, d: "Arroz branco temperado japonês."},
        {n: "Shimeji na manteiga", p: 18.00, d: "Cogumelos salteados com manteiga e shoyu."},
        {n: "Sunomono", p: 12.00, d: "Salada de pepino agridoce com gergelim."},
        {n: "Salada verde", p: 12.00, d: "Alface, tomate e molho."},
        {n: "Batata frita", p: 15.00, d: "Porção de batatas crocantes."},
        {n: "Onion rings", p: 16.00, d: "Anéis de cebola empanados."},
        {n: "Molhos extras", p: 3.00, d: "Tarê, shoyu ou maionese temperada."},
        {n: "Guioza (4 un.)", p: 18.00, d: "Pastel japonês recheado com carne suína."},
        {n: "Tempurá de legumes", p: 20.00, d: "Legumes empanados e fritos."}
    ],
    sobremesas: [
        {n: "Mochi", p: 12.00, d: "Bolinho de arroz com recheio doce.", opcoes: ["Tradicional", "Chocolate", "Morango"]},
        {n: "Dorayaki", p: 14.00, d: "Panqueca japonesa com recheio.", opcoes: ["Feijão Doce (Azuki)", "Chocolate"]},
        {n: "Tempurá de sorvete", p: 18.00, d: "Sorvete empanado e frito.", opcoes: ["Creme", "Chocolate", "Morango"]},
        {n: "Cheesecake", p: 20.00, d: "Creme de queijo e calda de frutas vermelhas.", opcoes: ["Frutas Vermelhas"]},
        {n: "Brownie", p: 15.00, d: "Bolo de chocolate denso com calda.", opcoes: ["Chocolate Tradicional"]},
        {n: "Petit gâteau", p: 22.00, d: "Bolinho cremoso com sorvete.", opcoes: ["Chocolate com Sorvete de Creme"]},
        {n: "Sorvete", p: 10.00, d: "Bola de sorvete (sabores variados).", opcoes: ["Creme", "Chocolate", "Morango", "Flocos"]},
        {n: "Banana caramelizada", p: 14.00, d: "Banana frita com calda de açúcar.", opcoes: ["Tradicional"]},
        {n: "Churros", p: 12.00, d: "Massa frita com doce de leite.", opcoes: ["Doce de Leite", "Chocolate"]}
    ],
    bebidas: [
        {n: "Refrigerante", p: 7.00, d: "Opções de latas geladas.", opcoes: ["Coca-Cola", "Guaraná", "Sprite", "Fanta"]},
        {n: "Suco natural", p: 10.00, d: "Suco feito na hora.", opcoes: ["Laranja", "Limão", "Maracujá", "Abacaxi"]},
        {n: "Suco industrializado", p: 8.00, d: "Opções em lata ou caixa.", opcoes: ["Uva", "Pêssego", "Manga"]},
        {n: "Água", p: 5.00, d: "Garrafa 500ml.", opcoes: ["Sem Gás", "Com Gás"]},
        {n: "Chá gelado", p: 8.00, d: "Ice Tea gelado.", opcoes: ["Pêssego", "Limão"]},
        {n: "Chá quente", p: 7.00, d: "Chá tradicional.", opcoes: ["Verde", "Preto"]},
        {n: "Cerveja", p: 12.00, d: "Lata 350ml.", opcoes: ["Skol", "Heineken", "Brahma"]},
        {n: "Saquê", p: 18.00, d: "Dose tradicional.", opcoes: ["Dose Padrão"]}
    ]
};

// === ORDENAÇÃO NO FRONTEND (Bubble e Quick Sort) ===
function bubbleSortPrecoJS(lista) {
    let n = lista.length;
    for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            if (lista[j].p > lista[j + 1].p) {
                let temp = lista[j];
                lista[j] = lista[j + 1];
                lista[j + 1] = temp;
            }
        }
    }
}

function quickSortNomeJS(lista, baixo, alto) {
    if (baixo < alto) {
        let pi = partitionJS(lista, baixo, alto);
        quickSortNomeJS(lista, baixo, pi - 1);
        quickSortNomeJS(lista, pi + 1, alto);
    }
}

function partitionJS(lista, baixo, alto) {
    let pivo = lista[alto].n;
    let i = baixo - 1;
    for (let j = baixo; j < alto; j++) {
        if (lista[j].n.toLowerCase().localeCompare(pivo.toLowerCase()) <= 0) {
            i++;
            let temp = lista[i];
            lista[i] = lista[j];
            lista[j] = temp;
        }
    }
    let temp = lista[i + 1];
    lista[i + 1] = lista[alto];
    lista[alto] = temp;
    return i + 1;
}

function sincronizarDashboardJava() {
    fetch('http://localhost:8080/api/dashboard', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ bubble: tempoBubbleFront, quick: tempoQuickFront, undos: contadorUndo })
    }).catch(e => console.log("Servidor off, executando apenas localmente."));
}

// Executa a ordenação, recarrega o cardápio e atualiza o Dashboard
function ordenarEAtualizar(criterio) {
    const start = performance.now();
    let tempo = 0;

    Object.keys(menu).forEach(categoria => {
        if(criterio === 'preco') {
            bubbleSortPrecoJS(menu[categoria]);
        } else if(criterio === 'nome') {
            quickSortNomeJS(menu[categoria], 0, menu[categoria].length - 1);
        }
    });

    tempo = performance.now() - start;
    
    carregarMenu();

    if (criterio === 'preco') {
        tempoBubbleFront = tempo; 
        document.getElementById('dash-bubble').innerText = tempo.toFixed(3) + " ms";
        atualizarGraficoLocal(tempoBubbleFront, tempoQuickFront);
        mostrarToast(`Cardápio ordenado por Preço (Bubble Sort) em ${tempo.toFixed(3)} ms`, "sucesso");
    } else {
        tempoQuickFront = tempo; 
        document.getElementById('dash-quick').innerText = tempo.toFixed(3) + " ms";
        atualizarGraficoLocal(tempoBubbleFront, tempoQuickFront);
        mostrarToast(`Cardápio ordenado por A-Z (Quick Sort) em ${tempo.toFixed(3)} ms`, "sucesso");
    }

    sincronizarDashboardJava();
}

function ordenarPorPrecoFrontend() {
    let listaCompleta = [...menu.pratos, ...menu.acompanhamentos, ...menu.sobremesas, ...menu.bebidas];
    const start = performance.now();
    bubbleSortPrecoJS(listaCompleta);
    tempoBubbleFront = performance.now() - start;

    document.getElementById('dash-bubble').innerText = tempoBubbleFront.toFixed(3) + " ms";
    atualizarGraficoLocal(tempoBubbleFront, tempoQuickFront);
    mostrarToast(`Bubble Sort (Frontend) → ${tempoBubbleFront.toFixed(3)} ms`, "sucesso");
    sincronizarDashboardJava();
}

function ordenarPorNomeFrontend() {
    let listaCompleta = [...menu.pratos, ...menu.acompanhamentos, ...menu.sobremesas, ...menu.bebidas];
    const start = performance.now();
    quickSortNomeJS(listaCompleta, 0, listaCompleta.length - 1);
    tempoQuickFront = performance.now() - start;

    document.getElementById('dash-quick').innerText = tempoQuickFront.toFixed(3) + " ms";
    atualizarGraficoLocal(tempoBubbleFront, tempoQuickFront);
    mostrarToast(`Quick Sort (Frontend) → ${tempoQuickFront.toFixed(3)} ms`, "sucesso");
    sincronizarDashboardJava();
}

// === ATUALIZAÇÃO DO GRÁFICO LOCAL (FRONTEND) ===
function atualizarGraficoLocal(bubbleTempo, quickTempo) {
    if (meuGrafico) {
        if (bubbleTempo !== null) {
            meuGrafico.data.datasets[0].data[0] = bubbleTempo;
        }
        if (quickTempo !== null) {
            meuGrafico.data.datasets[0].data[1] = quickTempo;
        }
        meuGrafico.update();
    } else {
        const ctx = document.getElementById('graficoOrdenacao').getContext('2d');
        let corTexto = document.documentElement.getAttribute('data-theme') === 'dark' ? '#f1f1f1' : '#333';

        meuGrafico = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Bubble Sort (O(n²))', 'Quick Sort (O(n log n))'],
                datasets: [{
                    label: 'Tempo de Execução (ms)',
                    data: [bubbleTempo !== null ? bubbleTempo : 0, quickTempo !== null ? quickTempo : 0],
                    backgroundColor: [
                        'rgba(230, 57, 70, 0.8)',
                        'rgba(26, 42, 68, 0.8)'
                    ],
                    borderColor: [
                        'rgba(230, 57, 70, 1)',
                        'rgba(26, 42, 68, 1)'
                    ],
                    borderWidth: 2,
                    borderRadius: 5
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        title: { display: true, text: 'Tempo em milissegundos (ms)', color: corTexto },
                        ticks: { color: corTexto }
                    },
                    x: {
                        ticks: { color: corTexto }
                    }
                }
            }
        });
    }
}
// ===========================================

// --- 1. REGISTRO DO PWA ---
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js').then(() => {
        console.log("PWA Ativado: Service Worker Registrado com Sucesso!");
    });
}

// --- 2. SISTEMA DE TOASTS ---
function mostrarToast(mensagem, tipo = 'sucesso') {
    let container = document.getElementById('toast-container');
    if (!container) {
        container = document.createElement('div');
        container.id = 'toast-container';
        document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = `toast ${tipo}`;
    toast.innerText = mensagem;
    container.appendChild(toast);
    
    setTimeout(() => toast.classList.add('mostrar'), 10);
    setTimeout(() => {
        toast.classList.remove('mostrar');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// --- 3. INTEGRAÇÃO VIACEP ---
function buscarCEP(cep, prefixo = '') {
    cep = cep.replace(/\D/g, '');
    if (cep.length === 8) {
        mostrarToast("Buscando endereço...", "aviso");
        fetch(`https://viacep.com.br/ws/${cep}/json/`)
            .then(res => res.json())
            .then(data => {
                if (!data.erro) {
                    document.getElementById(prefixo + 'endereco').value = data.logradouro;
                    document.getElementById(prefixo + 'bairro').value = data.bairro;
                    document.getElementById(prefixo + 'cidade').value = data.localidade + ' - ' + data.uf;
                    mostrarToast("Endereço preenchido!", "sucesso");
                } else {
                    mostrarToast("CEP não encontrado", "erro");
                }
            })
            .catch(() => mostrarToast("Erro ao buscar CEP", "erro"));
    }
}

document.getElementById('cep')?.addEventListener('blur', (e) => buscarCEP(e.target.value));
document.getElementById('out-cep')?.addEventListener('blur', (e) => buscarCEP(e.target.value, 'out-'));

// --- 4. DARK MODE ---
function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    document.getElementById('btn-theme').innerText = newTheme === 'dark' ? '☀️' : '🌙';
    
    if (meuGrafico) {
        let corTexto = newTheme === 'dark' ? '#f1f1f1' : '#333';
        meuGrafico.options.scales.x.ticks.color = corTexto;
        meuGrafico.options.scales.y.ticks.color = corTexto;
        meuGrafico.update();
    }
}

// --- 5. BARRA DE BUSCA ---
function filtrarCardapio() {
    const termo = document.getElementById('busca-cardapio').value.toLowerCase();
    const cards = document.querySelectorAll('#cardapio .card-produto');
    
    cards.forEach(card => {
        const nomeProduto = card.querySelector('h3').innerText.toLowerCase();
        const descProduto = card.querySelector('p').innerText.toLowerCase();
        
        if(nomeProduto.includes(termo) || descProduto.includes(termo)) {
            card.style.display = 'flex';
        } else {
            card.style.display = 'none';
        }
    });
}

// --- INICIALIZAÇÃO DA PÁGINA ---
function inicializarApp() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    const btnTheme = document.getElementById('btn-theme');
    if (btnTheme) btnTheme.innerText = savedTheme === 'dark' ? '☀️' : '🌙';

    carregarMenu();
    atualizarContadores();
    atualizarCarrinhoUI();

    if(cadastrado) {
        document.getElementById('nome').value = dadosUsuario.nome || '';
        document.getElementById('cpf').value = dadosUsuario.cpf || '';
        document.getElementById('tel').value = dadosUsuario.tel || '';
        document.getElementById('cep').value = dadosUsuario.cep || '';
        document.getElementById('bairro').value = dadosUsuario.bairro || '';
        document.getElementById('endereco').value = dadosUsuario.endereco || '';
        document.getElementById('comp').value = dadosUsuario.comp || '';
        document.getElementById('cidade').value = dadosUsuario.cidade || '';
    }
}

function irPara(id) {
    document.querySelectorAll('section').forEach(s => s.classList.remove('active'));
    document.getElementById(id).classList.add('active');
    window.scrollTo(0,0);
}

function carregarMenu() {
    const render = (lista, divId, categoria) => {
        document.getElementById(divId).innerHTML = lista.map(item => `
            <div class="card-produto" onclick='abrirModal(${JSON.stringify(item)}, "${categoria}")'>
                <h3 style="margin-top: 0;">${item.n}</h3>
                <p style="font-size:0.85em; color: var(--texto); opacity: 0.8;">${item.d}</p>
                <span class="preco">R$ ${item.p.toFixed(2)}</span>
            </div>
        `).join('');
    };
    render(menu.pratos, 'lista-pratos', 'pratos');
    render(menu.acompanhamentos, 'lista-acompanhamentos', 'acompanhamentos');
    render(menu.sobremesas, 'lista-sobremesas', 'sobremesas');
    render(menu.bebidas, 'lista-bebidas', 'bebidas');
}

function abrirModal(item, categoria) {
    produtoAtual = item;
    document.getElementById('modal-nome').innerText = item.n;
    document.getElementById('modal-preco').innerText = "R$ " + item.p.toFixed(2);
    document.getElementById('modal-desc').innerText = item.d;
    
    const txtObs = document.getElementById('modal-obs');
    const selSabor = document.getElementById('modal-sabor');
    const label = document.getElementById('label-opcao');

    if(categoria === 'sobremesas' || categoria === 'bebidas') {
        txtObs.style.display = 'none';
        selSabor.style.display = 'block';
        label.innerText = "Selecione o Sabor/Tipo:";
        selSabor.innerHTML = item.opcoes.map(opt => `<option value="${opt}">${opt}</option>`).join('');
    } else {
        txtObs.style.display = 'block';
        selSabor.style.display = 'none';
        label.innerText = "Observações:";
        txtObs.value = "";
    }

    document.getElementById('modal-produto').style.display = 'block';
}

function fecharModal() { document.getElementById('modal-produto').style.display = 'none'; }

// --- CARRINHO INTELIGENTE ---
function atualizarContadores() {
    let totalItens = carrinho.reduce((acc, item) => acc + item.qtd, 0);
    document.getElementById('count').innerText = totalItens;
    let countFloat = document.getElementById('count-float');
    if(countFloat) countFloat.innerText = totalItens;
    
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
}

function adicionarConfirmado() {
    let escolha = document.getElementById('modal-sabor').style.display === 'block' ? 
                  "Sabor: " + document.getElementById('modal-sabor').value : 
                  document.getElementById('modal-obs').value;

    let indexExistente = carrinho.findIndex(i => i.nome === produtoAtual.n && i.obs === escolha);

    if (indexExistente !== -1) {
        carrinho[indexExistente].qtd += 1;
    } else {
        carrinho.push({nome: produtoAtual.n, preco: produtoAtual.p, obs: escolha, qtd: 1});
    }
    
    historicoPilha.push({nome: produtoAtual.n, obs: escolha});
    
    atualizarContadores();
    atualizarCarrinhoUI();
    fecharModal();
    mostrarToast(`${produtoAtual.n} adicionado!`, "sucesso");
}

function desfazerUltimaAcao() {
    if (historicoPilha.length === 0) {
        mostrarToast("Nenhuma ação para desfazer (Pilha vazia).", "erro");
        return;
    }

    let ultimoItem = historicoPilha.pop();
    
    let index = carrinho.findIndex(i => i.nome === ultimoItem.nome && i.obs === ultimoItem.obs);
    if (index !== -1) {
        carrinho[index].qtd -= 1;
        if (carrinho[index].qtd <= 0) {
            carrinho.splice(index, 1);
        }
    }

    contadorUndo++;
    let dashUndo = document.getElementById('dash-undo');
    if(dashUndo) dashUndo.innerText = contadorUndo;

    atualizarContadores();
    atualizarCarrinhoUI();
    mostrarToast("Desfez adição de " + ultimoItem.nome, "aviso");
    
    sincronizarDashboardJava();
}

function alterarQtd(index, delta) {
    carrinho[index].qtd += delta;
    if (carrinho[index].qtd <= 0) {
        carrinho.splice(index, 1);
        mostrarToast("Item removido", "aviso");
    }
    atualizarContadores();
    atualizarCarrinhoUI();
}

function atualizarCarrinhoUI() {
    let total = 0;
    document.getElementById('itens-carrinho').innerHTML = carrinho.map((i, index) => {
        let subtotal = i.preco * i.qtd;
        total += subtotal;
        return `<div style="display:flex; justify-content:space-between; align-items:center; padding:15px 8px; border-bottom:1px solid var(--borda)">
            <div style="flex: 1;">
                <strong>${i.nome}</strong> <br>
                <small style="opacity: 0.7;">${i.obs || 'Sem observações'}</small><br>
                <span style="color: var(--vermelho); font-weight: bold;">R$ ${subtotal.toFixed(2)}</span>
            </div>
            <div style="display:flex; align-items:center; gap: 10px;">
                <button class="btn-qtd" onclick="alterarQtd(${index}, -1)">-</button>
                <span style="font-weight: bold; font-size: 1.2rem; width: 20px; text-align: center;">${i.qtd}</span>
                <button class="btn-qtd" onclick="alterarQtd(${index}, 1)">+</button>
            </div>
        </div>`;
    }).join('');
    
    if(carrinho.length === 0) {
        document.getElementById('itens-carrinho').innerHTML = "<p>Seu carrinho está vazio.</p>";
        document.getElementById('secao-pagamento').style.display = 'none';
        document.getElementById('btn-abrir-pagamento').style.display = 'block';
    }
    
    totalPedidoGlobal = total;
    document.getElementById('total-pedido').innerText = "Total: R$ " + total.toFixed(2);
}

// --- CADASTRO E AVALIAÇÕES ---
function finalizarCadastro() {
    const campos = ['nome', 'cpf', 'tel', 'cep', 'bairro', 'endereco', 'cidade'];
    let erro = false;

    campos.forEach(id => {
        if(document.getElementById(id).value.trim() === "") {
            erro = true;
        }
    });

    if(erro) {
        mostrarToast("Preencha todos os campos obrigatórios!", "erro");
        return;
    }

    dadosUsuario = {
        nome: document.getElementById('nome').value,
        cpf: document.getElementById('cpf').value,
        tel: document.getElementById('tel').value,
        cep: document.getElementById('cep').value,
        bairro: document.getElementById('bairro').value,
        endereco: document.getElementById('endereco').value,
        comp: document.getElementById('comp').value,
        cidade: document.getElementById('cidade').value
    };

    cadastrado = true;
    localStorage.setItem('cadastrado', 'true');
    localStorage.setItem('dadosUsuario', JSON.stringify(dadosUsuario));

    mostrarToast("Cadastro Concluído com Sucesso!", "sucesso");
    setTimeout(() => irPara('cardapio'), 1000);
}

function enviarAvaliacao() {
    let texto = document.getElementById('texto-avaliacao').value;
    let notaValor = document.getElementById('nota-avaliacao').value;
    let inputNome = document.getElementById('nome-avaliacao') ? document.getElementById('nome-avaliacao').value.trim() : "";
    let isAnonimo = document.getElementById('anonimo-avaliacao') ? document.getElementById('anonimo-avaliacao').checked : false;

    if(texto.trim() === "") {
        mostrarToast("Escreva um comentário para avaliar.", "erro");
        return;
    }

    let estrelas = "★".repeat(notaValor) + "☆".repeat(5 - notaValor);
    let nomeCliente = "Visitante";
    
    if (isAnonimo) {
        nomeCliente = "Anônimo";
    } else if (inputNome !== "") {
        nomeCliente = inputNome;
    } else {
        nomeCliente = dadosUsuario.nome || "Visitante";
    }

    let novoCard = `
        <div class="card-produto" style="cursor: default;">
            <h3 style="margin-top:0;">${nomeCliente} <span style="color: #f1c40f; float: right;">${estrelas}</span></h3>
            <p>"${texto}"</p>
            <small style="opacity: 0.6; margin-top: 10px; display: block;">Agora mesmo</small>
        </div>
    `;

    document.getElementById('grid-avaliacoes').insertAdjacentHTML('afterbegin', novoCard);
    mostrarToast("Avaliação enviada! Obrigado.", "sucesso");
    
    document.getElementById('texto-avaliacao').value = "";
    if(document.getElementById('nome-avaliacao')) document.getElementById('nome-avaliacao').value = "";
    if(document.getElementById('anonimo-avaliacao')) document.getElementById('anonimo-avaliacao').checked = false;
}

// --- CHECKOUT E PAGAMENTO ---
function selecionarEndereco(tipo) {
    document.getElementById('btn-end-padrao').classList.remove('active');
    document.getElementById('btn-end-outro').classList.remove('active');
    
    if(tipo === 'padrao') {
        document.getElementById('btn-end-padrao').classList.add('active');
        document.getElementById('form-outro-endereco').style.display = 'none';
    } else {
        document.getElementById('btn-end-outro').classList.add('active');
        document.getElementById('form-outro-endereco').style.display = 'block';
    }
}

function abrirAbaPagamento() {
    if(carrinho.length === 0) { 
        mostrarToast("Carrinho vazio! Adicione itens primeiro.", "erro"); 
        return; 
    }
    
    if(!cadastrado) { 
        mostrarToast("Faça seu cadastro para prosseguir!", "aviso"); 
        irPara('cadastro'); 
        return; 
    }
    
    document.getElementById('secao-pagamento').style.display = 'block';
    document.getElementById('btn-abrir-pagamento').style.display = 'none';
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
}

function selecionarPagamento(metodo, btn) {
    let botoes = document.querySelectorAll('#secao-pagamento .btn-selecao');
    botoes.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const divCartao = document.getElementById('campos-cartao');
    const divPix = document.getElementById('pix-qr-container');

    if(divCartao) divCartao.style.display = 'none';
    if(divPix) divPix.style.display = 'none';

    if(metodo === 'credito' || metodo === 'debito') {
        if(divCartao) divCartao.style.display = 'block';
    } else if (metodo === 'pix' && divPix) {
        divPix.style.display = 'block';
        
        const valorAjustado = totalPedidoGlobal.toFixed(2).replace('.', '');
        const codigoPix = `00020126580014br.gov.bcb.pix0136japan-english-delivery@email.com520400005303986540${valorAjustado}5802BR5913Japan English6006SuaCidade62070503***6304ABCD`;
        const qrData = encodeURIComponent(codigoPix);

        divPix.innerHTML = `
            <p style="margin-top:0;"><strong>Escaneie o QR Code ou use o Pix Copia e Cola</strong></p>
            <img src="https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=${qrData}" style="max-width:100%; height:auto; border-radius: 8px; border: 2px solid var(--borda);" alt="QR Code PIX">
            <p style="color: var(--vermelho); font-weight: bold; font-size: 1.2rem; margin-bottom: 5px;">Valor: R$ ${totalPedidoGlobal.toFixed(2)}</p>
            
            <div style="display: flex; gap: 10px; margin-top: 15px; align-items: center; flex-direction: column;">
                <input type="text" id="input-copia-cola" value="${codigoPix}" readonly style="width: 100%; font-size: 0.8em; cursor: text; background: var(--branco); color: var(--texto); border: 1px solid var(--borda);">
                <button class="btn-acao" style="margin: 0; width: 100%;" onclick="copiarPix()">Copiar Código</button>
            </div>
        `;
    }
}

function identificarBandeira() {
    const inputCartao = document.getElementById('num-cartao');
    let numero = inputCartao.value.replace(/\D/g, ''); 
    const spanBandeira = document.getElementById('bandeira-cartao');

    let formatado = numero.replace(/(\d{4})(?=\d)/g, '$1 ');
    inputCartao.value = formatado;

    let bandeira = '💳';
    let cor = 'var(--texto)'; 

    if (numero.startsWith('4')) {
        bandeira = 'VISA';
        cor = '#142787';
    } else if (/^(5[1-5]|2[2-7])/.test(numero)) {
        bandeira = 'MASTERCARD';
        cor = '#ff5f00';
    } else if (/^3[47]/.test(numero)) {
        bandeira = 'AMEX';
        cor = '#2e77bb';
    } else if (/^(606282|3841)/.test(numero)) {
        bandeira = 'HIPERCARD';
        cor = '#b92a25';
    } else if (/^(4011|4312|4389|4514|4576|5041|5066|5090|6277|6362|6363|6504|6505|6507|6509|6516|6550)/.test(numero)) {
        bandeira = 'ELO';
        cor = '#00a4e0';
    }

    spanBandeira.innerText = bandeira;
    spanBandeira.style.color = cor;
}

function copiarPix() {
    const inputCopiaCola = document.getElementById("input-copia-cola");
    inputCopiaCola.select();
    inputCopiaCola.setSelectionRange(0, 99999); 
    
    if (navigator.clipboard) {
        navigator.clipboard.writeText(inputCopiaCola.value).then(() => {
            mostrarToast("Código PIX copiado!", "sucesso");
        }).catch(() => {
            document.execCommand("copy");
            mostrarToast("Código PIX copiado!", "sucesso");
        });
    } else {
        document.execCommand("copy");
        mostrarToast("Código PIX copiado!", "sucesso");
    }
}

function finalizarPedido() {
    if (carrinho.length === 0) {
        mostrarToast("Seu carrinho está vazio!", "erro");
        return;
    }

    let pagSelecionado = document.querySelector('#secao-pagamento .btn-selecao.active');
    if (!pagSelecionado) {
        mostrarToast("Selecione uma forma de pagamento!", "erro");
        return;
    }

    const pedidoData = {
        nome: dadosUsuario.nome || "Cliente Convidado",
        cpf: dadosUsuario.cpf || "000.000.000-00",
        itens: carrinho.map(item => ({
            id: 999,                    // pode melhorar depois
            nome: item.nome,
            preco: item.preco,
            quantidade: item.qtd,
            observacao: item.obs || ""
        })),
        total: totalPedidoGlobal
    };

    mostrarToast("Enviando pedido para a cozinha...", "aviso");

    fetch('http://localhost:8080/api/pedido', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(pedidoData)
    })
    .then(response => {
        if (response.ok) {
            mostrarToast("Pedido recebido pela cozinha com sucesso!", "sucesso");
            limparCarrinhoEIrParaRastreio();
        } else {
            mostrarToast("Erro na comunicação com o restaurante.", "erro");
        }
    })
    .catch(error => {
        console.error("Erro ao conectar com o Java:", error);
        mostrarToast("Modo Offline: Pedido simulado aprovado.", "aviso");
        limparCarrinhoEIrParaRastreio();
    });
}

function limparCarrinhoEIrParaRastreio() {
    carrinho = [];
    atualizarContadores();
    atualizarCarrinhoUI();
    
    irPara('rastreio');
    simularRastreio();
}

function simularRastreio() {
    let barra = document.getElementById('barra');
    let texto = document.getElementById('status-texto');
    let moto = document.getElementById('entregador-mapa');
    let btn = document.getElementById('btn-confirmar-entrega');
    
    if(!barra || !texto || !moto) return;

    barra.style.width = "10%";
    texto.innerText = "Recebendo pedido e preparando na cozinha...";
    moto.style.left = "8%";
    moto.style.top = "32px";

    setTimeout(() => {
        barra.style.width = "40%";
        texto.innerHTML = "<strong>O entregador Roberto está a caminho!</strong><br>Acompanhe no mapa abaixo.";
        moto.style.left = "45.5%"; 
    }, 2500);

    setTimeout(() => {
        barra.style.width = "70%";
        moto.style.top = "112px"; 
    }, 4000);

    setTimeout(() => {
        moto.style.left = "85%"; 
    }, 5500);

    setTimeout(() => {
        barra.style.width = "90%";
        texto.innerHTML = "<strong>O entregador está na sua porta!</strong>";
        if(btn) btn.style.display = "block"; // Mostra o botão para o cliente
    }, 7500);
}

// ENVIA A CONFIRMAÇÃO PARA O JAVA
function confirmarEntregaReal() {
    const nomeCli = dadosUsuario.nome || "Cliente Web";
    
    fetch('http://localhost:8080/api/pedido-entregue', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome: nomeCli, status: "ENTREGUE" })
    }).then(() => {
        document.getElementById('barra').style.width = "100%";
        document.getElementById('status-texto').innerText = "Entrega confirmada! Bom apetite.";
        document.getElementById('btn-confirmar-entrega').style.display = "none";
        mostrarToast("Obrigado por confirmar!", "sucesso");
    }).catch(e => {
        document.getElementById('barra').style.width = "100%";
        document.getElementById('status-texto').innerText = "Entrega confirmada! Bom apetite.";
        document.getElementById('btn-confirmar-entrega').style.display = "none";
        mostrarToast("Pedido Finalizado (Modo Offline)!", "sucesso");
    });
}

// --- DASHBOARD INTERATIVO: Renderização independente do Servidor ---
function carregarDashboard() {
    mostrarToast("Buscando dados do servidor...", "aviso");
    fetch('http://localhost:8080/api/dashboard')
        .then(response => {
            if (!response.ok) throw new Error("Erro na rede");
            return response.json();
        })
        .then(data => {
            document.getElementById('dash-fila').innerText = data.fila + (data.fila === 1 ? " pedido" : " pedidos");
            document.getElementById('dash-processados').innerText = data.pedidos;
            document.getElementById('dash-memoria').innerText = data.memoria + " MB";
           
            // NOVIDADE: Atualiza a taxa de arrependimento (Undo) com os dados do Servidor Java
            if (data.undos !== undefined) {
                contadorUndo = data.undos; // Sincroniza a variável global
                let dashUndo = document.getElementById('dash-undo');
                if (dashUndo) dashUndo.innerText = contadorUndo;
            }
           
            const cards = document.querySelectorAll('#grid-dashboard .card-produto');
            cards.forEach(card => {
                card.style.transform = "scale(1.05)";
                setTimeout(() => card.style.transform = "scale(1)", 200);
            });
            mostrarToast("Dashboard atualizado com sucesso!", "sucesso");
        })
        .catch(error => {
            console.error("Erro ao conectar com o Java:", error);
            mostrarToast("Servidor Local não encontrado. Exibindo métricas apenas do Frontend.", "erro");
        });
}

inicializarApp();