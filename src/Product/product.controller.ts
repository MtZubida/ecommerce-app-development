import { Body, Controller, FileTypeValidator, Get, Param, ParseFilePipe, ParseIntPipe, Post, Session, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { AdminDTO } from "src/Admin/DTOs/admin.dto";
import { ProductDTO } from "./DTOs/product.dto";
import { SessionGuard } from "./product.guard";
import { ProductService } from "./product.service";

@Controller('/product')
export class ProductController{
    constructor(private productService: ProductService){}

    @Post('/add')
    @UseGuards(SessionGuard)
    @UseInterceptors(FileInterceptor('myfile',
    {storage:diskStorage({
      destination: './uploads',
      filename: function (req, file, cb) {
        cb(null,Date.now()+file.originalname)
      }
    })

    }))
    signup(@Session() session, @Body() mydto:ProductDTO,@UploadedFile(new ParseFilePipe({
      validators: [
        new FileTypeValidator({ fileType: 'png|jpg|jpeg|' }),
      ],
    }),) file: Express.Multer.File){
    
        mydto.filename = file.filename;
        mydto.SellerUsername = session.username;
        return this.productService.add(mydto);
    }

    @Get('/getAll')
    @UseGuards(SessionGuard)
    getAll(): any {
        return this.productService.getAll();
    }

    @Get('/getPartial')
    @UseGuards(SessionGuard)
    getPartial(): any {
        return this.productService.getPartial();
    }

    @Get("/search/:id")
    @UseGuards(SessionGuard)
    searchById(@Param('id', ParseIntPipe) id:number){
        return this.productService.searchById(id);
    }

    @Get("search/s/:productname")
    @UseGuards(SessionGuard)
    searchByUsername(@Param('productname',) productname:string){
        return this.productService.searchByUsername(productname);
    }

    @Get("/buy/:id")
    @UseGuards(SessionGuard)
    buyProduct(@Session() session, @Param('id', ParseIntPipe) id:number){
        const buyerUsername = session.username;
        return this.productService.buyProduct(id, buyerUsername);
    }
    
    
}