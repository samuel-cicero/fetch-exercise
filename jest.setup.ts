beforeAll(() => {
    jest.spyOn(console, "log").mockImplementation(() => {});
    jest.spyOn(console, "warn").mockImplementation(() => {});
    jest.spyOn(console, "error").mockImplementation(() => {});
})

afterEach(() => {
    jest.clearAllMocks(); 
    jest.resetAllMocks(); 
});
