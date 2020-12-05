import express from "express";
import table from "../mysql/builder.conf.js";
import { insert, update, _delete, paginate, pick } from "./exe/execuator.conf.js";
// Express Router to use bulk routing
const _router = express.Router();

// Set your database table name
const _table = new table('demo');

// Create -> POST
_router.post('/', (_request, _response) => insert(_request, _response, _table));

// Paginate -> GET
_router.get('/', (_request, _response) => {
    paginate(_request, _response, _table, null, null);
});

// Pick -> GET
_router.get('/:id', (_request, _response) => {
    // Picking id as parameter
    const my_param = _request.params.id.split(' ')[0];
    pick(_request, _response, _table, null, `id = ${my_param}`);
});

// Update -> PUT
_router.put('/:id', (_request, _response) => {
    // Picking id as parameter
    const my_param = _request.params.id.split(' ')[0];
    update(_request, _response, _table, `id = ${my_param}`);
});

// Delete -> DELETE
_router.delete('/:id', (_request, _response) => {
    // Picking id as parameter
    const my_param = _request.params.id.split(' ')[0];
    _delete(_request, _response, _table, `id = ${my_param}`);
});

export default _router;