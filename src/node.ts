import * as crypto from 'crypto'

export const md5 = (s: crypto.BinaryLike) => {
    return crypto.createHash('md5').update(s).digest('hex')
}

export const sha1 = (s: crypto.BinaryLike) => {
    return crypto.createHash('sha1').update(s).digest('hex')
}

export const sha256 = (s: crypto.BinaryLike) => {
    return crypto.createHash('sha256').update(s).digest('hex')
}
