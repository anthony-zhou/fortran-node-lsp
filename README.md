## LSP Fortran

The goal of this project is to see if we can make a language server for Fortran and use it to do interesting things, like extract dependencies for a given file. 

## Client

The client send Language Server Protocol (LSP) messages to the language server.

LSP messages are just a specific kind of JSON RPC message. RPC stands for remote procedure call. 

## Server

The server passes messages through to the `fortls` command line language server, through stdio.
