// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
//câu 1
// contract Exam1 {
//     function exam1(uint8 n, uint256[] memory a) public pure returns (uint256) {
//         require(a.length == n, "mang khong du? phan tu");
//         uint8 dem = 0;
//         for (uint256 i = 0; i < n - 1;) {
//             if (i + 2 < n && a[i + 2] == 0) {
//                 i += 2; 
//             } else {
//                 i += 1; 
//             }
//             dem++; 
//         }
//         return dem;
//     //6
//     // [0, 0, 0, 0, 1, 0]
//     }   
// }
//câu 2
contract Exam2 {
    struct Book {
        string book_id;
        string title;
        string author;
        uint year;
        uint price;
    }
    Book[] public books;
    mapping(string => uint) public bookIdToIndex;

    event BookAdded(string book_id, string title, string author, uint year, uint price);
    event BookPriceUpdated(string book_id, uint new_price);
    event BookDeleted(string book_id);

    function addBook(string memory book_id, string memory title, string memory author, uint year, uint price) public {
        require(bytes(book_id).length > 0, "Book ID cannot be empty");
        require(bytes(title).length > 0, "Title cannot be empty");
        require(bytes(author).length > 0, "Author cannot be empty");
        require(year > 0, "Year must be greater than 0");
        require(price > 0, "Price must be greater than 0");

        require(bookIdToIndex[book_id] == 0, "ID da ton tai");

        books.push(Book(book_id, title, author, year, price));
        bookIdToIndex[book_id] = books.length;
        emit BookAdded(book_id, title, author, year, price);
}

    function updatePrice(string memory book_id, uint new_price) public {
        uint index = bookIdToIndex[book_id] - 1; // Lấy chỉ số của sách
        require(index >= 0 && index < books.length, "khong tim thay sach");
        books[index].price = new_price;
        emit BookPriceUpdated(book_id, new_price);
    }
    function findBookById(string memory book_id) public view returns (string memory, string memory, string memory, uint, uint) {
        uint index = bookIdToIndex[book_id] - 1;
        require(index >= 0 && index < books.length, "Khong tim thay sach");
        Book memory book = books[index];
        return (book.book_id, book.title, book.author, book.year, book.price);
    }

    function findBookByTitle(string memory title) public view returns (string memory, string memory, string memory, uint, uint) {
        for (uint i = 0; i < books.length; i++) {
            if (keccak256(bytes(books[i].title)) == keccak256(bytes(title))) {
                return (books[i].book_id, books[i].title, books[i].author, books[i].year, books[i].price);
            }
        }
        revert("Khong tim thay sach");
    }
    function deleteBook(string memory book_id) public {
        uint index = bookIdToIndex[book_id] - 1;
        require(index >= 0 && index < books.length, "Khong tim thay sach");
        books[index] = books[books.length - 1];
        books.pop();
        bookIdToIndex[book_id] = 0; 
        emit BookDeleted(book_id);
    }
    function showAllBooks() public view returns (Book[] memory) {
        return books;
    }
}