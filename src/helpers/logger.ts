export const logInfo = (message: string, data?:string | undefined) => {
    console.log(message)
} 

export const logWarning = (message: string, data?:string | undefined) => {
    console.warn(message)
} 

export const logError = (message: string, e?:Error | undefined) => {
    console.error(message, e)
} 