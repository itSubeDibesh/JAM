/**
 * MySql Database Execuator - @version 1
 * 
 * Made with ❤️ by Dibesh Raj Subedi
 * 
 * Contributors : 
 * 
 * @description Executes queries and returns json response
 * 
 * Set user REST operations with CRUD
 * C -------> Create (Multiple , Single) -> (insert) --|
 * R -------> Read (Multiple , Single) -> (paginate, pick) ----|
 * U -------> Update (Single) -> (update) --|
 * D -------> Delete (Single) -> (_delete) --|
 */

/**
*  Insert Multiple / Single Data
*  @param {object} _request 
*  @param {object} _response 
*  @param {object} _table 
*  @description Set single, multiple request object as per requirement
*  @example 
*      {
*          "request":[
*              {
*                  "email":"kingrj530",
*                  "password":"Normalworld123"
*              },
*              {
*                  "email":"nepal",
*                  "password":"kolama"
*              },
*          ]
*      }
*/
function insert(_request, _response, _table) {
    if (_request.body.request.length != 0) {
        const extract = _table.json_insert(_request.body.request);
        _table.insert((_result) => {
            _table.json_response(_result, _response);
        }, extract.parameter, extract.data_set);
    } else {
        _response.status(400).send({
            response: `Parameter or dataset missing, Invalid input request.`,
            status: 400,
            success: false
        });
    }
}

/**
 * Select and Paginate data if required
 * @param {object} _request 
 * @param {object} _response 
 * @param {object} _table 
 * @param {string} parameters 
 * @param {string} condition
 */
function paginate(_request, _response, _table, parameters, condition) {
    const limit = _request.query.count;
    const page = _request.query.page;
    const offset = (page - 1) * limit;
    if (limit != null && page != null && offset != null) {
        _table.select((_result) => {
            _table.json_response(_result, _response, page, limit, _request.url, _request.baseUrl);
        }, parameters, condition, limit, offset);
    } else {
        _table.select((_result) => {
            _table.json_response(_result, _response);
        });
    }
}

/**
 * Select element with condition
 * @param {object} _request 
 * @param {object} _response 
 * @param {object} _table 
 * @param {args} ...args 
 */
function pick(_request, _response, _table, ...args) {
    _table.select((_result) => {
        _table.json_response(_result, _response);
    }, ...args);
}

/**
 * Update single element
 * @param {object} _request 
 * @param {object} _response 
 * @param {object} _table 
 * @param {string} condition 
 * @description Updates single element
 * @example 
 *      {
 *          "request":[
 *              {
 *                  "email":"kingrj530@gmail.com",
 *                  "password":"Normalworld123"
 *              }
 *          ]
 *      }
 */
function update(_request, _response, _table, condition) {
    if (_request.body.request.length != 0) {
        const _dataset = _table.json_update(_request.body.request);
        _table.update((_result) => {
            _table.json_response(_result, _response);
        }, _dataset, condition);
    } else {
        _response.status(400).send({
            response: `Condition or dataset missing, Invalid update request.`,
            status: 400,
            success: false
        });
    }
}

/**
 * Delete single element
 * @param {object} _request 
 * @param {object} _response 
 * @param {object} _table 
 * @param {string} condition 
 */
function _delete(_request, _response, _table, condition) {
    _table.delete((_result) => {
        _table.json_response(_result, _response);
    }, condition);
}

export {
    pick, paginate, insert, update, _delete
}