import demo from "./endpoints/demo.js";

/**
 * MySql Query Builder - @version 1
 * 
 * Made with ❤️ by Dibesh Raj Subedi
 * 
 * Contributors : 
 * 
 * @description Register and export all imported routes
 */
export default class route_register {
    // Register all routes here to make it accessible
    constructor(app) {
        // Rename Demo to your table name
        app.use('/demo', demo);
    }
}