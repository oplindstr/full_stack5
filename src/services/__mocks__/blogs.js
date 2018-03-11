

const blogs = [
    {
        id: '5a8ab350e1cc4d2390b12363',
        title: 'Test1',
        author: 'Test1',
        url: 'Test1',
        likes: 0
    },
    {
        id: '5a8ab35d0be3ca43842849f3',
        title: 'Test2',
        author: 'Test2',
        url: 'Test2',
        likes: 0
    },
    {
        id: '5a8ab38973625007a0c2b853',
        title: 'Test3',
        author: 'Test3',
        url: 'Test3',
        likes: 0,
        user: {
            blogs: [ ],
            _id: '5a86ecae58bd1723204739be',
            username: 'test',
            name: 'test',
            adult: false,
            passwordHash: '$2a$10$qvHEgOW1Gxnwn1ToW0cpv..uvfWrK1IbHwgHi9k9f1Z6GWnuuBYKa',
            __v: 0
        }
    }
]

const getAll = () => {
  return Promise.resolve(blogs)
}

export default { getAll, blogs }