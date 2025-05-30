
import demoService from "../services/demo.services.js";

const demoController = {
    hello: (req, res) => {
        // This is a simple controller method that responds with a JSON object
        // with a message "Hello, World!"
        const result = demoService.HelloWorld(req, res);
        res.status(200).json(result);
    },
    query: (req, res) => {
        // This method handles GET requests with query parameters
        const result = demoService.query(req, res);
        res.status(200).json(result);   
    },  
    params: (req, res) => {
        // This method handles GET requests with URL parameters
        const result = demoService.params(req, res);
        res.status(200).json(result);
    },
    headers: (req, res) => {
        // This method handles GET requests with headers
        const result = demoService.headers(req, res);
        res.status(200).json(result);
    },
    body: async(req, res) => {
        // This method handles POST requests with request body
        const result = await demoService.body(req, res);
        res.status(200).json(result);
    }, 
    // You can add more methods here for other routes
    // For example, you can add a method to handle PUT or DELETE requests
    mysql2:async (req, res) => {
        const result = await demoService.mysql2(res);
        res.status(200).json(result);
    } ,
    sequelize: async (req, res) => {
        // This method handles GET requests to fetch data using Sequelize ORM
        const result = await demoService.sequelize();
        // Call the service method to get the data
        res.status(200).json(result);
    }   


};

export default demoController;









