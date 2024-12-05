//constant.js
CONTRACT_ADDRESS = "0x9F47120C013FA226ee3FdAB4ea550d261caf8aD9";
CONTRACT_ABI =[
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "book_id",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "title",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "author",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "year",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "price",
				"type": "uint256"
			}
		],
		"name": "addBook",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "string",
				"name": "book_id",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "title",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "author",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "year",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "price",
				"type": "uint256"
			}
		],
		"name": "BookAdded",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "string",
				"name": "book_id",
				"type": "string"
			}
		],
		"name": "BookDeleted",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "string",
				"name": "book_id",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "new_title",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "new_author",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "new_year",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "new_price",
				"type": "uint256"
			}
		],
		"name": "BookUpdated",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "book_id",
				"type": "string"
			}
		],
		"name": "deleteBook",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "book_id",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "new_title",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "new_author",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "new_year",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "new_price",
				"type": "uint256"
			}
		],
		"name": "updateBook",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"name": "bookIdToIndex",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "books",
		"outputs": [
			{
				"internalType": "string",
				"name": "book_id",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "title",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "author",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "year",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "price",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "showAllBooks",
		"outputs": [
			{
				"components": [
					{
						"internalType": "string",
						"name": "book_id",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "title",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "author",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "year",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "price",
						"type": "uint256"
					}
				],
				"internalType": "struct Exam2.Book[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]