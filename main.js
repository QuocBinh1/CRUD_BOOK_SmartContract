const connectButton = document.getElementById("connect-button");
const showallButton = document.getElementById("showall-button");
const addBookButton = document.getElementById("add-Button");
connectButton.addEventListener("click", async () => {
  // Check if MetaMask is installed
  if (window.ethereum) {
    const web3 = new Web3(window.ethereum);
    try {
      // Request account access if needed
      await window.ethereum.enable();
      // Acccounts now exposed
      web3.eth.getAccounts().then(console.log);
    } catch (error) {
      // User denied account access...
    }
  }
  // Legacy dapp browsers...
  else if (window.web3) {
    web3 = new Web3(web3.currentProvider);
    // Acccounts always exposed
    web3.eth.getAccounts().then(console.log);
  }
  // Non-dapp browsers...
  else {
    console.log("Non-Ethereum browser detected. You should consider trying MetaMask!");
  }
});

//show all book
if (!showallButton.hasEventListener) {
  showallButton.addEventListener("click", async () => {
    if(window.web3){
      web3 = new Web3(web3.currentProvider);
      const contract = await contract_instance(web3 , CONTRACT_ABI , CONTRACT_ADDRESS);

      const book = await GetAllBook(contract);
      console.log("Books from blockchain:", book);

      const booklist = document.getElementById("bookList");
      while (booklist.firstChild) {
        booklist.removeChild(booklist.firstChild);
      }

      //taoj bang hien thi sach

      const table = document.createElement("table");
      table.border = "1";

      const headerRow = table.insertRow();
        ["ID" , "tiêu đề" ,"Tác giả","năm xuất bản","Giá","Hành Động"].forEach((header) => {
          const th = document.createElement("th");
          th.textContent = header;
          headerRow.appendChild(th);
      });
        // Thêm dữ liệu sách vào bảng
        book.forEach((item) => {
          const row = table.insertRow();
          const { book_id, title, author, year, price } = item; 

          // Thêm dữ liệu vào hàng
          [book_id, title, author, year, price].forEach((value) => {
            const cell = row.insertCell();
            cell.textContent = value;
          });
          // Thêm cột chứa nút hành động
          const actionCell = row.insertCell();

          // Tạo nút Update
          const updateButton = document.createElement("button");
          updateButton.textContent = "Update";
          updateButton.addEventListener("click", () => {
            handleUpdate(book_id); // Gọi hàm xử lý cập nhật
          });
          // Tạo nút Delete
          const deleteButton = document.createElement("button");
          deleteButton.textContent = "Delete";
          deleteButton.addEventListener("click", () => {
            handleDelete(book_id); // Gọi hàm xử lý xóa
          });
          // Thêm nút vào cột
          actionCell.appendChild(updateButton);
          actionCell.appendChild(deleteButton);
        });

      // Hiển thị bảng trong giao diện
      booklist.appendChild(table);
    }
  });

  showallButton.hasEventListener = true;
}
//add book
addBookButton.addEventListener("click", async () => {
  if (window.web3) {
    web3 = new Web3(web3.currentProvider);    
    const contract = await contract_instance(web3, CONTRACT_ABI, CONTRACT_ADDRESS);
    const accounts  = await web3.eth.getAccounts();
    console.log(accounts [0]);
    instance = contract;
   //lay du lieu tu form
    const id = document.getElementById("id").value.trim(); 
    const title = document.getElementById("title").value.trim(); 
    const author = document.getElementById("author").value.trim();  
    const year = parseInt(document.getElementById("year").value);
    const price = parseInt(document.getElementById("price").value);
    if (!id || !title || !author || !year || !price) {
      alert("Vui lòng nhập đầy đủ thông tin!");
      return;
    }
   
    try{
      await contract.methods.addBook(id , title , author , year , price ).send({from: accounts[0] , gas: 3000000}); 
      alert("Thêm sách thành công!");
       
    }catch(error){
      alert("Có lỗi xảy ra khi thêm sách!");
      console.log(error);
    }
  }

  // id="id"     name="id" ,
  // id="title"  name="title" 
  // id="author" name="author"
  // id="year"   name="year"
  // id="price"  name="price"
});

