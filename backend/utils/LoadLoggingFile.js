import fs from 'fs';
import path from 'path';

const logFolderPath = '/path/to/log/folder'; // Replace this with the path to your log folder

function processLogFiles(folderPath) {
  try {
    const files = fs.readdirSync(folderPath);
    const logLines = [];

    files
      .filter(file => file.startsWith('api'))
      .forEach(file => {
        const filePath = path.join(folderPath, file);
        const data = fs.readFileSync(filePath, 'utf8');
        const lines = data.trim().split('\n');

        lines.forEach(line => {
          try {
            const jsonLine = JSON.parse(line);
            logLines.push(jsonLine);
          } catch (error) {
            console.error('Error parsing JSON in file ' + file + ': ' + error);
          }
        });
      });

    return logLines;
  } catch (error) {
    console.error('Error reading files: ' + error);
    throw error; // Rethrow the error to handle it outside this function if needed
  }
}

export { processLogFiles };

