import axios from 'axios';

axios.post('http://localhost:3000/rpc', {
    "jsonrpc": "2.0",
    "method": "textDocument/didOpen",
    "params": {
        "textDocument": {
        "uri": "file:///path/to/document.txt",
        "languageId": "plaintext",
        "version": 1,
        "text": "Content of the document"
        }
    }
}).then((res) => {
    console.log(res.data)
})