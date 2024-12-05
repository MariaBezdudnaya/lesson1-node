const http = require('http'); // Подключаем веб сервер, чтобы обрабатывать запросы
const fs = require('fs');

const HOST = 'localhost'; // там, где находится сервер
const PORT = 8000;

const requestHandler = (req, res) => { // обработчик запроса, request и response, запрос и ответ
  switch (req.url) {
    case '/image': {
      const image = fs.readFileSync(`${__dirname}/nature.jpg`); // метод readFileSync синхронно прочитает картинку с диска. dirname указывает в ту же директорию, в которой работает процесс
      res.setHeader('content-type', 'image/jpg');
      res.end(image);
      break;
    }
    case '/html': {
      const html = `
        <html>
          <head>
              <title>My server is working!</title>
          </head>
          <body>
            <h1>Hello from server!</h1>
            <h2>Current time: ${new Date().toLocaleString()}</h2>
          </body>
        </html>
      `;
      res.setHeader('content-type', 'text/html');
      res.end(html);
      break;
    }
    default: {
      res.setHeader('content-type', 'text/plain');
      res.end('Hello from server!')
    }
  }
}

const server = http.createServer(requestHandler); // Создаём сервер, использующий requestHandler для обработки событий
server.listen(PORT, HOST, () => {
  console.log(`Server is running on http://${HOST}:${PORT}`);
});