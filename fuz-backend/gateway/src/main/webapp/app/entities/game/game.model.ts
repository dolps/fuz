import { BaseEntity } from './../../shared';

export class Game implements BaseEntity {
    constructor(
        public id?: number,
        public description?: any,
        public datePlayed?: any,
    ) {
    }
}
