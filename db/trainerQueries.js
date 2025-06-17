const pool = require("./pool");

async function getAllTrainers() {
    try {
        const { rows } = await pool.query("SELECT * FROM trainers");
        return rows;     
    }
    catch (error) {
        console.error("Error fetching all trainer: ", error);
    }
}

module.exports = {
    getAllTrainers,
};