let sort = 'Rating';
let sortbool = false;
const tbody = document.querySelector('#tbody');
const genre = document.querySelector('#genre');
const reverse = document.querySelector('#reverse');
const Films = [
    { title: 'The Godfather', year: 1972, genre: ['Drama', 'Crime'], rating: 9.2 },
    { title: 'The Shawshank Redemption', year: 1994, genre: ['Drama', 'Crime'], rating: 9.2 },
    { title: 'The Dark Knight', year: 2008, genre: ['Action', 'Adventure'], rating: 9.1 },
    { title: 'Pulp Fiction', year: 1994, genre: ['Drama', 'Crime'], rating: 8.9 },
    { title: 'Forrest Gump', year: 1994, genre: ['Drama', 'Romance'], rating: 8.8 },
]
const categorie = [
    'Action',
    'Romance',
    'Fantasy',
    'Drama',
    'Crime',
    'Adventure',
    'Thriller',
    'Sci-fi',
    'Music',
    'Family'
]

const films = () => {
    let html = ''

    Films.forEach(item => {
        html += `
        <tr>
        <td>${item.title} (${item.year})</td>
        <td>${item.genre[0]}/${item.genre[1]}</td>
        <td>&#128151; ${item.rating}</td>
        </tr>
        `
    })
    return tbody.innerHTML = html
}

const categories = () => {
    for (let i = 0; i < categorie.length; i++) {
        const div = document.createElement('div')
        const input = document.createElement('input')
        const label = document.createElement('label')

        div.classList = 'aside__genre-item'
        input.classList = 'aside__item_checkbox'
        input.setAttribute('id', `${categorie[i]}`);
        input.setAttribute('type', 'radio');
        input.setAttribute('name', 'radio');
        label.setAttribute('for', `${categorie[i]}`)
        label.innerHTML = categorie[i]

        div.appendChild(input)
        div.appendChild(label)
        genre.appendChild(div)
    }
}

const clickChekbox = () => {
    const box = document.querySelectorAll('.aside__item_checkbox');

    for (let i = 0; i < box.length; i++) {
        box[i].addEventListener('click', () => {
            let html = ''
            Films.forEach(item => {
                if (item.genre[0] === box[i].id || item.genre[1] === box[i].id) {
                    html += `
                    <tr>
                        <td>${item.title} (${item.year})</td>
                        <td>${item.genre[0]}/${item.genre[1]}</td>
                        <td>&#128151; ${item.rating}</td>
                    </tr>
                    `
                } else films()
            })
            return tbody.innerHTML = html
        }, false)
    }
}

const search = (e) => {
    const val = e.value.trim();
    let html = ''

    Films.forEach(item => {
        if (item.title.toLowerCase().startsWith(val)) {
            html += `
            <tr>
                <td>${item.title} (${item.year})</td>
                <td>${item.genre[0]}/${item.genre[1]}</td>
                <td>&#128151; ${item.rating}</td>
            </tr>
            `
        } else films()
    })
    return tbody.innerHTML = html
}

const selectValue = () => {
    const val = document.getElementById('select').value;
    const array = []
    const key = []
    let html = ''
    let bool = 0

    switch (val) {
        case 'Title':
            Films.forEach(item => { array.push(item.title) })
            if (sortbool) {
                array.sort()
                array.reverse()
            } else array.sort()

            for (let i = 0; i < array.length; i++) {
                Films.forEach(item => {
                    if (array[i] === item.title) {
                        html += `
                        <tr>
                            <td>${item.title} (${item.year})</td>
                            <td>${item.genre[0]}/${item.genre[1]}</td>
                            <td>&#128151; ${item.rating}</td>
                        </tr>
                        `
                    }
                })
            }
            tbody.innerHTML = html
            sort = 'Title'
            break;
        case 'Year':
            Films.forEach(item => { array.push(item.year) })
            if (sortbool) array.sort(function (a, b) { return b - a })
            else array.sort(function (a, b) { return a - b })

            for (let i = 0; i < array.length; i++) {
                for (let y = 0; y < Films.length; y++) {
                    if (array[i] === Films[y].year) {
                        key.forEach(item => {
                            if (item === Films[y].title) bool = 1
                        });
                        if (bool === 1) {
                            bool = 0;
                            continue;
                        }
                        key.push(Films[y].title)
                        html += `
                        <tr>
                            <td>${Films[y].title} (${Films[y].year})</td>
                            <td>${Films[y].genre[0]}/${Films[y].genre[1]}</td>
                            <td>&#128151; ${Films[y].rating}</td>
                        </tr>
                        `
                        break;
                    }
                }
            }
            tbody.innerHTML = html
            sort = 'Year'
            break;
        case 'Rating':
            Films.forEach(item => { array.push(item.rating) })
            if (sortbool) array.sort(function (a, b) { return a - b })
            else array.sort(function (a, b) { return b - a })

            for (let i = 0; i < array.length; i++) {
                for (let y = 0; y < Films.length; y++) {
                    if (array[i] === Films[y].rating) {
                        key.forEach(item => {
                            if (item === Films[y].title) bool = 1
                        });
                        if (bool === 1) {
                            bool = 0;
                            continue;
                        }
                        key.push(Films[y].title)
                        html += `
                        <tr>
                            <td>${Films[y].title} (${Films[y].year})</td>
                            <td>${Films[y].genre[0]}/${Films[y].genre[1]}</td>
                            <td>&#128151; ${Films[y].rating}</td>
                        </tr>
                        `
                        break;
                    }
                }
            }
            tbody.innerHTML = html
            sort = 'Rating'
            break;
    }
    return;
}

const reversed = () => {
    sortbool = !sortbool
    selectValue()
}

films()
categories()
clickChekbox()
search()
selectValue()