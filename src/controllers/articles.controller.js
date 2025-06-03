
import articlesService from '../services/articles.service.js';


const articlesController = {
    getAllArticles: async (req, res) => {
        try {
            const articles = await articlesService.getAll;
            res.json(articles);
        } catch (error) {
            console.error("Error fetching articles:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    }
};


export default articlesController;
// articlesController là một đối tượng chứa các phương thức để xử lý các yêu cầu liên quan đến bài viết

