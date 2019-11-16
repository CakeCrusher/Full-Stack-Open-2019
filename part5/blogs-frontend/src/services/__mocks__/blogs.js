const blogs = [
    {
        id: '5a451df7571c224a31b5c8ce',
        content: 'HTML is easy',
        date: '2019-06-11T16:38:15.541Z',
        important: false,
        user: {
          _id: '5a437a9e514ab7f168ddf138',
          username: 'mluukkai',
          name: 'Matti Luukkainen'
        }
    }
]

const getAll = () => {
    return Promise.resolve(blogs)
}

export default { getAll }