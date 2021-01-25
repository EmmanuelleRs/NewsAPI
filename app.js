
window.addEventListener('load', () => {
    const getHeadNews = async () => {
        const res = await fetch('https://newsapi.org/v2/top-headlines?country=us&apiKey=7a952dd3e23d4454a74ac48fa62cb517');
        const data = await res.json();
        document.querySelector('.mainheadline').innerHTML = `
        <div onclick="gotToNew('${data.articles[0].url}')" class="mainheadlineImg">
            <img src="${data.articles[0].urlToImage}">
        </div>
        <div class="mainheadlineTxt">
        <h2>${data.articles[0].title}</h2><br>
        <p>${data.articles[0].description}</p>
        </div>`;
        for (var i = 1; i <= 4; i +=1) { 
            document.querySelector('.nextnews').innerHTML += `
            <div class="headnew" onclick="gotToNew('${data.articles[i].url}')">
                <div class="headnewImg">
                    <img src="${data.articles[i].urlToImage}">
                </div>
                <div class="headnewTxt">
                    <p>${data.articles[i].title}</p>
                </div>
            </div>`;
        }

    };

    getHeadNews();
})



fetch('https://newsapi.org/v2/top-headlines?country=mx&apiKey=7a952dd3e23d4454a74ac48fa62cb517')
    .then(response => response.json())
    .then(data =>{
        data.articles.forEach( element => {
            document.querySelector('#newsList').innerHTML += news(element)
        })
    });


fetch('http://api.openweathermap.org/data/2.5/weather?q=guadalajara,mexico&appid=d474cf871e81aeaa79f95eee692ccfa9')
.then(response => response.json())
.then(data =>{
    document.querySelector('.weather').innerHTML = `
    <h3> <i class="fas fa-temperature-high"></i> Terperatura en la ciudad de Guadalajara</h3>
    <nav>
        <li> <i class="fas fa-cloud"></i><br>${Math.round(data.main.temp - 273)} ºC</li>
        <li> <i class="fas fa-thermometer-three-quarters"></i></i><br>${Math.round(data.main.temp_max - 273)} ºC</li>
        <li> <i class="fas fa-thermometer-quarter"></i><br>${Math.round(data.main.temp_min - 273)} ºC</li>
    </nav>`;
});


fetch("https://covid-193.p.rapidapi.com/history?country=mexico", {
    "method": "GET",
    "headers": {
        "x-rapidapi-key": "dec1ca8ac5mshe0e60deec831a2dp141f79jsn534bd01ce2d0",
        "x-rapidapi-host": "covid-193.p.rapidapi.com"
    }
})
.then(response => response.json())
.then(data => {
    var cases = data.response[0].cases;
    deaths = data.response[0].deaths;
    console.log(data.response[0])
    document.querySelector('#covid').innerHTML = `
    <h3> <i class="fas fa-virus"></i> Casos COVID en Mexico</h3><br>
    <p><label>${cases.total}</label> casos</p>
    <p><label>${cases.recovered}</label> casos recuperados</p>
    <p><label>${cases.new} casos nuevos</label></p>
    <br><br>
    <h4>Muertes</h4>
    <p><label>${deaths.total}</label> muertes</p>
    <p><label>${deaths.new}</label> nuevas</p>`;
})


const category = [
    {name: 'Coronavirus', value: 'covid'},
    {name: 'General', value: 'general'},
    {name: 'Entretenimiento', value: 'entretaiment'},
    {name: 'Salud', value: 'health'},
    {name: 'Ciencia', value: 'science'},
    {name: 'Deportes', value: 'sports'},
    {name: 'Tecnología', value: 'technology'},
];

category.forEach( c => {
    document.querySelector('#mainNav').innerHTML += `<li><a onclick="filterNews('${c.value}')" >${c.name}</a></li>`;
});

const filterNews = (c) => {
    document.querySelector('#newsList').innerHTML = '';
    const url = `https://newsapi.org/v2/top-headlines?category=${c}&country=mx&apiKey=7a952dd3e23d4454a74ac48fa62cb517`;
    fetch(url)
    .then(response => response.json())
    .then(data =>{
        data.articles.forEach( element => {
            document.querySelector('#newsList').innerHTML += news(element)
        })
    });
}

const searchNews = (e) => {
    document.querySelector('#newsList').innerHTML = '';
    const url = `https://newsapi.org/v2/everything?q=${e.target.value}&apiKey=7a952dd3e23d4454a74ac48fa62cb517`;
    fetch(url)
    .then(response => response.json())
    .then(data =>{
        data.articles.forEach( element => {
            document.querySelector('#newsList').innerHTML += news(element)
        })
    })
}

const news = (objt) => {
    const {title,  description, urlToImage, source, url} = objt;
    return `
    <div class="new">
        <div onclick="gotToNew('${url}')" class="newImg">
            <img src="${urlToImage}">
        </div>
        <div class="newBody">
            <nav>
                <li>Noticia</li>
                <li class="source">${source.name}</li>
            </nav>
            <h3 onclick="gotToNew('${url}')">${title}</h3>
            <p>${description}</p>
        </div>
    </div>`;
}

const gotToNew = url => {
    window.location = url;
}

const getCovid = e => {
    fetch(`https://covid-193.p.rapidapi.com/history?country=${e.target.value}`, {
        "method": "GET",
        "headers": {
            "x-rapidapi-key": "dec1ca8ac5mshe0e60deec831a2dp141f79jsn534bd01ce2d0",
            "x-rapidapi-host": "covid-193.p.rapidapi.com"
        }
    })
    .then(response => response.json())
    .then(data => {
        var cases = data.response[0].cases;
        deaths = data.response[0].deaths;
        console.log(data.response[0])
        document.querySelector('#covid').innerHTML = `
        <h3> <i class="fas fa-virus"></i> Casos COVID en ${e.target.value}</h3><br>
        <p><label>${cases.total}</label> casos</p>
        <p><label>${cases.recovered}</label> casos recuperados</p>
        <p><label>${cases.new} casos nuevos</label></p>
        <br><br>
        <h4>Muertes</h4>
        <p><label>${deaths.total}</label> muertes</p>
        <p><label>${deaths.new}</label> nuevas</p>`;
    })

}

const getCd = e => {
    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${e.target.value},mexico&appid=d474cf871e81aeaa79f95eee692ccfa9`)
    .then(response => response.json())
    .then(data =>{
        document.querySelector('.weather').innerHTML = `
        <h3> <i class="fas fa-temperature-high"></i> Terperatura en la ciudad de ${e.target.value}</h3>
        <nav>
            <li> <i class="fas fa-cloud"></i><br>${Math.round(data.main.temp - 273)} ºC</li>
            <li> <i class="fas fa-thermometer-three-quarters"></i></i><br>${Math.round(data.main.temp_max - 273)} ºC</li>
            <li> <i class="fas fa-thermometer-quarter"></i><br>${Math.round(data.main.temp_min - 273)} ºC</li>
        </nav>`;
    });
}