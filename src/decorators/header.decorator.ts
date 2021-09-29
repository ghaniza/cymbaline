export const Header = (header: string, value: string) => {
    return (target: any, propertyName: string) => {
        if(!target.headers) {
            Object.defineProperty(target, 'headers', {
                configurable: true,
                get: () => {
                    return [{ header, value }]
                },
                set: () => {}
            })
        } else {
            const headers = target.headers

            Object.defineProperty(target, 'headers', {
                configurable: true,
                get: () => {
                    return [...headers, { header, value }]
                },
                set: () => {}
            })

        }
    }
}