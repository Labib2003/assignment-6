const searchField = document.getElementById('search-field')
const searchBtn = document.getElementById('search-btn');
const resultCardContainer = document.getElementById('result-card-container');
const phoneDetails = document.getElementById('phone-details');

const loadData = (phoneName) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${phoneName}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayResults(data));
};

const displayResults = (data) => {
    const phones = data.data;
    phones.forEach(phone => {
        const resultCard = document.createElement('div');
        resultCard.classList.add('col-sm-6');
        resultCard.innerHTML = `
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">${phone.phone_name}</h5>
                    <p class="card-text">Brand: ${phone.brand}</p>
                    <img src="${phone.image}" class="card-img-top">
                    <a onclick="loadPhoneDetails('${phone.slug}')" class="btn btn-primary">More Info</a>
                </div>
            </div>
        `;
        resultCardContainer.appendChild(resultCard);
    });
};

const loadPhoneDetails = (slug) => {
    const url = `https://openapi.programming-hero.com/api/phone/${slug}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayPhoneDetails(data))
        .then(data => console.log(data));
};

const displayPhoneDetails = (data) => {
    phoneDetails.innerHTML = '';
    phoneDetails.innerHTML = `
        <div class="card text-center">
            <div class="card-header">
                ${data.data.brand}
            </div>
            <div class="card-body">
                <h5 class="card-title">${data.data.name}</h5>
                <p class="card-title">${data.data.releaseDate}</p>
                <h6>Hardwire info</h6>
                <hr>
                <p>Chipset: ${data.data.mainFeatures.chipSet}</p>
                <p>Display: ${data.data.mainFeatures.displaySize}</p>
                <p>Memory: ${data.data.mainFeatures.memory}</p>
                <p>Storage: ${data.data.mainFeatures.storage}</p>
            </div>
        </div>
    `;

}

searchBtn.addEventListener('click', () => {
    resultCardContainer.innerHTML = '';
    phoneDetails.innerHTML = '';
    const phoneName = searchField.value;
    loadData(phoneName);
});