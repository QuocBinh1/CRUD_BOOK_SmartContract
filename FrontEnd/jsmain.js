// jsmain.js
const addButton = document.getElementById("addButton");
const bookModal = document.getElementById("bookModal");
const closeModal = document.getElementById("closeModal");
const cancelButton = document.getElementById("cancelButton");
const bookForm = document.getElementById("bookForm");

// Show the modal
addButton.addEventListener("click", () => {
    bookModal.style.display = "flex";
});

// Close the modal
closeModal.addEventListener("click", () => {
    bookModal.style.display = "none";
});

cancelButton.addEventListener("click", () => {
    bookModal.style.display = "none";
});

// Handle form submission
bookForm.addEventListener("submit", (e) => {
    e.preventDefault(); // Prevent page reload

    const bookData = {
        id: document.getElementById("id").value,
        title: document.getElementById("title").value,
        author: document.getElementById("author").value,
        year: document.getElementById("year").value,
        price: document.getElementById("price").value,
    };

    console.log("Book Data Submitted:", bookData);

    // Close modal after submission
    bookModal.style.display = "none";

    // Reset form
    bookForm.reset();
});
