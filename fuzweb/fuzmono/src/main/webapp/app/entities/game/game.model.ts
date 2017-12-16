import { BaseEntity } from './../../shared';

export class Game implements BaseEntity {
    constructor(
        public id?: number,
        public tOnes?: BaseEntity[],
        public tTwos?: BaseEntity[],
        public winnerTeams?: BaseEntity[],
        public gameResult?: BaseEntity,
    ) {
    }
}
