import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./entity/User"
import {Sites} from "./entity/Sites";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "12345678",
    database: "brandprotektor",
    synchronize: true,
    logging: false,
    entities: [User,Sites],
    migrations: [],
    subscribers: [],
})
