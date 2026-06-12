declare module 'express-serve-static-core' {
  interface Request {
    xhr?: boolean;
    session: any;
  }
}

declare module 'express-session' {
  interface SessionData {
    user?: {
      id: number;
      nome: string;
      email: string;
      avatar?: string;
      role: string;
    };
  }
}
