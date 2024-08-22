// session.config.ts
import { Injectable } from '@nestjs/common';
import * as session from 'express-session';
import * as connectMongo from 'connect-mongodb-session';
const MongoStore = connectMongo(session);

const store = new MongoStore({
  uri: 'mongodb://127.0.0.1:27017/Debugs',
  collection: 'sessions',
});

@Injectable()
export class SessionConfig {
  getSession(): session.SessionOptions {
    return {
      secret: 'MEPIKAELANO!!!',
      resave: false,
      saveUninitialized: true,
      store: store,
      cookie: {
        maxAge: 1000 * 60 * 60 * 24, // 1 día
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', // Usa HTTPS en producción
      },
    };
  }
}
