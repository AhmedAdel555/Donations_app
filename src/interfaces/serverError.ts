interface ServerError {
  name: string;
  message: string;
  stack?: string;
  status?: number;
}

export default ServerError;