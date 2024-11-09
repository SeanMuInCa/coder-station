const config = [
    {path: '/', requireLogin: false},
    {path: '/issues', requireLogin: false},
    {path: "/issues/:id", requireLogin: false},
    {path: "/issues/add", requireLogin: true},
    {path: '/books', requireLogin: false},
    {path: "/books/:id", requireLogin: false},
    {path: '/login', requireLogin: false},
    {path: '/register', requireLogin: false},
    {path: '/profile/:id', requireLogin: true},
    {path: '/interviews', requireLogin: false},
    {path: '/interviews/:id', requireLogin: true},
];

export default config;