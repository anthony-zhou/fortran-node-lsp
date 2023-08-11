import express from "express";
import { spawn } from "child_process";
const app = express();
const port = 3000;

// Middleware to parse JSON bodies and to ensure correct content-type
app.use(express.json());
// app.use((req, res, next) => {
//   if (req.is('application/vscode-jsonrpc; charset=utf8')) {
//     return next();
//   } else {
//     return res.status(415).send('Unsupported Media Type');
//   }
// });

// POST endpoint to handle JSON RPC requests
app.post('/rpc', (req, res) => {
  const child = spawn('fortls', ['--incl_suffixes', '.f90', '--incremental_sync']);

  // Serialize the JSON RPC request
  const initializeRequest = JSON.stringify({
    jsonrpc: "2.0",
    "id" : 1,
    "method": "initialize",
    "params": {
        'rootPath': 'file:///Users/anthony/Downloads/regex-fortran-master'
    }
  });
  const r = `Content-Length: ${Buffer.byteLength(initializeRequest)}\r\nContent-Type: application/vscode-jsonrpc; charset=utf8\r\n\r\n` + initializeRequest;


  const rpcRequest = JSON.stringify(req.body);

  // Write the JSON RPC request to the stdin of the script
  const contentLength = Buffer.byteLength(rpcRequest);
  const request = `Content-Length: ${contentLength}\r\nContent-Type: application/vscode-jsonrpc; charset=utf8\r\n\r\n` + rpcRequest;

  const rec = r + request;
  console.log(rec)

  child.stdin.write(rec);

  // Collect data from stdout
  let output = '';

  child.stdout.on('data', (data) => {
    output += data.toString();
    // console.log(output)
  });


  // Handle errors
  child.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`);
  });

  // Handle exit and send response
  child.on('exit', () => {
    res.header('Content-Type', 'application/vscode-jsonrpc; charset=utf8');
    res.header('Content-Length', Buffer.byteLength(output, 'utf8').toString());
    res.send(output);
  });

  // Close the stdin stream when you're done
  child.stdin.write('\r\n\r\n');
  child.stdin.end();
//   child.stdin.flu();
});

// Start the Express server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
