const perfil = document.querySelector('.perfil');
const repositories = document.querySelector('#repositories');
const contents = document.querySelector('.carousel-inner');

function getPerfil() {
    fetch('https://api.github.com/users/gmaroun1')
        .then(async res => {
            if (!res.ok) {
                throw new Error(res.status);
            }

            let data = await res.json();
            let project = document.createElement('div');

            project.innerHTML = `
            <div class="project">
                <ul>
                    <img class="eu "src="${data.avatar_url}" alt="" height="180px">
                    <li>${data.name}</li>
                    <li>${data.bio}</li>
                    <li>${data.company}</li>
                </ul>
                </div>

            `;

            perfil.appendChild(project);
            
        
        })
}



function getRepos() {
    fetch('https://api.github.com/users/gmaroun1/repos')
        .then(async res => {
            if (!res.ok) {
                throw new Error(res.status);
            }

            let data = await res.json();
            data.map( item => {
                let project = document.createElement('div');

                project.innerHTML = `
                    <div class="col">
              <div class="card h-100 w-400px">
                <div class="card-body">
                  <h5 class="card-title">${item.name}</h5>
                  <p>${item.description}</p>
                  
                </div>
                <div class="card-footer">
                  <small class="text-muted">Atualizado em: ${item.updated_at}</small>
                </div>
              </div>
            </div>
            
                `

                repositories.appendChild(project);
            })
        })
}

function getConteudos() {
    fetch('http://localhost:8080/db/db.json')
    .then(async res => {
        if (!res.ok) {
            throw new Error(res.status);
        }

        let data = await res.json();
        data.conteudos.forEach( item => {
            let project = document.createElement('div');

            project.innerHTML = `
                <div class="carousel-item">
                    <a href="${item.link}"><img src="${item.imagem}" class="d-block w-100" alt="..."> </a>
                    <div class="carousel-caption d-none d-md-block text-warning"> 
                        <h5>${item.nome}</h5>
                        <p>${item.descricao}</p>
                    </div>
                </div>
            `;

            contents.appendChild(project);


        })
    })
}



getPerfil();
getRepos();
getConteudos();