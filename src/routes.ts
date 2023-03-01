import { UserController } from "./controller/UserController"
import {SitesController} from "./controller/SitesController";

export const Routes = [{
    method: "get",
    route: "/users",
    controller: UserController,
    action: "all"
}, {
    method: "get",
    route: "/users/:id",
    controller: UserController,
    action: "one"
}, {
    method: "post",
    route: "/users",
    controller: UserController,
    action: "save"
}, {
    method: "delete",
    route: "/users/:id",
    controller: UserController,
    action: "remove"
},{
    method: "patch",
    route: "/users/update",
    controller: UserController,
    action: "update"
},{
    method: "post",
    route: "/addsite",
    controller: SitesController,
    action: "save"
},{
    method:"get",
    route:"/getAllSites",
    controller: SitesController,
    action:"all"
}
]