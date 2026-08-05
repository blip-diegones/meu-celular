// Função para aplicar visualmente o estado "Selecionado" aos Cards de Defeito
function selecionarCardDefeito(elementoCard) {
  // Remove o estado ativo de todos os outros cards
  document.querySelectorAll('.card-defeito').forEach(card => {
    card.classList.remove('border-brand-yellow', 'bg-brand-yellow/15', 'shadow-[0_0_20px_rgba(255,200,0,0.25)]', 'scale-[1.02]');
    card.classList.add('border-zinc-800', 'bg-zinc-900/90');
  });

  // Aplica o efeito glow / ativo no card clicado
  elementoCard.classList.remove('border-zinc-800', 'bg-zinc-900/90');
  elementoCard.classList.add('border-brand-yellow', 'bg-brand-yellow/15', 'shadow-[0_0_20px_rgba(255,200,0,0.25)]', 'scale-[1.02]');

  // Marca o input radio interno
  const radio = elementoCard.querySelector('input[type="radio"]');
  if (radio) {
    radio.checked = true;
  }

  // Se o modelo ainda não estiver selecionado, abre o modal de escolha automaticamente
  if (!modeloSelecionadoObj) {
    abrirModal();
  }
}

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
