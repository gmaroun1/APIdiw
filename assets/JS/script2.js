const foto = document.querySelector('.imagem');
const description = document.querySelector('.description')

const urlParams = new URLSearchParams(window.location.search);
const myParam = urlParams.get('id');

function getImagem() {
    fetch('https://api.github.com/users/gmaroun1')
    .then(res => {
        return res.json()
    })
    .then((data) => {
        console.log(data);
        let project = document.createElement('div');

        project.innerHTML = `
            <img src="${data.avatar_url}" height="400px">
        `;

        foto.appendChild(project);
    })
}

function getDescription() {
    fetch(`https://api.github.com/repos/gmaroun1/${myParam}`)
    .then(res => {
        return res.json()
    })
    .then((data) => {
        console.log(data.topics);
        let project = document.createElement('div');

        project.innerHTML = `
        <div>
            <h3>Repositório: ${data.name}</h3>
        </div>

        <div>
            <h5>Proprietário:</h5>
            <p>${data.owner.login}</p>
        </div>

        <div>
            <h5>Descrição</h5>
            <p>${data.description}</p>
        </div>
    
        <div>
            <h5>Data de Criação</h5>
            <p>${data.created_at}</p>
        </div>

        <div>
            <h5>Linguagem</h5>
            <p>${data.language}</p>    
        </div>

        <div>
            <h5>Link de Acesso</h5>
            <p><a href="${data.html_url}">${data.html_url}</a></p>
        </div>

        <div>
            <h5>Tópicos</h5>
            <label class="topicos">${data.topics[0]}</label>
            <label class="topicos">${data.topics[1]}</label>
            <label class="topicos">${data.topics[2]}</label>
            <label class="topicos">${data.topics[3]}</label>
            <label class="topicos">${data.topics[4]}</label>
        </div>

        <div>
            <p><i class="fa-solid fa-star"></i> ${data.stargazers_count}</p>
            <p>Viewers: ${data.watchers}</p>
            <p><i class="fa-solid fa-code-fork"></i> ${data.forks}</p>
            <p>Licença: ${data.license}</p>

        </div>

        `;

        description.appendChild(project);
    })
}

getImagem();
getDescription();