const express = require('express');
const { spawn } = require('child_process');
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
  // Spawn the command-line script (replace 'your-script.sh' with the actual script path)
  const child = spawn('fortls');

  // Serialize the JSON RPC request
  const rpcRequest = JSON.stringify(req.body);

  // Write the JSON RPC request to the stdin of the script
  const request = 'Content-Length:100000\r\n\r\n' + rpcRequest;
  child.stdin.write(request);

  // Collect data from stdout
  let output = '';
  child.stdout.on('data', (data) => {
    output += data.toString();
  });

  // Handle errors
  child.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`);
  });

  // Handle exit and send response
  child.on('exit', () => {
    res.header('Content-Type', 'application/vscode-jsonrpc; charset=utf8');
    res.header('Content-Length', Buffer.byteLength(output, 'utf8'));
    res.send(output);
  });

  // Close the stdin stream when you're done
  child.stdin.end();
});

// Start the Express server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
