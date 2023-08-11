import axios from 'axios';
import fs from 'fs';

const readFileAsString = (path) => fs.readFileSync(path).toString()

// axios.post('http://localhost:3000/rpc', {
//     "jsonrpc": "2.0",
//     "method": "textDocument/didOpen",
//     "params": {
//         "textDocument": {
//         "uri": "file:///Users/anthony/Downloads/regex-fortran-master/regex.f90",
//         "languageId": "fortran",
//         "version": 1,
//         "text": readFileAsString('/Users/anthony/Downloads/regex-fortran-master/regex.f90')
//         }
//     }
// }).then((res) => {
//     console.log(res.data)
// })

// axios.post('http://localhost:3000/rpc', {
//     "jsonrpc": "2.0",
//     "method": "textDocument/didOpen",
//     "params": {
//         "textDocument": {
//         "uri": "file:///Users/anthony/Downloads/regex-fortran-master/test.f90",
//         "languageId": "fortran",
//         "version": 1,
//         "text": readFileAsString('/Users/anthony/Downloads/regex-fortran-master/test.f90')
//         }
//     }
// }).then((res) => {
//     console.log(res.data)
// })



// NOTE: Pretty sure what's happening right now is that the file isn't even in the workspace. but how do I get the file into the workspace?
// See https://github.com/fortran-lang/fortls/blob/36984d28f186e2414227742a0ee99145eab83348/fortls/langserver.py#L300-L309


axios.post('http://localhost:3000/rpc', {
    "jsonrpc": "2.0",
    "id" : 1,
    "method": "textDocument/documentSymbol",
    "params": {
        "textDocument": {
            "uri": "file:///Users/anthony/Downloads/regex-fortran-master/regex.f90"
        },
        // "position": {
        //     "line": 71,
        //     "character": 19
        // }
    }
}).then((res) => {
    console.log("RESPONSE")
    console.log(res.data)

    const chunks = res.data.split(/(\r\n)|(Content-Length)/g)
    console.log(chunks)
    for (const chunk of chunks) {
        if (chunk && chunk.startsWith('{')) {
            const obj = JSON.parse(chunk)

            console.log(JSON.stringify(obj, null, 2))
        }
    }

    
})