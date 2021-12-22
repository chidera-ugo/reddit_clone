import { MikroORM } from "@mikro-orm/core"
import { _prod_ } from "./constants"
import express from "express"
import mikroConfig from "./mikro-orm.config"
import { ApolloServer } from "apollo-server-express"
import { buildSchema } from "type-graphql"
import { HelloResolver } from "./resolvers/hello"
import { PostResolver } from "./resolvers/post"

const main = async () => {
	const orm = await MikroORM.init(mikroConfig)
	await orm.getMigrator().up()

	const app = express()

	const apolloServer = new ApolloServer({
		schema: await buildSchema({
			resolvers: [HelloResolver, PostResolver],
			validate: false,
		}),
		context: () => ({ em: orm.em }),
	})

	await apolloServer.start()
	apolloServer.applyMiddleware({ app })

	app.listen(4000, () => {
		console.log("Listening on port 4000")
	})
}

main().catch((err) => {
	console.log(err)
})