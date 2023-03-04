import {AppDataSource} from "../data-source";
import {Sites} from "../entity/Sites";
import {NextFunction, Request, Response} from "express";

const fs = require("fs");
const { parse } = require("csv-parse");
export class SitesController {

    private static  sitesRepository = AppDataSource.getRepository(Sites);

    static async  all(request: Request, response: Response, next: NextFunction) {
        return this.sitesRepository.find()
    }


    public static  SavetoDatabase(req: Request, resp: Response,next:NextFunction){
        const files = req.files
        if (!files) {
            const error = new Error('Please choose files')
            return next(error)
        }
        const self = this;
        files.forEach((file)=>{
            fs.createReadStream(file.path)
                .pipe(parse({ delimiter: ",", from_line: 2 }))
                .on("data", function (row) {

                    const  domain = row.shift();
                    const keyword = row.join(",");

                    const sites = Object.assign(new Sites(), {
                        domain,
                        keyword
                    })

                    self.sitesRepository.save(sites).then((info)=>console.log(info)).catch(err=>console.log(err));
                })
                .on("end", function () {
                    console.log("finished");
                })
                .on("error", function (error) {
                    console.log(error.message);
                });
        });

        const success = {
            success:"Files uploaded"
        }
        resp.send(success);

    }





}