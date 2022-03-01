const searchField = document.getElementById('search-field');
const searchBtn = document.getElementById('search-btn');
const resultCardContainer = document.getElementById('result-card-container');
const phoneDetails = document.getElementById('phone-details');

// loading search results from api
const loadData = (phoneName) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${phoneName}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayResults(data));
};

// showing search results in ui
const displayResults = (data) => {
    // No result msg
    if (data.status === false) {
        const noResult = document.createElement('h3');
        noResult.innerText = 'No Result Found';
        resultCardContainer.appendChild(noResult);
    }
    // showing search results
    else {
        const phones = data.data;
        phones.forEach(phone => {
            const index = phones.indexOf(phone);
            // show first 20 results
            if (index < 20) {
                const resultCard = document.createElement('div');
                resultCard.classList.add('col-12');
                resultCard.classList.add('col-lg-4');
                resultCard.innerHTML = `
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">${phone.phone_name}</h5>
                        <p class="card-text">Brand: ${phone.brand}</p>
                        <img src="${phone.image}" class="card-img mb-5">
                        <br>
                        <a onclick="loadPhoneDetails('${phone.slug}')" class="btn btn-primary">More Info</a>
                    </div>
                </div>
                `;
                resultCardContainer.appendChild(resultCard);
            }
        });
    };
};

// loading more info abaut a specific phone
const loadPhoneDetails = (slug) => {
    const url = `https://openapi.programming-hero.com/api/phone/${slug}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayPhoneDetails(data));
};

// displaying more info
const displayPhoneDetails = (data) => {
    const validateReleaseDate = () => {
        if (data.data.releaseDate === ''){
            return 'Release date unknown';
        }
        else {
            return data.data.releaseDate;
        }
    };
    phoneDetails.innerHTML = '';
    phoneDetails.innerHTML = `
        <div class="card text-center">
            <div class="card-header">
                ${data.data.brand}
            </div>
            <div class="card-body">
                <h5 class="card-title">${data.data.name}</h5>
                <p class="card-title">${validateReleaseDate()}</p>
                <img class="mb-2" src='${data.data.image}'>
                <h6>Hardwire info</h6>
                <hr>
                <p>Chipset: ${data.data.mainFeatures.chipSet}</p>
                <p>Display: ${data.data.mainFeatures.displaySize}</p>
                <p>Memory: ${data.data.mainFeatures.memory}</p>
                <p>Storage: ${data.data.mainFeatures.storage}</p>
            </div>
            <div id="sensor-list"></div>
        </div>
    `;
    const sensorList = document.getElementById('sensor-list');
    const sensors = data.data.mainFeatures.sensors;
    const h6 = document.createElement('h6');
    h6.innerText = 'Sensors:';
    sensors.forEach(sensor => {
        h6.innerText = h6.innerText + ',' + ' ' + sensor;
        sensorList.appendChild(h6);
    });
};

// button click handeler
searchBtn.addEventListener('click', () => {
    resultCardContainer.innerHTML = '';
    phoneDetails.innerHTML = '';
    const phoneName = searchField.value;
    loadData(phoneName);
});