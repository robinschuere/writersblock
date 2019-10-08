import modelBuilder from './modelBuilder';
import { constants } from '../../constants';

const values = modelBuilder(constants.powerApplierDb);

const getAllByStoryId = storyId => values.getAll()
  .then(rows => rows.filter(r => r.storyId === storyId));


const getAllByPowerId = powerId => values.getAll()
  .then(rows => rows.filter(r => r.powerId === powerId));

export default {
  ...values,
  getAll: getAllByStoryId,
  getAllByStoryId,
  getAllByPowerId,
};
