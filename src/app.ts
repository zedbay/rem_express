import * as express from 'express';
import { Router } from 'express';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as config from '../config.json';
import * as  mongoose from 'mongoose';
import { mountUserRoutes } from './routes/user-router';

class App {

  public express: express.Express = express();

  constructor() {
    this.express.use(cors());
    this.express.use(bodyParser.json());
    this.express.use(bodyParser.urlencoded({ extended: false }));
    this.startMongoDb();
    this.mountRoutes();
  }

  private startMongoDb() {
    mongoose.connect('mongodb://admin:secret@mongodb:27017/stack',
      {
        useNewUrlParser: true,
        useUnifiedTopology: true
      },
      () => {
        console.log('Connected to MongoDB');
      }
    );
  }

  private mountRoutes() {
    const router: Router = Router();
    router.get('/isAlive', (req, res) => {
      res.status(200).json({ isAlive: true });
    });
    mountUserRoutes(router);
    this.express.use(router);
  }
}

const app = new App().express;

app.listen(config['port'], () => {
  console.log(`Server running on port ${config['port']}`);
});