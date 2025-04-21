import { Response } from "express";
import { UserSignup } from "../../../application/services/userSignupService";
import { UserLogin } from "../../../application/services/userLoginService";
import { CreateArticle } from "../../../application/services/articleCreationService";
import { ViewAllArtcles } from "../../../application/services/viewAllArticles";
import { UserRepositoryMongoose } from "../../../domain/interfaces/Repositories/userRepository";
import { HttpStatusCode } from "../../../helper/contants/enums";
import { StatusMessage } from "../../../helper/contants/statusMessages";

const userSignupService = new UserSignup(new UserRepositoryMongoose());
const userLoginService = new UserLogin(new UserRepositoryMongoose());
const createArticleService = new CreateArticle(new UserRepositoryMongoose());
const viewAllArtclesService = new ViewAllArtcles(new UserRepositoryMongoose());

export class UserController {
    constructor() { }

    async signupUser(req: any, res: Response): Promise<any> {
        try {
            const { email, password } = req.body;

            const result = await userSignupService.execute(email, password);
            res.status(HttpStatusCode.OK).json({ message: StatusMessage[HttpStatusCode.OK], user: result , success: true});
        } catch (err: unknown) {
            console.log("ERROR: ", err);
        }
    }

    async loginUser(req: any, res: Response): Promise<void> {
        try {
            const { email, password } = req.body; 

            const result = await userLoginService.execute(email, password);

            res.status(HttpStatusCode.OK).json({ message: StatusMessage[HttpStatusCode.OK], user: result , success: true});
        } catch (error: unknown) {
            const err = error as {message: string}; 
         res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
          message: err.message,
          success: false,
        });
      return;
        }
    }


    async crateArticle(req: any, res: Response): Promise<void> {
        try {
            const {userId} = req.params;
            
            const { 
                title,  
                subtitle,
                description,
                image,
                tags,
                category
              } = req.body; 
              console.log('The body: ', req.body)
              

            const result = await createArticleService.execute(
                userId,
                title,  
                subtitle,
                description,
                image,
                tags,
                category);
            

            res.status(HttpStatusCode.CREATED).json({ message: StatusMessage[HttpStatusCode.OK] , success: true});
        } catch (error: unknown) {
            const err = error as {message: string}; 
         res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
          message: err.message,
          success: false,
        });
      return;
        }
    }
   

    async viewAllArticle(req: any, res: Response): Promise<void> {
        try {
         
            const userId = 'dummy userId'
            console.log('the params ', req.params.type)
            const {type} = req.params;

            const result = await viewAllArtclesService.execute(userId, type); 

            res.status(HttpStatusCode.CREATED).json({ message: StatusMessage[HttpStatusCode.OK],articles: result , success: true});
        } catch (error: unknown) {
            const err = error as {message: string}; 
         res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
          message: err.message,
          success: false,
        });
      return;
        }
    }
}
