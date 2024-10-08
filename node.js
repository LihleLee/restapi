const http = require('http'); 
const fs = require('fs'); 
const { parse } = require('url'); 
const port = 3000;
 

if (!fs.existsSync('data.json')) {
    
    fs.writeFileSync('data.json', JSON.stringify([]));
}
 

const readData = async () => {
    try {
        
        const data = await fs.promises.readFile('data.json', 'utf8');
        return JSON.parse(data); 
    } catch (error) {
        console.error('Error reading data:', error); 
        return []; 
    }
};
 

const writeData = async (data) => {
    try {
        
        await fs.promises.writeFile('data.json', JSON.stringify(data, null, 2));
    } catch (error) {
        console.error('Error writing data:', error); 
    }
};
 

const server = http.createServer(async (req, res) => {
    const url = parse(req.url, true); 
    const method = req.method; 
    const id = url.pathname.split('/')[2]; 
 
    try {
       
        if (url.pathname === '/items' && method === 'GET') {
            const items = await readData(); 
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(items)); 
 
 
       
        } else if (url.pathname === '/items' && method === 'POST') {
            let body = ''; 
            req.on('data', (chunk) => {
                body += chunk; 
            });
            req.on('end', async () => {
                try {
                    const items = await readData(); 
                    const newItem = JSON.parse(body); 
                    newItem.id = items.length ? items[items.length - 1].id + 1 : 1; 
                    items.push(newItem); 
                    await writeData(items); 
                    res.writeHead(201, { 'Content-Type': 'application/json' }); 
                    res.end(JSON.stringify(newItem)); 
                } catch (error) {
                    res.writeHead(400, { 'Content-Type': 'application/json' }); 
                    res.end(JSON.stringify({ message: 'Invalid JSON data' })); 
                }
            });
 
        
        } else if (url.pathname.startsWith('/items/') && method === 'PUT') {
            let body = ''; 
            req.on('data', (chunk) => {
                body += chunk; 
            });
            req.on('end', async () => {
                try {
                    const items = await readData(); 
                    const updatedItem = JSON.parse(body); 
                    const itemId = parseInt(id);
                    const itemIndex = items.findIndex((item) => item.id === itemId); 
 
                  
                    if (itemIndex !== -1) {
                        items[itemIndex] = { ...items[itemIndex], ...updatedItem };
                        await writeData(items); 
                        res.writeHead(200, { 'Content-Type': 'application/json' });
                        res.end(JSON.stringify(items[itemIndex])); 
                    } else {
                        res.writeHead(404, { 'Content-Type': 'application/json' });
                        res.end(JSON.stringify({ message: 'Item not found' }));
                    }
                } catch (error) {
                    res.writeHead(400, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ message: 'Invalid JSON data' }));
                }
            });
 
       
        } else if (url.pathname.startsWith('/items/') && method === 'DELETE') {
            const items = await readData();
            const itemId = parseInt(id);
            const filteredItems = items.filter((item) => item.id !== itemId); 
 
          
            if (items.length !== filteredItems.length) {
                await writeData(filteredItems); 
                res.writeHead(200, { 'Content-Type': 'application/json' }); 
                res.end(JSON.stringify({ message: 'Item deleted' })); 
            } else {
                res.writeHead(404, { 'Content-Type': 'application/json' }); 
                res.end(JSON.stringify({ message: 'Item not found' }));
            }
 
        
        } else {
            res.writeHead(404, { 'Content-Type': 'application/json' }); 
            res.end(JSON.stringify({ message: 'Route not found' })); 
        }
    } catch (error) {
        console.error('Server error:', error); 
        res.writeHead(500, { 'Content-Type': 'application/json' }); 
        res.end(JSON.stringify({ message: 'Internal Server Error' })); 
    }
});
 

server.listen(port, (error) => {
    if (error) {
        console.log('Something went wrong', error); 
    } else {
        console.log('Server is listening on port ' + port);
    }
});
 
