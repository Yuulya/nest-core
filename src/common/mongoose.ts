import { Model, Document } from 'mongoose';

// base repo
export class BaseRepository<T extends Document> {
  // inject model
  constructor(public readonly model: Model<T>) {
  }

  async createCollectionIfNotExited(): Promise<void> {
    if (!(await this.isCollectionExists())) {
      await this.model.createCollection();
    }
  }

  // check
  private async isCollectionExists(): Promise<boolean> {
    const result = await this.model.db.db
      .listCollections({name: this.model.collection.collectionName})
      .next();
    return !!result;
  }
}

export class BaseDocument extends Document {

}