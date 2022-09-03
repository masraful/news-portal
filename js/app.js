const loadMenu = () => {
    const url = `https://openapi.programming-hero.com/api/news/categories`
    fetch(url)
        .then(res => res.json())
        .then(data => fieldMenu(data.data.news_category))
    // .then(data => console.log(data.data))

}

const fieldMenu = menu => {
    // console.log(menu)
    const menuContainer = document.getElementById('menu-field');
    menu.forEach(menus => {
        const menusDiv = document.createElement('ul');
        menusDiv.classList.add('d-flex');
        menusDiv.innerHTML = `
        <li class="nav-item">
        <a class="nav-link" href="#" onclick='loadNewsBlogs()'>${menus.category_name}</a>
    </li>
    `;
        menuContainer.appendChild(menusDiv)
    })
    toggleSpinner(true);
}
loadMenu()


const loadNewsBlogs = () => {
    fetch(`https://openapi.programming-hero.com/api/news/category/01`)
        .then(res => res.json())
        .then(data => displayNews(data.data))
}
const displayNews = news => {
    const newsContainer = document.getElementById('news-blogs');
    news.forEach(blog => {
        const newsDiv = document.createElement('div');
        newsDiv.classList.add('col')
        newsDiv.innerHTML = `
        <div class="card">
        <img src="${blog.image_url}" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">${blog.title}</h5>
            <p class="card-text">${blog.details.slice(0, 150) + '...'}</p>
            <div class='d-flex m-2'>
            <img src="${blog.author.img}" class='img-fluid img-width h-100 my-auto rounded-circle' alt="">
            <div>
            <h3 class='m-3'>${blog.author.name}</h3>
            <p class='m-3'>${blog.author.published_date} </p>
            <h3 class='m-3'>total_view:${blog.total_view}</h3>
           </div>

            </div>
        </div>
        
        <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#newsDetalis" onclick='buttonModal("${blog._id}")'>Details</button>

        
    </div>
    `;
        newsContainer.appendChild(newsDiv)

    })

    toggleSpinner(false);

}

function buttonModal(news_id) {
    // console.log(id)
    const url = `https://openapi.programming-hero.com/api/news/${news_id}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayModal(data.data))

}


function displayModal(modaldetalis) {
    console.log(modaldetalis)
    const modalField = document.getElementById('newsDetalis')
    modalField.innerHTML = '';
    modaldetalis.forEach(details => {
        const modal = document.createElement('div');
        modal.innerHTML = `
        <div class="modal-content container mt-5">
        <div class="modal-header">
        <h5 class="modal-title d-block" id="newsDetalisLabel">${details.title}</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <p>${details.details}</p>
        <div class="modal-body d-flex">
        <img src="${details.author.img}" class='img-fluid img-width h-100 my-auto rounded-circle' alt="">
        <div>
        <h3 class='m-3'>${details.author.name}</h3>
        <p class='m-3'>${details.author.published_date} </p>
        <h3 class='m-3'>total_view:${details.total_view}</h3>
       </div>
        
        </div>
        <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        
        </div>
        </div>
        `;
        modalField.appendChild(modal)

    })

}

const toggleSpinner = isLoading => {
    const loaderSection = document.getElementById('loader')
    if (isLoading) {
        loaderSection.classList.remove('d-none')
    }
    else {
        loaderSection.classList.add('d-none')
    }
}
// loadNewsBlogs()
