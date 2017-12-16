import { BaseEntity } from './../../shared';

export class GameResult implements BaseEntity {
    constructor(
        public id?: number,
        public games?: BaseEntity[],
    ) {
    }
}
