/* eslint-disable @typescript-eslint/no-explicit-any */
import { Repository } from "typeorm";

export class RepositoryService {
    protected constructor(protected readonly respository: Repository<any>){}

    async save(options: object) {
        return this.respository.save(options);
    }

    async find(options: object = {}) {
        return this.respository.find(options);
    }

    async findOne(options: object) {
        return this.respository.findOne(options);
    }

    async update(id: number, options) {
        return this.respository.update(id, options);
    }

    async delete(id: number) {
        return this.respository.delete(id);
    }

    async findOneByOrFail(options: object) {
        return this.respository.findOneByOrFail(options);
    }
}