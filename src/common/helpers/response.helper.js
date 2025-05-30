


const responseSeccess = (data = null, message = `ok`,statusCode = 200, status = `Success`, doc=null)=>{

   return  {
            // theo nguyên tắc resful
            //200: thành công
            //400, 500: loi
            //401: chua dang nhap
            //403: khong co quyen refresh token
            statusCode: statusCode,
            status: status,
            message: message,
            data: data,
            doc: doc,
        }

};

export default responseSeccess;
