import * as express from "express"

import { Request, Response  } from "express"
import { AppDataSource } from "./data-source"
import { Routes } from "./routes"
import bodyParser = require("body-parser");
import {upload} from "./controller/csvUploader";
import {SitesController} from "./controller/SitesController";
// create express app
const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));


AppDataSource.initialize().then(async () => {


    // register express routes from defined application routes
    Routes.forEach(route => {
        (app as any)[route.method](route.route, (req: Request, res: Response, next: Function) => {
            const result = (new (route.controller as any))[route.action](req, res, next)
            if (result instanceof Promise) {
                result.then(result => result !== null && result !== undefined ? res.send(result) : undefined)

            } else if (result !== null && result !== undefined) {
                res.json(result)
            }
        })
    })
   app.use('/addsite', upload.array('csv', 12), function (req, res, next) {
        const files = req.files
        if (!files) {
            const error = new Error('Please choose files')
            return next(error)
        }
       SitesController.SavetoDatabase(req, res, next)


    })


    // app.use('/addsite', upload.array('csv', 12),SitesController.SavetoDatabase(Request,Response,NextFunction))


    // setup express app here
    // ...

    // start express server
    app.listen(3000)

    // insert new users for test
    // await AppDataSource.manager.save(
    //     AppDataSource.manager.create(User)
    // )

    // await AppDataSource.manager.save(
    //     AppDataSource.manager.create(User, {
    //         firstName: "Phantom",
    //         lastName: "Assassin",
    //         age: 24
    //     })
    // )

    console.log("Express server has started on port 3000. Open http://localhost:3000/users to see results")


}).catch(error => console.log(error))
