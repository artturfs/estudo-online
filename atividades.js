document.addEventListener('DOMContentLoaded', function () {
    const materiasContainer = document.getElementById('materias-container');
    const addMateriaForm = document.getElementById('add-materia-form');
    const materiaInput = document.getElementById('materia-input');

    // Função para obter ou inicializar dados de matérias salvas
    function getMateriasSalvas() {
        return JSON.parse(localStorage.getItem('materias')) || [];
    }

    // Função para salvar a lista atualizada de matérias no localStorage
    function salvarMaterias(materias) {
        localStorage.setItem('materias', JSON.stringify(materias));
    }

    // Função para adicionar matéria ao container e configurar as anotações e botões
    function adicionarMateria(nome) {
        const blocoMateria = document.createElement('div');
        blocoMateria.classList.add('materia-bloco');

        const tituloMateria = document.createElement('h3');
        tituloMateria.classList.add('materia-nome');
        tituloMateria.textContent = nome;

        const anotacoesTextarea = document.createElement('textarea');
        anotacoesTextarea.classList.add('materia-anotacoes');
        anotacoesTextarea.placeholder = 'Digite suas anotações...';
        anotacoesTextarea.value = localStorage.getItem(`anotacoes-${nome}`) || '';

        const salvarButton = document.createElement('button');
        salvarButton.classList.add('materia-salvar');
        salvarButton.textContent = 'Salvar Anotações';

        // Função de salvar as anotações no localStorage
        salvarButton.addEventListener('click', function () {
            localStorage.setItem(`anotacoes-${nome}`, anotacoesTextarea.value);
            alert('Anotações salvas!');
        });

        // Botão de remoção "X" para cada matéria
        const removeButton = document.createElement('button');
        removeButton.classList.add('remove-materia');
        removeButton.textContent = 'X';
        removeButton.addEventListener('click', function () {
            blocoMateria.remove();
            const materiasSalvas = getMateriasSalvas();
            const index = materiasSalvas.indexOf(nome);
            if (index > -1) {
                materiasSalvas.splice(index, 1);
                salvarMaterias(materiasSalvas);
            }
            localStorage.removeItem(`anotacoes-${nome}`);
        });

        // Adicionando elementos ao bloco de matéria
        blocoMateria.appendChild(removeButton);
        blocoMateria.appendChild(tituloMateria);
        blocoMateria.appendChild(anotacoesTextarea);
        blocoMateria.appendChild(salvarButton);
        materiasContainer.appendChild(blocoMateria);
    }

    // Carregar matérias salvas ao carregar a página
    const materiasSalvas = getMateriasSalvas();
    materiasSalvas.forEach((materia) => adicionarMateria(materia));

    // Adicionar nova matéria e salvar no localStorage
    addMateriaForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const nomeMateria = materiaInput.value.trim();
        if (nomeMateria && !materiasSalvas.includes(nomeMateria)) {
            adicionarMateria(nomeMateria);
            materiasSalvas.push(nomeMateria);
            salvarMaterias(materiasSalvas);
            materiaInput.value = ''; // Limpa o campo de entrada após adicionar
        } else if (materiasSalvas.includes(nomeMateria)) {
            alert('Essa matéria já foi adicionada!');
        }
    });
});
