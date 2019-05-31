import * as mongoose from 'mongoose';
import * as bodyParser from 'body-parser';
import * as express from 'express';
import * as cors from 'cors';
import { configuration } from './configuration';
import { FacilityController } from './controllers/controller';

export class Server {

  public server: express.Application;

  constructor() {
    this.server = express();
    this.config();
  }

  private config(): void {
    this.setDatabase();
    this.setParsers(true);
    this.setCors();
    this.setRouting();
  }

  private async setDatabase(): Promise<void> {
    try {
      mongoose.set('useCreateIndex', true);
      await mongoose.connect(configuration.dataBase.host + configuration.dataBase.name, { useNewUrlParser: true });
      console.log('MongoDB has started...');
    } catch (err) {
      console.log(err);
    }
  }

  private setParsers(useNestedObjects: boolean): void {
    // support application/json
    this.server.use(bodyParser.json());
    // support application/x-www-form-urlencoded post data
    this.server.use(bodyParser.urlencoded({ extended: useNestedObjects }));
  }

  private setCors(): void {
    this.server.use(cors({
      origin: (origin, callback) => {
        callback(null, true);
      }, credentials: true
    })
    );
  }

  private setRouting(): void {
    const facilityRoutes = new FacilityController().router;
    this.server.use(facilityRoutes);
  }
}

const PORT = configuration.server.port;
const server = new Server().server;

server.listen(PORT, () => {
  console.log('Express server listening on port ' + PORT);
});
