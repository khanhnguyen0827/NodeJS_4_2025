
import prisma from "../common/prisma/init.prisma.js";
// Import Prisma client to interact with the database

const articlesService = {
    getAll:  async(req) => {
        // This method retrieves all articles from the database
        const listArticles = await prisma.articles.findMany();
        return listArticles ;
    }
};


export default articlesService;
// articlesService là một đối tượng chứa các phương thức để tương tác với dữ liệu bài viết
