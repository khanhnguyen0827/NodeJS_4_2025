const demoService = {

    HelloWorld: (req, res) => {
        const message = "Hello, World!";
    return message;},

    query: (req, res) => {
    const query = req.query;
    return  query;},

    params: (req, res) => {
    const params = req.params;
    return params;},

    headers: (req, res) => {
    const headers = req.headers;
    return headers;},

    body: (req, res) => {
    const body = req.body;
    console.log(body);
    return body;     
    }


};
export default demoService


