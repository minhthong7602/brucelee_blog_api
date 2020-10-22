import { Repository, FindManyOptions  } from 'typeorm';
export class BaseRepository<T> extends Repository<T> {
    public async getAll(options?: FindManyOptions<T>): Promise<T[]> {
        return this.find(options);
    }

    public async getById(id: number): Promise<T> {
        return this.findOne(id);
    }

    public async insertData(data: T) {
        return this.save(data);
    }

    public async updateData(data: T) {
        return this.save(data);
    }

    // public async getMany()
}
