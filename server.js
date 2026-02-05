import { createServer } from 'node:http'; //Importan apenas a função createServer e explicitando que é um módulo nativo do node.
import fs from 'fs'; //Importa o modulo que permite ler, criar, apagar e listar pastas.
import path from 'path'; //Importa o modulo que permite trabalhar com caminhos de forma segura.
import { exec } from 'child_process'; //Importa módulo que permite a execução de comandos do sistema operacional.

const hostname = '0.0.0.0'; //O mesmo que localhost, acesso apenas pela mesma máquina.
const port = 3000; //Porta

const server = createServer((req, res) => { //Função para criar o servidor, que recebe um callback com 2 parâmetros (requisição e resposta).
    
    const filePath = req.url === "/" ? "index.html" : req.url.slice(1); //Formatando a atribuindo o caminho a uma variável.
    const fullPath = path.join(process.cwd(), filePath); //.join limpa o caminho e process.cwd aponta para a pasta onde o node esta sendo executado.

    const types = { //Objeto de extensões de arquivos
        ".html": "text/html",
        ".css": "text/css",
        ".js": "text/javascript",
        ".svg": "image/svg+xml"
    }

    const ext = path.extname(filePath); //Extraindo apenas a extensão do arquivo
    const contentType = types[ext] || "text/plain"; //Atribuindo ao content type a extensão correta do arquivo.

    fs.readFile(fullPath, (error, data) => { //Função de leitura do arquivo.
        if(error){ //Lançando erro caso ocorra.
            res.writeHead(500, { "Content-Type": "text/plain" });
            res.end("Erro ao carregar arquivo...");
            return;
        }
        res.writeHead(200, { "Content-Type": contentType });
        res.end(data); //Retornando os dados caso tudo ocorra bem.
    })
})

server.listen(port, hostname, () => { //Inicializando servidor na porta 3000.
    console.log('Server is running...');
    exec("start http://localhost:3000"); //Inicializando o site no navegador (apenas windows).
});