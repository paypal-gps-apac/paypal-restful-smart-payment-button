const Pool = require('pg').Pool
const pool = new Pool({
  user: 'bbxczrstdzqulx',
  host: 'ec2-34-230-149-169.compute-1.amazonaws.com',
  database: 'd3j4fdfgcng30c',
  password: 'f0138aeb18652ae1e57b24b9187403092e73132d909d80c8a55afdbe8eece369',
  port: 5432,
  ssl: {
    rejectUnauthorized: false
  },
})

const createData = (data) => {
  return new Promise((resolve, reject) => {
    const hookid = data.hookid;
    const create_time = data.create_time; 
    const event_type = data.event_type; 
    const summary = data.summary;

    pool.query('INSERT INTO webhook (hookid, create_time, event_type, summary) VALUES ($1, $2, $3, $4)', [hookid, create_time, event_type, summary], (error, results) => {
      if (error) {
        reject(error);
        throw error
      }
      resolve(results);
    });
  });
}

module.exports = {
  createData,
}