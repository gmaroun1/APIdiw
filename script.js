const perfil = document.querySelector('.perfil');
const repositories = document.querySelector('#repositories');
const contents = document.querySelector('.carousel-inner');
const pessoas = document.querySelector('#colegas');

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
                    <li>${data.location}</li>
                    
                    <div>
                        <span><a href="https://www.instagram.com/gabrielbmaroun/"><i class="fa-brands fa-instagram"></i></a></span>
                        <span><a href="https://github.com/gmaroun1"><i class="fa-brands fa-github"></i></a></span>
                        <span>GitHub followers: ${data.followers}</span>
                    </div>
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
                <a style="text-decoration:none;" href="repo.html?id=${item.name}">
                    <div class="card h-100 w-400px">
                        <div class="card-body">
                            <h5 class="card-title">${item.name}</h5>
                            <p>${item.description}</p>
                            <span><i class="fa-solid fa-code-fork"></i> ${item.forks}</span><span><i class="fa-solid fa-star"></i> ${item.stargazers_count}</span>
                        </div>
                        <div class="card-footer">
                            <small class="text-muted">Atualizado em: ${item.updated_at}</small>
                        </div>
                    </div>
                </a>
            </div>
            
                `

                repositories.appendChild(project);
            })
        })
}

function getConteudos() {
    fetch('/db/db.json')
    .then(res => {
        return res.json()
    })
    .then((data) => {
        data.conteudos.forEach( item => {
            contents.innerHTML += `
                <div class="carousel-item">
                    <a href="${item.link}"><img src="${item.imagem}" class="d-block w-100" alt="..."></a>
                    <div class="carousel-caption d-none d-md-block text-warning"> 
                        <h5>${item.nome}</h5>
                        <p>${item.descricao}</p>
                    </div>
                </div>
            `;
        })
        contents.children[0].classList.add("active")
    })
    .catch((err) => {
        alert.error(err)
    })
}

function getPessoas() {
    fetch('/db/pessoas.json')
    .then(res => {
        return res.json()
    })
    .then((data) => {
        data.pessoas.forEach( item => {
            pessoas.innerHTML += `
            <h5><a href="${item.github}" style="text-decoration:none;">
                <img src="${item.imagem}" height="170px">
                <p style="color:black">${item.nome}</p>
            </h5></a>
            `;
        })

    })
    .catch((err) => {
        console.error(err)
    })
}




window.onload = function() {
    getPerfil();
    getRepos();
    getConteudos();
    getPessoas();
}
