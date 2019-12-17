const { AuthenticationError, UserInputError, ApolloServer, gql } = require('apollo-server')
const Book = require('./models/book')
const Author = require('./models/author')
const User = require('./models/user')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const { PubSub } = require('apollo-server')

const pubsub = new PubSub()

const JWT_SECRET = 'secret'

mongoose.set('useFindAndModify', false)

const MONGODB_URI = 'mongodb+srv://Fullstack:testPass123@cluster0-nsejx.mongodb.net/note-app?retryWrites=true&w=majority'

console.log('connecting to ', MONGODB_URI)

mongoose.connect(MONGODB_URI, { useNewUrlParser: false })
    .then(() => console.log('connected to MongoDB'))
    .catch((error) => console.log('error connecting to MongoDB: ', error.message))



const typeDefs = gql`
    type Author {
        name: String!
        born: Int
        id: ID!
        bookCount: Int!
    }

    type Book {
        title: String!
        published: Int!
        author: String!
        id: ID!
        genres: [String!]!
    }

    type User {
        username: String!
        favoriteGenre: String!
        id: ID!
    }

    type Token {
        value: String!
    }

    type Query {
        authorCount: Int!
        bookCount: Int!
        allAuthors: [Author!]!
        allBooks(author: String, genre: String): [Book!]!
        me: User
    }

    type Mutation {
        addBook(
            title: String!
            author: String!
            published: Int!
            genres: [String!]!
        ): Book
        editAuthor(
            name: String!
            setBornTo: Int!
        ): Author
        createUser(
            username: String!
            favoriteGenre: String!
        ): User
        login(
            username: String!
            password: String!
        ): Token
    }

    type Subscription {
        bookAdded: Book!
    }
`

const resolvers = {
    Query: {
        authorCount: () => Author.collection.countDocuments(),
        bookCount: () => Book.collection.countDocuments(),
        allAuthors: async () => {
            const allAuthors = await Author.find({}).populate('books')
            return allAuthors
        },
        allBooks: async (root, args) => {
            const populatedBooks = await Book.find({}).populate('author')
            let allBooks = []
            populatedBooks.forEach(b => allBooks.push({ ...b._doc, id: b._id, author: b.author.name }))
            if (!args.author && !args.genre) {
                return allBooks
            }
            args.author ?
                allBooks = allBooks.filter(b => b.author === args.author) : null
            args.genre ?
                allBooks = allBooks.filter(b => b.genres.includes(args.genre)) : null
            return allBooks
        },
        me: (root, args, context) => {
            console.log('|||me,context.user: ', context.currentUser)
            return context.currentUser
        }
    },
    Author: {
        bookCount: async (root) => {
            const allBooks = await Book.find({}).populate('author')
            const authoredBooks = allBooks.filter(b => b.author.name === root.name)
            return authoredBooks.length
        }
    },
    Mutation: {
        addBook: async (root, args, { currentUser }) => {
            if (!currentUser) {
                throw new AuthenticationError('not authenticated')
            }

            let author = await Author.findOne({ name: args.author })
            if (!author) {
                const newAuthor = {
                    name: args.author,
                }
                author = new Author({ ...newAuthor })
                try {
                    await author.save()
                } catch (error) {
                    throw new UserInputError(error.message, {
                        invalidArgs: args.author
                    })
                }
            }            
            const newBook = new Book({ ...args, author: author })
            try {
                await newBook.save()
            } catch (error) {
                throw new UserInputError(error.message, {
                    invalidArgs: args
                })
            }
            
            const newBookRef = { ...newBook._doc, id: newBook._doc._id, author: args.author }
            
            pubsub.publish('BOOK_ADDED', { bookAdded: newBookRef })

            return newBookRef
        },
        editAuthor: async (root, args, { currentUser }) => {
            if (!currentUser) {
                throw new AuthenticationError('not authenticated')
            }
            const isAuthor = await Author.findOne({ name: args.name })
            if (!isAuthor) {
                return null
            }
            await Author.update({ name: args.name }, { born: args.setBornTo}, { upsert: true })
            const editedAuthor = await Author.findOne({ name: args.name })
            return editedAuthor
        },
        createUser: async (root, args) => {
            const newUser = new User({ ...args })
            return newUser.save()
                .catch(error => {
                    throw new UserInputError(error.message, {
                        invalidArgs: args
                    })
                })
        },
        login: async (root, args) => {
            const user = await User.findOne({ username: args.username })
            if (!user || args.password !== 'secret') {
                throw new UserInputError('invalid credentials')
            }

            const userForToken = {
                username: user.username,
                id: user._id
            }

            return { value: jwt.sign(userForToken, JWT_SECRET) }
        }
    },
    Subscription: {
        bookAdded: {
            subscribe: () => pubsub.asyncIterator(['BOOK_ADDED'])
        }
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: async ({ req }) => {
        const auth = req ? req.headers.authorization : null
        // console.log('|||auth: ', auth)
        if (auth && auth.toLowerCase().startsWith('bearer ')) {
            const token = jwt.verify(
                auth.substring(7), JWT_SECRET
            )
            const currentUser = await User.findById(token.id)
            // console.log('|||currentUser: ', currentUser)
            return { currentUser }
        }
    }
})

server.listen().then(({ url, subscriptionsUrl }) => {
    console.log(`Subscriptions ready at ${subscriptionsUrl}`)
    console.log(`Server ready at ${url}`)
})