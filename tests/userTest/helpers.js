import models from '../../src/server/models';
import { listOfUsers } from './userMock';

class TestSetup {
  static async createTables() {
    await models.User.bulkCreate(listOfUsers);
  }
  static async destroyTables() {
    await models.User.destroy({ force: true, truncate: true,  cascade: true })
  }
}

export default TestSetup