import axios from 'axios';
import fs from 'fs';

const readFileAsString = (path) => fs.readFileSync(path).toString()

axios.post('http://localhost:3000/rpc', {
    "jsonrpc": "2.0",
    "id" : 1,
    "method": "textDocument/definition",
    "params": {
        "textDocument": {
            "uri": "file:///Users/anthony/Downloads/regex-fortran-master/regex.f90"
        },
        "position": {
            "line": 220 - 1,
            "character": 24 - 1
        }
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