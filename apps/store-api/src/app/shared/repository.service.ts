import { Repository } from "typeorm";

export class RepositoryService {
    protected constructor(protected readonly respository: Repository<unknown>){}

    async save(options) {
        return this.respository.save(options);
    }

    async find(options = {}) {
        return this.respository.find(options);
    }

    async findOne(options) {
        return this.respository.findOne(options);
    }

    async update(id: number, options) {
        return this.respository.update(id, options);
    }

    async delete(id: number) {
        return this.respository.delete(id);
    }

    async findOneByOrFail(id: number) {
        return this.respository.findOneByOrFail({where:{id}});
    }
}