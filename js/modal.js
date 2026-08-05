let bancoDeDadosAparelhos = [];
let marcaFiltroAtual = "Todas";
let modeloSelecionadoObj = null;

async function carregarAparelhos() {
  try {
    const res = await fetch('./data/devices.json');
    bancoDeDadosAparelhos = await res.json();
  } catch (err) {
    console.error("Erro ao carregar base de dados de aparelhos:", err);
  }
}

function selecionouDefeito() {
  if (!modeloSelecionadoObj) {
    abrirModal();
  }
}

function abrirModal() {
  const modal = document.getElementById('modelModal');
  modal.classList.remove('hidden-modal');
  document.getElementById('searchInput').value = '';
  filtrarModelos();
  setTimeout(() => document.getElementById('searchInput').focus(), 150);
}

function fecharModal() {
  document.getElementById('modelModal').classList.add('hidden-modal');
}

function setMarcaFiltro(marca) {
  marcaFiltroAtual = marca;
  document.querySelectorAll('.marca-btn').forEach(btn => {
    if (btn.innerText.includes(marca) || (marca === 'Todas' && btn.innerText === 'Todas')) {
      btn.className = "marca-btn active px-3 py-1.5 rounded-lg bg-brand-yellow text-black font-bold whitespace-nowrap";
    } else {
      btn.className = "marca-btn px-3 py-1.5 rounded-lg bg-zinc-800 text-zinc-300 hover:bg-zinc-700 font-medium whitespace-nowrap";
    }
  });
  filtrarModelos();
}

function filtrarModelos() {
  const termo = document.getElementById('searchInput').value.toLowerCase().trim();
  const container = document.getElementById('listaModelos');
  container.innerHTML = '';

  const resultados = bancoDeDadosAparelhos.filter(item => {
    const atendeMarca = marcaFiltroAtual === "Todas" || item.brand === marcaFiltroAtual;
    const atendeBusca = item.model.toLowerCase().includes(termo) || item.brand.toLowerCase().includes(termo);
    return atendeMarca && atendeBusca;
  });

  if (resultados.length === 0) {
    container.innerHTML = `
      <div class="text-center py-8">
        <p class="text-xs text-zinc-400 mb-3">Nenhum aparelho encontrado com "${termo}"</p>
        <button type="button" onclick="selecionarComTextoManual('${termo}')" class="px-4 py-2 bg-zinc-800 border border-brand-yellow/40 rounded-xl text-xs font-bold brand-yellow hover:bg-brand-yellow hover:text-black transition">
          Usar "${termo}" mesmo assim
        </button>
      </div>
    `;
    return;
  }

  resultados.forEach(item => {
    const div = document.createElement('div');
    div.className = "p-3 hover:bg-zinc-900 rounded-xl cursor-pointer flex items-center justify-between transition group border border-transparent hover:border-zinc-800";
    div.onclick = () => escolherAparelhoObjeto(item);
    div.innerHTML = `
      <div class="flex items-center gap-3">
        <span class="text-xs text-zinc-500 font-mono bg-zinc-900 px-2 py-1 rounded border border-zinc-800">${item.brand}</span>
        <span class="text-sm font-semibold text-zinc-200 group-hover:text-white">${item.model}</span>
      </div>
      <i class="fa-solid fa-chevron-right text-xs text-zinc-600 group-hover:text-brand-yellow transition"></i>
    `;
    container.appendChild(div);
  });
}

function escolherAparelhoObjeto(itemObj) {
  modeloSelecionadoObj = itemObj;
  document.getElementById('inputModeloFinal').value = itemObj.model;
  
  const textSpan = document.getElementById('selectedDeviceText');
  textSpan.innerText = itemObj.model;
  textSpan.className = "text-sm font-bold text-white";

  document.getElementById('kbBrand').innerText = itemObj.brand;
  document.getElementById('kbModel').innerText = itemObj.model;
  document.getElementById('kbWarranty').innerText = itemObj.warranty;
  document.getElementById('kbTime').innerText = itemObj.estimatedTime;

  const tagsContainer = document.getElementById('kbTags');
  tagsContainer.innerHTML = '';
  itemObj.repairs.forEach(rep => {
    const tag = document.createElement('span');
    tag.className = "bg-zinc-800 text-zinc-300 border border-zinc-700/60 px-2.5 py-1 rounded-lg font-medium";
    tag.innerText = `• ${rep}`;
    tagsContainer.appendChild(tag);
  });

  document.getElementById('knowledgeCard').classList.remove('hidden');
  fecharModal();
}

function selecionarOutroModelo() {
  const digitado = prompt("Digite a marca e o modelo do seu celular:");
  if (digitado && digitado.trim() !== '') {
    selecionarComTextoManual(digitado.trim());
  }
}

function selecionarComTextoManual(texto) {
  if (!texto) return;
  const genObj = {
    brand: "Aparelho",
    model: texto,
    repairs: ["Tela", "Bateria", "Conector de Carga", "Análise de Placa"],
    estimatedTime: "30 - 90 min",
    warranty: "Garantia Escrita"
  };
  escolherAparelhoObjeto(genObj);
}

document.addEventListener('DOMContentLoaded', carregarAparelhos);