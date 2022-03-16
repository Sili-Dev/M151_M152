import mysql from "mysql2/promise"; 

const connection = await mysql.createConnection({ 
    host: "127.0.0.1",   
    user: "root",   
    password: "sml12345", 
    database: "movie-db"  , 
}); 

await connection.connect(); 

export async function getAll() {      
    const query = 'SELECT * FROM Movies';   
    const [data]  = await connection.query(query);   
    return data; 
} 

async function insert(movie) {  
    const query = 'INSERT INTO Movies (id, title, year) VALUES (' + movie.id + ', ' + movie.title + ', ' + movie.year + ')';
    const [result]  = await connection.query(query, [movie.title, movie.year]);   
    return {...movie, id: result.insertId }; 
} 

async function update(movie) {
    const query = 'UPDATE Movies SET Title = ' + movie.title + ', Year = ' + movie.year + 'WHERE ID = ' + id;  
    const [data]  = await connection.query(query);   
    return data; 
}

export async function get(id) {  
    const query = 'SELECT * FROM Movies WHERE ID = ' + id;   
    const [data]  = await connection.query(query);   
    return data; 
}

export async function remove(id) {
    const query = 'DELETE FROM Movies WHERE ID = ' + id;   
    const [data]  = await connection.query(query);   
    return data; 
}

export async function save(movie) {
    const result = await get(movie.id);
    if (result.length == 0) {
        await insert(movie);
    } else {
        await update(movie);
    }
}
