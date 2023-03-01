import {AppDataSource} from "../data-source";
import {Sites} from "../entity/Sites";
import {NextFunction, Request, Response} from "express";

export class SitesController {

    private sitesRepository = AppDataSource.getRepository(Sites);

    async all(request: Request, response: Response, next: NextFunction) {
        return this.sitesRepository.find()
    }

    async save(request: Request, response: Response, next: NextFunction){
        const {domain, keyword} = request.body;

        const site = Object.assign(new Sites(),{
            domain,
            keyword
        })

        return this.sitesRepository.save(site);
    }
}