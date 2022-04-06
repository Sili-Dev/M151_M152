# Server mit Node.js Bordmittel

1. Erstellen Sie einen Ordner für alle Übungen, `Uebungen`, und darin einen Ordner für diese Übung `Uebung1-2`

In Node.js gibt es folgende Modulsysteme:

- Kernmodul mit dem CommonJS-Modulsystem
- Kernmodul mit dem ECMAScript-Modulsystem

Das letzte Mal benutzten wir das ECMAScript-Modulsystem. Das wollen wir auch in Zukunft so tun.\
Indem wir das letzte Mal die Dateien mit der Dateiendung *.mjs versehen haben, hat Node.je automatisch das ECMAScript-Modulsystem aktiviert.\
Alternativ kann in der _package.json_-Datei das Feld _type_ mit dem Wert _module_ gesetzt werden.

```json
{
  "name": "block1",
  "version": "1.0.0",
  "description": "Modul 151 Webserver mit Node.js-Bordmittel",
  "main": "index.js",
  "type": "module",
  "scripts": {
    "start": "node index.js"
  },
  "author": "",
  "license": "ISC"
}
```

In diesem _package.json_ sehen Sie dass das ECMAScriptModulsystem aktiviert ist. Im Weiteren sehen Sie, das mit _npm start_ der Befehl _node index.js_ ausgeführt wird.

Wir wollen im Weiteren unseren Webserver mit CRUD-Methode erweitern. Ebenso soll die Abblikation in mehrere Bereiche aufgeteilt werden.

Server _index.js_

```javascript
import { createServer } from 'http';
import data from './data.js';
import { getList } from './list.js';

createServer((request, response) => {
  const urlParts = request.url.split('/');
  if (urlParts.includes('delete')) {
    data.addresses = deleteAddress(data.addresses, urlParts[2]);
    redirect(response, '/');
  } else if (urlParts.includes('new')) {
    send(response, getForm());
  } else if (urlParts.includes('edit')) {
    send(response, getForm(data.addresses, urlParts[2]));
  } else {
    send(response, getList(data.addresses));
  }
}).listen(8080, () =>
  console.log('Server erreichbar unter http://localhost:8080')
);

function send(response, responseBody) {
  response.writeHead(200, { 'content-type': 'text/html' });
  response.end(responseBody);
}

function redirect(response, to) {
  response.writeHead(302, { location: '/', 'content-type': 'text/plain' });
  response.end('302 Redirecting to /');
}
```

Die Listendarstellung: _list.js_

```javascript
export function getList(addresses) {
  return `<!DOCTYPE html>
  <html>
    <head>
      <title>Adressbuch</title>
      <meta charset="utf-8" />
    </head>
    <body>
      <h1>Adressbuch</h1>
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Vorname</th>
            <th>Nachname</th>
            <th>löschen</th>
          </tr>
        </thead>
        <tbody>
          ${addresses.map(createRow).join('')}
        </tbody>
      </table>
    </body>
  </html>`;
}

function createRow(address) {
  return `<tr>
  <td>${address.id}</td>
  <td>${address.firstname}</td>
  <td>${address.lastname}</td>
  <td><a href="/delete/${address.id}">löschen</a></td>
</tr>`;
}
```

Daten: _data.js_

```javascript
export default {
  addresses: [
    {
      id: 1,
      firstname: 'Hans',
      lastname: 'Muster',
      street: 'Musterstrasse 12',
      city: 'Zürich',
      country: 'Schweiz',
    },
    {
      id: 2,
      firstname: 'John',
      lastname: 'Doe',
      street: 'Musterstrasse 13',
      city: 'Zürich',
      country: 'Schweiz',
    },
  ],
};
```

## Aufgabe 1

Setzen Sie die _package.json_, _index.js_, _list.js_ und _data.js_ in ein Verzeichnis und starten Sie den Server mit _npm start_\
Implementieren Sie im Anschluss die Delete-Methode in einer eigenen JavaScript-Datei (_delete.js_). Der Server ist bereits vorbereitet und erwartet eine Funktion _deleteAddress(addresses, id)_:

```javascript
if (urlParts.includes('delete')) {
    data.addresses = deleteAddress(data.addresses, urlParts[2]);
    redirect(response, '/');
```

## Aufgabe 2

Erweitern Sie Ihren Server um die Funktionen _new_ und _edit_:

```javascript
else if (urlParts.includes('new')) {
    send(response, getForm());
  } else if (urlParts.includes('edit')) {
    send(response, getForm(data.addresses, urlParts[2]));
```

Wie Sie aus der Vorbereitung entnehmen können, müssen Sie eine _form.js_-Datei mit der Funktion _getForm(addresses, id)_ implementieren.

## Aufgabe 3

Erweitern Sie den Server, so dass er die Datensätze auch speichert kann. Dazu erweitern Sie die Server-Implementation und lagern die _saveAddress(addresses, address)_-Funktion in eine neue JavaScript-Datei _save.js_, aus.

## Aufgabe 4

Wir fügen nun statische Inhalte hinzu. Machen Sie ein css-File, dass die Liste verschönert. Ergänzen Sie den Server, so dass statische Dateien gelesen werden können. Verwenden Sie dazu das _fs_-Modul, um die css-Datei vom Dateisystem zu laden. Beachten Sie, dass Sie Fehler auffangen.

## Aufgabe 5

Verschönern Sie die Anwendung, indem Sie in der Liste (_list.js_) Links für das bearbeiten und neuen Datensatz hinzufügen einpflegen.

## Aufgabe 6

In der Server-Implementation sehen Sie die Funktion _redirect(response, to)_, die einen Statuscode aus der Gruppe 300-399 hat.
Ermitteln Sie was der Statuscode 302 macht.
Sie können dazu auch die REPL benutzen. Setzen Sie den Befehl _http.STATUS_CODES_ ab. Die REPL starten Sie mit dem Befehl _node_ in der Konsole.

## Aufgabe 7

Untersuchen Sie was der Unterschied der Methoden _writeHead_ und der Methodengruppe _setHeader, getHeader und removeHeader_

## Aufgabe 8

Studieren Sie das Request und Response aus folgender Quelle: [Node.js documentation](https://nodejs.org/dist/latest-v16.x/docs/api/http.html 'Node.js documentation')
