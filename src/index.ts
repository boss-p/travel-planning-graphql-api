import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { typeDefs } from './schema/schema';
import { resolvers } from './resolvers/resolvers';


// Create Apollo Server instance
const server = new ApolloServer({
    typeDefs,
    resolvers,
});

// Start the server
const PORT = 4000;
async function startServer() {
    const {url} = await startStandaloneServer(server, {
        listen: {port: PORT},
    });
    console.log(`Server running at ${url}`);
    console.log(`GraphQL Playground available at ${url}`);
}

startServer().catch((error) => {
    console.error('Error starting server: ', error);
});