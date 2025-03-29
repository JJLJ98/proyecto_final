function searchBooks() {
    let query = document.getElementById('search').value.toLowerCase();
    let books = document.querySelectorAll('.book-card');
    books.forEach(book => {
        if (book.textContent.toLowerCase().includes(query)) {
            book.style.display = "block";
        } else {
            book.style.display = "none";
        }
    });
}