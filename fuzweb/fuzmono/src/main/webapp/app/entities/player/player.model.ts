import { BaseEntity } from './../../shared';

export class Player implements BaseEntity {
    constructor(
        public id?: number,
        public nickName?: string,
        public firstName?: string,
        public lastName?: string,
        public gamesWon?: number,
        public gamesLost?: number,
    ) {
    }
}
