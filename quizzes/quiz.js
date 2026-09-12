const quiz = document.getElementById("quizform");

const respostasCorretas = quiz.dataset.respostas.split(",");

for (let i = 1; i <= 5; i++) {
    const alternativas = document.querySelectorAll(`input[name="pergunta${i}"]`);

    alternativas.forEach(alternativa => {
        alternativa.addEventListener("change", function() {

            const feedback = document.getElementById(`feedback${i}`);

            if (this.value === respostasCorretas[i - 1]) {
                feedback.textContent = "Muito bem! Você acertou!";
                feedback.className = "feedback acerto";
            } else {
                feedback.textContent = "Quase! A resposta correta era: " + respostasCorretas[i - 1].toUpperCase();
                feedback.className = "feedback erro";
            }
            alternativas.forEach(opcao => {
                opcao.disabled = true;
            });

        });
    });

}

quiz.addEventListener("submit", function(event) {
    event.preventDefault();

    let acertos = 0;

    for (let i = 0; i < 5; i++) {
        if (quiz.querySelector(`input[name="pergunta${i + 1}"]:checked`)?.value === respostasCorretas[i]) {
            acertos++;
        }
    }

    const resultado = document.getElementById("resultado");
    const pontuacao = document.getElementById("pontuacao");
    const mensagem = document.getElementById("mensagem");

    pontuacao.textContent = `${acertos} de 5`;

    if (acertos === 5) {
        mensagem.textContent = "Perfeito! Você entendeu perfeitamente o conteúdo.";
    } else if (acertos >= 3) {
        mensagem.textContent = "Muito bom! Você já compreendeu uma grande parte do conteúdo.";
    } else if (acertos >= 1) {
        mensagem.textContent = "Bom começo! Você já aprendeu algumas coisas. Continue estudando!";
    } else {
        mensagem.textContent = "Que tal revisar o conteúdo e tentar novamente?";
    }

    resultado.style.display = "block";
});

document.getElementById("refazer").addEventListener("click", function() {
    location.reload();
});

document.getElementById("sair").addEventListener("click", function() {
    window.location.href = "../principal.html";
});