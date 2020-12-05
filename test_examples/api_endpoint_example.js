/**
 * This file was created to demonstrate how the process works.
 * JAM Framework has optimized all the process 
 *     of this demonstration and don't recommend to use this.
 */

// import express from "express";
// import table from "../mysql/builder.conf.js";
// const _router = express.Router();
// const _table = new table('authors');

// _router.post('/', (_request, _response) => {
//     if (_request.body.request.length != 0) {
//         const extract = _table.json_insert(_request.body.request);
//         _table.insert((_result) => {
//             _table.json_response(_result, _response);
//         }, extract.parameter, extract.data_set);
//     } else {
//         _response.status(400).send({
//             response: `Parameter or dataset missing, Invalid input request.`,
//             status: 400,
//             success: false
//         });
//     }
// });

// _router.get('/', (_request, _response) => {
//     const limit = _request.query.count;
//     const page = _request.query.page;
//     const offset = (page - 1) * limit;
//     if (limit != null && page != null && offset != null) {
//         _table.select((_result) => {
//             _table.json_response(_result, _response, page, limit, _request.url, _request.baseUrl);
//         }, null, null, limit, offset);
//     } else {
//         _table.select((_result) => {
//             _table.json_response(_result, _response);
//         });
//     }
// });

// _router.get('/:id', (_request, _response) => {
//     // Sanitize parameter
//     const my_param = _request.params.id.split(' ')[0];
//     _table.select((_result) => {
//         _table.json_response(_result, _response);
//     }, null, `id = ${my_param}`);
// });

// _router.put('/:id', (_request, _response) => {
//     if (_request.body.request.length != 0) {
//         const my_param = _request.params.id.split(' ')[0];
//         const _dataset = _table.json_update(_request.body.request);
//         _table.update((_result) => {
//             _table.json_response(_result, _response);
//         }, _dataset, `id = ${my_param}`);
//     } else {
//         _response.status(400).send({
//             response: `Condition or dataset missing, Invalid update request.`,
//             status: 400,
//             success: false
//         });
//     }
// });

// _router.delete('/:id', (_request, _response) => {
//     // Sanitize parameter
//     const my_param = _request.params.id.split(' ')[0];
//     _table.delete((_result) => {
//         _table.json_response(_result, _response);
//     }, `id = ${my_param}`);
// });

// export default _router;