function enviarDiagnostico(event) {
  event.preventDefault();
  
  const modelo = document.getElementById('inputModeloFinal').value;
  const defeitoRadio = document.querySelector('input[name="defeito"]:checked');

  if (!defeitoRadio) {
    alert("Por favor, selecione qual é o problema principal do seu celular.");
    return;
  }

  if (!modelo) {
    alert("Por favor, selecione o modelo do seu celular.");
    abrirModal();
    return;
  }

  const defeito = defeitoRadio.value;
  const mensagem = `Olá! Fiz o Diagnóstico Inteligente no site:\n\n📱 *Aparelho:* ${modelo}\n⚙️ *Problema:* ${defeito}\n\nGostaria de confirmação do orçamento e agendamento para conserto.`;
  
  const linkWhatsApp = `https://api.whatsapp.com/send?text=${encodeURIComponent(mensagem)}`;
  window.open(linkWhatsApp, '_blank');
}

function selecionarCardDefeito(element) {
  // 1. Remove o estilo ativado de todos os cards de defeito
  document.querySelectorAll('.card-defeito').forEach(card => {
    card.classList.remove('border-brand-yellow', 'bg-brand-yellow/10', 'shadow-[0_0_20px_rgba(255,200,0,0.25)]');
    card.classList.add('border-zinc-800', 'bg-zinc-900/90');
    
    // Reseta cor do texto do título
    const titleSpan = card.querySelector('span');
    if (titleSpan) {
      titleSpan.classList.remove('brand-yellow');
      titleSpan.classList.add('text-zinc-200');
    }
  });

  // 2. Aplica o destaque no card clicado
  element.classList.remove('border-zinc-800', 'bg-zinc-900/90');
  element.classList.add('border-brand-yellow', 'bg-brand-yellow/10', 'shadow-[0_0_20px_rgba(255,200,0,0.25)]');

  const titleSpan = element.querySelector('span');
  if (titleSpan) {
    titleSpan.classList.remove('text-zinc-200');
    titleSpan.classList.add('brand-yellow');
  }

  // 3. Marca o radio button interno
  const radio = element.querySelector('input[type="radio"]');
  if (radio) {
    radio.checked = true;
  }

  // 4. Se ainda não tiver selecionado o celular, abre o modal de seleção
  if (typeof selecionouDefeito === 'function') {
    selecionouDefeito();
  }
}
