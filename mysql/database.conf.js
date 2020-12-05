import dotenv from "dotenv";
import mysql from 'mysql';

// Reads Dotenv file and makes env variable accessible
dotenv.config();

// Create connection builder for defined database
let connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_Password,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
});

/**
 * MySql Database Connector - @version 1
 * 
 * Made with ❤️ by Dibesh Raj Subedi
 * 
 * Contributors : 
 * 
 * @description Exports the mysql_database module to connect with mysql database.
 */
export default class mysql_database {
    constructor() {
        this.connection.connect((er) => {
            if (er) {
                console.error(`Error Connecting [ ${er.message} ]`);
            } else {
                console.log(`MySql ${this.connection.state} at Thread ID : ${this.connection.threadId}`);
            }
        });
    }

    // Creates a new mysql connection
    connection = connection;
}