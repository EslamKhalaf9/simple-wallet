class AppError extends Error {
  statusCode: number;
  messages: string[] = [];
  constructor(statusCode: number, message: string, messages: string[] = []) {
    super(message);
    this.statusCode = statusCode;
    this.messages = messages;
  }
}

export default AppError;
