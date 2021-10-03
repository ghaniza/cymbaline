export class Database {
    public static configure() {
        return async () =>
            new Promise((res, rej) => {
                setTimeout(() => {
                    process.env.DEBUG && console.log('Database connected')
                    res(null)
                }, 50)
            })
    }
}
