import { createServer } from 'http';
import data from './data.js';
import { getList } from './list.js';
import { deleteAddress } from './delete.js';
import { getForm } from './form.js';
import { parse } from 'querystring';
import { saveAddress } from './save.js';
import { readFile } from 'fs';

createServer((request, response) => {
  const urlParts = request.url.split('/');
  if (urlParts.includes('delete')) {
    data.addresses = deleteAddress(data.addresses, urlParts[2]);
    redirect(response, '/');
  } else if (urlParts.includes('new')) {
    send(response, getForm());
  } else if (urlParts.includes('edit')) {
    send(response, getForm(data.addresses, urlParts[2]));
  } else if (urlParts.includes('save') && request.method === 'POST') {
    let body = '';
    request.on('readable', () => {
      // Sobald eine Anfrage vorliegt, wird das readable-Event ausgelöst.
      const data = request.read(); // Die Daten werden von der Handler-Funktion mit der read-Methode abgeholt.
      body += data !== null ? data : '';
    });
    request.on('end', () => {
      // Sobald die Anfrage komplett angenommen wurde, wird das end-Event ausgelöst.
      const address = parse(body); // Umwandlung in ein Objekt.
      data.addresses = saveAddress(data.addresses, address);
      redirect(response, '/');
    });
  } else if (request.url === '/style.css') {
    readFile('public/style.css', 'utf8', (err, data) => {
      if (err) {
        response.statusCode = 404;
        response.end();
      } else {
        response.end(data);
      }
    });
  } else {
    send(response, getList(data.addresses));
  }
}).listen(8080, () =>
  console.log('Server erreichbar unter http://localhost:8080')
);

function send(response, responseBody) {
  response.writeHead(200, { 'content-type': 'text/html' }); // Nach dem verwenden der Methode writeHead können Sie keine Modifikationen am Header mehr vornehmen. Wollen Sie den Header ändern wollen, verwenden Sie die Methoden: setHeader, getHeader, und removeHeader
  response.end(responseBody);
}

function redirect(response, to) {
  response.writeHead(302, { location: '/', 'content-type': 'text/plain' });
  response.end('302 Redirecting to /');
}
