import { Request, Response } from 'express';

import { ListUserReceiveComplimentsService } from '../services/ListUserReceiveComplimentsService';

class ListUserReceiveComplimentsController {

  async handle(request: Request, res: Response) {
    const { user_id } = request;

    const listUserReceiveComplimentsService = new ListUserReceiveComplimentsService();

    const compliments = await listUserReceiveComplimentsService.execute(user_id);

    return res.json(compliments);
  }

}

export { ListUserReceiveComplimentsController }