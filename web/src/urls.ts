
export function getAPiUrl(): string {
    if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
        return "http://127.0.0.1:8080/";
    } else {
        return window.location.origin;
    }
}

export function signIn() : string {
    return `${getAPiUrl()}user/login`;
}

export function fetch() : string {
    return `${getAPiUrl()}data/fetch`;
}

export function save() : string {
    return `${getAPiUrl()}data/saveSnapshot`;
}

export function all() : string {
    return `${getAPiUrl()}data/all`;
}

export function summaryUSA() : string {
    return `${getAPiUrl()}data/summary/usa`;
}

export function summaryIndia() : string {
    return `${getAPiUrl()}data/summary/india`;
}

export function summaryItaly() : string {
    return `${getAPiUrl()}data/summary/itlay`;
}