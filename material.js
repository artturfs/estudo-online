// Seletores
const addMateriaForm = document.getElementById('add-materia-form');
const materiaInput = document.getElementById('materia-input');
const materiasList = document.getElementById('materias-list');
const salvarBtn = document.getElementById('salvar-btn');

// Função para carregar as matérias do localStorage
function carregarMaterias() {
    const materiasSalvas = JSON.parse(localStorage.getItem('materias')) || [];
    materiasSalvas.forEach(materia => {
        criarMateria(materia.nome, materia.arquivos);
    });
}

// Função para criar uma matéria
function criarMateria(nome, arquivos = []) {
    const materiaBloco = document.createElement('div');
    materiaBloco.classList.add('materia-bloco');

    const materiaNomeElement = document.createElement('div');
    materiaNomeElement.classList.add('materia-nome');
    materiaNomeElement.textContent = nome;

    const addArquivoBtn = document.createElement('button');
    addArquivoBtn.textContent = 'Adicionar Arquivo';
    addArquivoBtn.classList.add('add-arquivo-btn');
    addArquivoBtn.addEventListener('click', () => addArquivo(materiaBloco));

    const removeMateriaBtn = document.createElement('button');
    removeMateriaBtn.textContent = 'X';
    removeMateriaBtn.classList.add('remove-materia-btn');
    removeMateriaBtn.addEventListener('click', () => materiaBloco.remove());

    materiaBloco.appendChild(removeMateriaBtn);
    materiaBloco.appendChild(materiaNomeElement);
    materiaBloco.appendChild(addArquivoBtn);

    const arquivosList = document.createElement('div');
    arquivosList.classList.add('materia-arquivos-list');
    arquivos.forEach(arquivo => {
        const arquivoItem = document.createElement('div');
        arquivoItem.classList.add('arquivo-item');
        
        const arquivoNomeElement = document.createElement('span');
        arquivoNomeElement.classList.add('arquivo-nome');
        arquivoNomeElement.textContent = arquivo.nome;
        
        arquivoNomeElement.addEventListener('click', () => window.open(arquivo.url, '_blank'));

        const removeArquivoBtn = document.createElement('button');
        removeArquivoBtn.textContent = 'Remover';
        removeArquivoBtn.classList.add('remove-arquivo-btn');
        removeArquivoBtn.addEventListener('click', () => arquivoItem.remove());
        
        arquivoItem.appendChild(arquivoNomeElement);
        arquivoItem.appendChild(removeArquivoBtn);
        arquivosList.appendChild(arquivoItem);
    });

    materiaBloco.appendChild(arquivosList);
    materiasList.appendChild(materiaBloco);
}

// Função para salvar as matérias no localStorage
function salvarMaterias() {
    const materias = [];
    document.querySelectorAll('.materia-bloco').forEach(materiaBloco => {
        const materiaNome = materiaBloco.querySelector('.materia-nome').textContent;
        const arquivos = [];
        materiaBloco.querySelectorAll('.arquivo-item').forEach(arquivoItem => {
            const arquivoNome = arquivoItem.querySelector('.arquivo-nome').textContent;
            const arquivoUrl = arquivoItem.querySelector('.arquivo-nome').getAttribute('data-url');
            arquivos.push({ nome: arquivoNome, url: arquivoUrl });
        });
        materias.push({ nome: materiaNome, arquivos });
    });
    localStorage.setItem('materias', JSON.stringify(materias));

    // Exibe o alerta após salvar
    alert('Arquivos salvos!');
}

// Função para adicionar arquivos a uma matéria
function addArquivo(materiaBloco) {
    const arquivoInput = document.createElement('input');
    arquivoInput.type = 'file';
    arquivoInput.accept = '.pdf,.doc,.docx,.ppt,.txt';
    arquivoInput.style.display = 'none'; 

    arquivoInput.addEventListener('change', function() {
        const arquivoNome = arquivoInput.files[0].name;
        const arquivoUrl = URL.createObjectURL(arquivoInput.files[0]);

        const arquivoItem = document.createElement('div');
        arquivoItem.classList.add('arquivo-item');
        
        const arquivoNomeElement = document.createElement('span');
        arquivoNomeElement.classList.add('arquivo-nome');
        arquivoNomeElement.textContent = arquivoNome;
        arquivoNomeElement.setAttribute('data-url', arquivoUrl);
        
        arquivoNomeElement.addEventListener('click', () => window.open(arquivoUrl, '_blank'));
        
        const removeArquivoBtn = document.createElement('button');
        removeArquivoBtn.textContent = 'Remover';
        removeArquivoBtn.classList.add('remove-arquivo-btn');
        removeArquivoBtn.addEventListener('click', () => arquivoItem.remove());
        
        arquivoItem.appendChild(arquivoNomeElement);
        arquivoItem.appendChild(removeArquivoBtn);
        materiaBloco.querySelector('.materia-arquivos-list').appendChild(arquivoItem);
    });

    arquivoInput.click();
}

// Adicionando a matéria
addMateriaForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const materiaNome = materiaInput.value.trim();

    if (materiaNome) {
        criarMateria(materiaNome);
        materiaInput.value = '';
    }
});

// Salvando as matérias ao clicar no botão de salvar
salvarBtn.addEventListener('click', salvarMaterias);

// Carregar as matérias ao carregar a página
window.addEventListener('load', carregarMaterias);
