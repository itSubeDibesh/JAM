import database from './database.conf.js'

/**
 * MySql Query Builder - @version 1
 * 
 * Made with ❤️ by Dibesh Raj Subedi
 * 
 * Contributors : 
 * 
 * @description Builds CRUD queries for MySql database.
 */
export default class query_builder extends database {
    constructor(selected_table) {
        super(database);
        this.table = selected_table;
    }

    /**
     * Insert Statement
     * @param {*} callback 
     * @param {*} parameter 
     */
    insert(callback, parameter, dataset) {
        if (parameter != null && dataset != null) {
            // Preparing Insert Statement
            let insertQuery = `INSERT INTO ${this.table} `;
            if (parameter != null) {
                insertQuery += `(${parameter})`;
                insertQuery += "  VALUES ";
            }
            dataset.forEach(element => {
                insertQuery += `(${element}), `;
            });
            insertQuery = insertQuery.substr(0, insertQuery.lastIndexOf(","));
            insertQuery += ";";
            // Returning JSON object after DB query
            return this.response_factory(insertQuery, callback);
        } else return callback({
            response: `Parameters or dataset missing. Invalid insert request.`,
            success: false
        });
    }

    /**
     * Select Statement
     * @param {Function} callback 
     * @param {string} parameter 
     * @param {string} condition 
     * @param {number} limit 
     * @param {number} offset 
     */
    select(callback, parameter, condition, limit, offset) {
        this.count((result) => {
            // Preparing Select Statement
            let selectQuery = `SELECT `;
            if (parameter != null) {
                selectQuery += parameter;
                selectQuery += " ";
            }
            else selectQuery += `* `; selectQuery += `FROM ${this.table} `;
            if (limit != null && offset != null) selectQuery += ` LIMIT ${limit} OFFSET ${offset};`;
            if (condition != null) selectQuery += `WHERE ${condition}`;
            // Returning JSON object after DB query
            return this.response_factory(selectQuery, callback, result.result[0].length);
        })
    }

    /**
     * Returns count of dataset in table
     * @param {Function} callback 
     */
    count(callback) {
        // Preparing Count Statement
        let countQuery = `SELECT count(*) as length FROM ${this.table};`;
        // Returning JSON object after DB query
        return this.connection.query(countQuery, (error, result, fields) => {
            if (error) return callback({
                result: error.sqlMessage,
                success: false
            });
            else return callback({
                result: (result.length == 0 ? null : result),
                success: (result.length == 0 ? false : true)
            });
        });
    }

    /**
     * Update Statement
     * @param {Function} callback 
     * @param {string} dataset 
     * @param {string} condition 
     */
    update(callback, dataset, condition) {
        if (dataset != null && condition != null) {
            // Preparing Update Statement
            let updateQuery = `UPDATE ${this.table} SET ${dataset}  WHERE ${condition};`;
            // Returning JSON object after DB query
            return this.response_factory(updateQuery, callback);
        } return callback({
            response: `Condition or Dataset missing. Invalid update request.`,
            success: false
        });
    }

    /**
     * Delete Statement
     * @param {Function} callback 
     * @param {String} condition 
     */
    delete(callback, condition) {
        if (condition != null) {
            // Preparing Delete Statement
            let deleteQuery = `DELETE FROM ${this.table} WHERE ${condition};`;
            // Returning JSON object after DB query
            return this.response_factory(deleteQuery, callback);
        } return callback({
            response: `Condition missing. Invalid Delete request.`,
            success: false
        });
    }

    /**
     * Response Factory 
     * Queries into databse and sends the response
     * @param {String} query 
     * @param {Function} callback 
     */
    response_factory(query, callback, length) {
        this.connection.query(query, (error, result, fields) => {
            if (error) return callback({
                result: error.sqlMessage,
                success: false
            });
            else return callback({
                result: (result.length == 0 ? null : result),
                success: (result.length == 0 ? false : true),
                length: length != null ? length : result.length
            });
        });
    }

    /**
     * Returns {parameter , dataset} object from json user input
     * @param {object} json_request 
     */
    json_insert(json_request) {
        const data_set = [];
        let parameter = "";
        // Extracting params from request 
        for (let key in json_request[0]) {
            parameter += `${key}, `;
        }
        parameter = parameter.substr(0, parameter.lastIndexOf(','));
        // Extracting dataset and making database insert capsule
        for (let indexI = 0; indexI < json_request.length; indexI++) {
            const elementI = json_request[indexI];
            let _data_set = "";
            for (const [key, value] of Object.entries(elementI)) {
                _data_set += `'${value}', `;
            }
            data_set.push(_data_set.substr(0, _data_set.lastIndexOf(',')));
        }
        return { parameter, data_set }
    }

    /**
     * Returns {dataset} object from json user input
     * @param {object} json_request 
     */
    json_update(json_request) {
        let data_set;
        // Extracting dataset and making database update capsule
        for (let indexI = 0; indexI < json_request.length; indexI++) {
            const elementI = json_request[indexI];
            let _data_set = "";
            for (const [key, value] of Object.entries(elementI)) {
                _data_set += `${key} = '${value}', `;
            }
            data_set = _data_set.substr(0, _data_set.lastIndexOf(','));
        }
        return data_set;
    }

    /**
     * Returns json response
     * @param {object} result 
     * @param {object} _response 
     * @param {number} page 
     * @param {number} count 
     */
    json_response(_result, _response, page, count, current_page, base_url) {
        const { result, success, length } = _result;
        if (success) {
            const
                current_page_number = parseInt(page),
                total_pages = Math.ceil(length / parseInt(count));
            if (page != null && page >= 1) return _response.status(200).send([{
                success,
                status: 200,
                result,
                count: result.length,
                total_count: length,
                navigation: {
                    total_pages,
                    previous_page: (current_page_number != 1 ? `${base_url}/?count=${count}&page=${current_page_number - 1}` : null),
                    current_page: `${base_url}${current_page}`,
                    next_page: ((current_page_number != total_pages) ? `${base_url}/?count=${count}&page=${current_page_number + 1}` : null),
                }
            }]);
            else return _response.status(200).send([{
                success,
                status: 200,
                result
            }]);
        }
        else return _response.status(404).send([{
            success,
            status: 404,
            result: (result != null ? result.split(";")[0] : null)

        }]);
    }
}