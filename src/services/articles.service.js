import e from "express";
import prisma from "../common/prisma/init.prisma.js";
// Import Prisma client to interact with the database

const articlesService = {
    getAll: async () => {
        return await prisma.articles.findMany();
    }
};


export default articlesService;
// articlesService là một đối tượng chứa các phương thức để tương tác với dữ liệu bài viết
