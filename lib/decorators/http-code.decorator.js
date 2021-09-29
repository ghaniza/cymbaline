const HttpCode = (httpCode) => {
    return (target, propertyName) => {
        if (!(target === null || target === void 0 ? void 0 : target.router))
            Object.defineProperty(target, 'router', {
                configurable: true,
                get: () => {
                    return [{
                            propertyName,
                            httpCode,
                        }];
                },
            });
        else {
            const previousRoute = target.router.find(r => r.propertyName === propertyName);
            const routes = target.router.filter(r => r.propertyName !== propertyName);
            Object.defineProperty(target, 'router', {
                configurable: true,
                get: () => {
                    return [
                        ...routes,
                        {
                            ...previousRoute,
                            httpCode,
                        }
                    ];
                },
            });
        }
    };
};
//# sourceMappingURL=http-code.decorator.js.map