export const exactArrayLength = params => val => val.length === params
export const exactNumberLength = params => val => typeof val === 'number' && (String(val).length === params)
