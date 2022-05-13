const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';

const cities=[];

fetch(endpoint)
    .then(blob=>blob.json())
    .then(data=>cities.push(...data));

function findMatches(wordToMatch,cities){
    return cities.filter(places=>{
        const regex=new RegExp(wordToMatch,'gi');
        return places.city.match(regex) || places.state.match(regex);
    });
}
function displayMatches(){
    const matchArray=findMatches(this.value,cities);
    console.log(matchArray)
    let html=matchArray.map(data=>{
        const regex=new RegExp(this.value,'gi');
        const cityName=data.city.replace(regex,`<span class="hl">${this.value}</span>`)
        const stateName=data.state.replace(regex,`<span class="hl">${this.value}</span>`)
        return `
        <li>
            <span>${cityName}, ${stateName}</span>
            <span class="pop">${data.population}</span>
        </li>
        `
    }).join('');
    display.innerHTML=html
}

const input=document.querySelector('.search')
const display=document.querySelector('.suggestions')

input.addEventListener('change',displayMatches);
input.addEventListener('keyup',displayMatches);