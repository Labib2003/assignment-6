const searchField = document.getElementById('search-field')
const searchBtn = document.getElementById('search-btn');
const resultCardContainer = document.getElementById('result-card-container');

const loadData = (phoneName) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${phoneName}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayResults(data));
}

const displayResults = (data) => {
    const phones = data.data;
    phones.forEach(phone => {
        console.log(phone);
        const resultCard = document.createElement('div');
        resultCard.classList.add('col-sm-6');
        resultCard.innerHTML = `
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">${phone.phone_name}</h5>
                    <p class="card-text">Brand: ${phone.brand}</p>
                    <img src="${phone.image}" class="card-img-top">
                    <a href="#" class="btn btn-primary">More Info</a>
                </div>
            </div>
        `;
        resultCardContainer.appendChild(resultCard);
    });
}

searchBtn.addEventListener('click', () => {
    console.log(searchField.value);
    const phoneName = searchField.value;
    loadData(phoneName);
})