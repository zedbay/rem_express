import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as config from '../config.json';
import * as  mongoose from 'mongoose';
import UserRouter from './routes/user-router';
import GroupRouter from './routes/groupe-router';
import ProductRouter from './routes/product-router';

class App {

  public express: express.Express = express();

  constructor() {
    this.express.use(cors());
    this.express.use(bodyParser.json());
    this.express.use(bodyParser.urlencoded({ extended: false }));
    this.startMongoDb();
    this.mountRouter();
  }

  private startMongoDb() {
    mongoose.connect(`mongodb://${config['mongoDb']['username']}:${config['mongoDb']['password']}@mongodb:27017/stack`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true
      },
      () => {
        console.log('Connected to MongoDB');
      }
    );
  }

  public mountRouter() {
    this.express.get('/isAlive', (req, res) => {
      res.status(200).json({ isAlive: true });
    });
    this.express.use(UserRouter);
    this.express.use(GroupRouter);
    this.express.use(ProductRouter);
  }
}

const app = new App().express;

app.listen(config['port'], () => {
  console.log(`Server running on port ${config['port']}`);
});