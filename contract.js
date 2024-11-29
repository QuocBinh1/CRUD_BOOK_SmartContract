let instance; // Biến toàn cục để lưu hợp đồng

async function contract_instance(web3 , abi , address) {
	const contract = new web3.eth.Contract(abi, address);
	return contract;
}

async function GetAllBook(instance) {
	return await instance.methods.showAllBooks().call();
}
async function addBook(id, title, author,year, price , form) {
	return await instance.methods.addBook(id,title, author,year, price).send({"from": form});
}