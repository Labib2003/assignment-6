const searchField = document.getElementById('search-field')
const searchBtn = document.getElementById('search-btn');

const loadData = (phoneName) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${phoneName}`;
    fetch(url)
        .then(res => res.json())
        .then(data => console.log(data));
}

searchBtn.addEventListener('click', () => {
    console.log(searchField.value);
    const phoneName = searchField.value;
    loadData(phoneName);
})