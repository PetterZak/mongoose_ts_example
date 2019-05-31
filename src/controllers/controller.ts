import express = require('express');
import { Service } from '../services/service';

export class FacilityController {
  public router: express.Router = express.Router();
  private facilityService: Service;
  constructor() {
    this.facilityService = new Service();
    this.config();
  }

  private config(): void {
    this.router.get('/api/getFacilityData/:id', async (req: express.Request, res: express.Response) => {
      if (!req.params.id) {
        return res.status(400).send('No facility id provided!');
      }
      const result = await this.facilityService.getFacilityData(req.params.id);
      return res.status(200).send(result);
    });

    this.router.get('/api/getFacilities', async (req: express.Request, res: express.Response) => {
      const result = await this.facilityService.getFacilities();
      return res.status(200).send(result);
    });
  }
}
