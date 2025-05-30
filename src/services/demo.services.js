const demoService = {

    HelloWorld: (req, res) => {
        const message = "Hello, World!";
    res.json({ message });
},
    query: (req, res) => {
    const query = req.query;
    res.json(query);},
    params: (req, res) => {
    const params = req.params;
    res.json(params);},
    headers: (req, res) => {
    const headers = req.headers;
    res.json(headers);},
    body: (req, res) => {
    const body = req.body;
    console.log(body);
    res.json(body);     
    }

};
export default demoService


