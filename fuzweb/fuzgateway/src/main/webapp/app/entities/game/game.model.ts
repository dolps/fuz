import { BaseEntity } from './../../shared';

export class Game implements BaseEntity {
    constructor(
        public id?: number,
        public player1?: string,
        public player2?: string,
    ) {
    }
}
