
import articlesService from '../services/articles.service.js';
import { responseSeccess } from '../common/helpers/response.helper.js';
// articles.controller.js


const articlesController = {
    getAllArticles: async (req, res, next) => {
        try {
            const articles = await articlesService.getAll(req);
            const resdata = responseSeccess(articles, "Get all articles successfully");
            res.status(resdata.statusCode).json(resdata);
        } catch (error) {
            console.error("Error fetching articles:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    }
};


export default articlesController;
// articlesController là một đối tượng chứa các phương thức để xử lý các yêu cầu liên quan đến bài viết

