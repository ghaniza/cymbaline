export class Database {
    public static configure() {
        return async () =>
            new Promise((resolve, reject) => {
                setTimeout(() => {
                    process.env.DEBUG && console.log('Database connected')
                    resolve(null)
                }, 50)
            })
    }
}
