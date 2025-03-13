export const logInfo = (message: string) => {
   console.log(message);
};

export const logWarning = (message: string) => {
   console.warn(message);
};

export const logError = (message: string, e?: Error | undefined) => {
   console.error(message, e);
};
