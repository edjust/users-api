import { Request, Response } from 'express';
import { ListUsersService } from '../../../services/ListUsersService';
import { ListUserAddressesService } from '../../../services/ListUserAddressesService';
import { ListUserContactsService } from '../../../services/ListUserContactsService';

export class ListUsersController {
  public async index(request: Request, response: Response) {
    const queryParams = request.query as any;
    const listUsersService = new ListUsersService();
    const listUserAddressesService = new ListUserAddressesService();
    const listUserContactsService = new ListUserContactsService();

    const usersList = await listUsersService.execute(queryParams);

    for (let user of usersList) {
      let userAddresses = await listUserAddressesService.execute(user.id);
      let userContacts = await listUserContactsService.execute(user.id);

      user.addresses = userAddresses;
      user.contacts = userContacts;
    }

    return response.json(usersList);
  }
}