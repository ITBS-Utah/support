const searchContainer = document.querySelector('.search');
const searchBar = document.querySelector('.input.is-info.is-rounded.searchBar');
const searchFilter = document.querySelector('select');

const filters = ['All', 'Firewall/Security', 'Networking', 'Servers', 'Email', 'Computer', 'VOIP/Phones']

if (window.location.pathname !== '/search') {
    searchContainer.addEventListener("keydown", (e) => {
        if (searchBar.value && e.key == 'Enter') {
            window.location.href = `/search?query=${searchBar.value}&filter=${searchFilter.value}`;
        }
    });
}

if (window.location.pathname == '/search') {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const query = urlParams.get('query');
    const filter = urlParams.get('filter');

    if (query && filter) {
        searchBar.value = query;
        if (filters.includes(filter)) {
            searchFilter.value = filter;
        }

        API.get(`/search?query=${query.toLowerCase()}&filter=${filter.toLowerCase()}`, 'json').then(res => {
            alert(JSON.stringify(res))
        })
    }

    searchContainer.addEventListener("keydown", (e) => {
        if (searchBar.value && e.key == 'Enter') {
            if (filters.includes(searchFilter.value)) {
                window.history.pushState({}, '', `?query=${searchBar.value.toLowerCase()}&filter=${searchFilter.value.toLowerCase()}`);

                API.get(`/search?query=${searchBar.value.toLowerCase()}&filter=${searchFilter.value.toLowerCase()}`, 'json').then(res => {
                    alert(JSON.stringify(res))
                })
            } else {
                searchFilter.value = 'All'

                window.history.pushState({}, '', `?query=${searchBar.value}&filter=${searchFilter.value}`);

                API.get(`/search?query=${searchBar.value.toLowerCase()}&filter=${searchFilter.value.toLowerCase()}`, 'text').then(res => {
                    alert(JSON.stringify(res))
                })
            }
        }
    });
}