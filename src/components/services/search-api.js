export function fetchService(searchQuery, pageCounter) {
  return fetch(
    `https://pixabay.com/api/?q=${searchQuery}&page=1&key=38325031-07abeaa9a45e557a48162dc21&image_type=photo&orientation=horizontal&page=${pageCounter}&per_page=12`
  ).then(response => response.json());
}
