import { _prod_ } from "./constants"
import { Post } from "./entities/post"
import { MikroORM } from "@mikro-orm/core"
import path from "path"

export default {
	migrations: {
		path: path.join(__dirname, "./migrations"),
		pattern: /^[\w-]+\d+\.[tj]s$/,
	},
	entities: [Post],
	dbName: "lireddit",
	type: "postgresql",
	password: process.env.DB_PASSWORD || "dummy",
	debug: !_prod_,
} as Parameters<typeof MikroORM.init>[0]
