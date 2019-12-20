import models from '../../src/server/models';
import { listOfTasks } from './taskMocks';


class TestSetup {
  static async createTables() {
    await models.Task.bulkCreate(listOfTasks);
  }
  static async destroyTables() {
    await models.Task.destroy({ force: true, truncate: true,  cascade: true })
  }
}

export default TestSetup