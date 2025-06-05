
import prisma from "../common/prisma/init.prisma.js";
// Import Prisma client to interact with the database

const articlesService = {
    getAll:  async(req) => {
        // This method retrieves all articles from the database
        /**
 * phân trang (pagination)
 * trả về dữ liệu dưới dạng JSON pagination
 * pagaSize , limit // so luong ban ghi moi trang
 * page, offset   // trang hien tai, offset là vi tri bat dau lay du lieu
 * totalPage, totalRecords // tong so trang, tong so ban ghi    
 * công thức phân trang 
 * const offset = (page - 1) * pagaSize;
 */
        let { page , pageSize } = req.query;    
        page = +page>0 ? +page : 1; // default page = 1
        pageSize = +pageSize>0 ? +pageSize : 3; // default pageSize = 3
        console.log(page,pageSize);
        
        const offset = (page - 1) * pageSize;

        const listArticles = await prisma.articles.findMany({
            orderBy: { // Sort the articles by createdAt in descending order
                createdAt: 'asc',
            },
            skip: offset,
            take: pageSize
        });

        const totalItems = await prisma.articles.count();

        return {
            page: page, //số trang hien tai
            pageSize: pageSize, //số bản ghi trong 1 trang
            totalitems: totalItems,  //tong so bản ghi
            totalPage: Math.ceil(totalItems / pageSize), //tong so trang
            items: listArticles, //danh sách bản ghi
        } ;
    }
    
};


export default articlesService;
// articlesService là một đối tượng chứa các phương thức để tương tác với dữ liệu bài viết
