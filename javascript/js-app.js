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