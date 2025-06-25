export function FormatEndpoint(endpoint) {
    if (!endpoint.endsWith('/')) {
        return endpoint + '/';
    }
    return endpoint;
}
