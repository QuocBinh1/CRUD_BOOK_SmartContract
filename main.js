const connectButton = document.getElementById("connect-button");
const showallButton = document.getElementById("showall-button");
const addBookButton = document.getElementById("add-Button");
const walletAddress = document.getElementById("wallet-address");

let web3, contract;

connectButton.addEventListener("click", async () => {
  if (window.ethereum) {
    web3 = new Web3(window.ethereum);
    try {
      await window.ethereum.enable();
      web3.eth.getAccounts().then(console.log);
      walletAddress.textContent = await web3.eth.getAccounts();
    } catch (error) {
      console.log("User denied account access...");
    }
  } else if (window.web3) {
    web3 = new Web3(web3.currentProvider);
    web3.eth.getAccounts().then(console.log);
  } else {
    console.log("Non-Ethereum browser detected. You should consider trying MetaMask!");
  }
});
// Hiển thị tất cả sách
showallButton.addEventListener("click", async () => {
  if (window.web3) {
    web3 = new Web3(web3.currentProvider);
    contract = await contract_instance(web3, CONTRACT_ABI, CONTRACT_ADDRESS);

    const books = await GetAllBook(contract);
    console.log("Books from blockchain:", books);

    const booklist = document.getElementById("bookList");
    while (booklist.firstChild) {
      booklist.removeChild(booklist.firstChild);
    }

    const table = document.createElement("table");
    table.border = "1";

    const headerRow = table.insertRow();
    ["ID", "Tiêu đề", "Tác giả", "Năm xuất bản", "Giá", "Hành động"].forEach((header) => {
      const th = document.createElement("th");
      th.textContent = header;
      headerRow.appendChild(th);
    });

    books.forEach((item) => {
      const row = table.insertRow();
      const { book_id, title, author, year, price } = item;

      [book_id, title, author, year, price].forEach((value) => {
        const cell = row.insertCell();
        cell.textContent = value;
      });

      const actionCell = row.insertCell();

      // Tạo nút cập nhật
      const updateButton = document.createElement("button");
      updateButton.textContent = "Update";
      updateButton.id = `update-${book_id}`;
      updateButton.addEventListener("click", () => {
          handUpdate(book_id, title, author, year, price);
      });

      // Tạo nút xóa
      // mình tạo nút xóa , và cho nút đó cái id = book_id để khi click vào nút xóa thì mình sẽ lấy cái id đó để xóa sách
      const deleteButton = document.createElement("button");
      deleteButton.textContent = "Delete";
      deleteButton.id = `delete-${book_id}`;
      deleteButton.addEventListener("click", () => handleDelete(book_id));

      actionCell.appendChild(updateButton);
      actionCell.appendChild(deleteButton);
    });

    booklist.appendChild(table);
  }
});
// Thêm sách
addBookButton.addEventListener("click", async () => {
  if (window.web3) {
    web3 = new Web3(web3.currentProvider);    
    contract = await contract_instance(web3, CONTRACT_ABI, CONTRACT_ADDRESS);
    const accounts = await web3.eth.getAccounts();

    const id = document.getElementById("id").value;
    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const year = parseInt(document.getElementById("year").value);
    const price = parseInt(document.getElementById("price").value);

    if (!id || !title || !author || !year || !price) {
      alert("Vui lòng nhập đầy đủ thông tin!");
      return;
    }
// cái hàm add mình có sửa ở mấy ngày trước , tuy nhiên kh để ý đến khí gas nên k add đc sách , giờ mình sửa lại ở đây
    try {
      const gasPrice = await web3.eth.getGasPrice(); 
      await contract.methods.addBook(id, title, author, year, price).send({ from: accounts[0], gas: 9000000 , gasPrice: gasPrice});
      alert("Thêm sách thành công!");
      showAllBooks();

    } catch (error) {
      alert("Có lỗi xảy ra khi thêm sách!");
      console.log(error);
    }
  }
});
// Cập nhật sách
const handUpdate = async (book_id, title, author, year, price) => {
  const newTitle = prompt("Nhập tiêu đề mới", title);
  const newAuthor = prompt("Nhập tác giả mới", author);
  const newYear = prompt("Nhập năm xuất bản mới", year);
  const newPrice = prompt("Nhập giá mới", price);

  if (newTitle && newAuthor && newYear && newPrice) {
    if (window.ethereum) {
      try {
        web3 = new Web3(web3.currentProvider);    
        contract = await contract_instance(web3, CONTRACT_ABI, CONTRACT_ADDRESS);
        const accounts = await web3.eth.getAccounts();
        const gasPrice = await web3.eth.getGasPrice(); 
        await contract.methods.updateBook(book_id, newTitle, newAuthor, newYear, newPrice).send({ from: accounts[0], gas: 9000000, gasPrice: gasPrice });
        alert("Sách đã được cập nhật thành công!");
        showAllBooks();
      } catch (error) {
        alert("Có lỗi xảy ra khi cập nhật sách!");
        console.error(error);
      }
    }
  }
}; 

// Xóa sách
const handleDelete = async (book_id) => {
  if (window.ethereum) {
    try {
      web3 = new Web3(window.ethereum);
      contract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);
      const accounts = await web3.eth.getAccounts();

      const gasPrice = await web3.eth.getGasPrice(); 
      await contract.methods.deleteBook(book_id).send({ from: accounts[0], gas: 9000000, gasPrice: gasPrice });
      alert("Sách đã được xóa thành công!");
      //gọi lại hàm show để cập nhập lại danh sách sách
      showAllBooks();
    } catch (error) {
      alert("Có lỗi xảy ra khi xóa sách!");
      console.error(error);
    }
  }
};


// Cập nhật lại danh sách sách
const showAllBooks = async () => {
  showallButton.click();
};
