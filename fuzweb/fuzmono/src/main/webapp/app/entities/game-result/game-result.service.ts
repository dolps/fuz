import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { SERVER_API_URL } from '../../app.constants';

import { GameResult } from './game-result.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class GameResultService {

    private resourceUrl = SERVER_API_URL + 'api/game-results';

    constructor(private http: Http) { }

    create(gameResult: GameResult): Observable<GameResult> {
        const copy = this.convert(gameResult);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(gameResult: GameResult): Observable<GameResult> {
        const copy = this.convert(gameResult);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<GameResult> {
        return this.http.get(`${this.resourceUrl}/${id}`).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    query(req?: any): Observable<ResponseWrapper> {
        const options = createRequestOption(req);
        return this.http.get(this.resourceUrl, options)
            .map((res: Response) => this.convertResponse(res));
    }

    delete(id: number): Observable<Response> {
        return this.http.delete(`${this.resourceUrl}/${id}`);
    }

    private convertResponse(res: Response): ResponseWrapper {
        const jsonResponse = res.json();
        const result = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            result.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return new ResponseWrapper(res.headers, result, res.status);
    }

    /**
     * Convert a returned JSON object to GameResult.
     */
    private convertItemFromServer(json: any): GameResult {
        const entity: GameResult = Object.assign(new GameResult(), json);
        return entity;
    }

    /**
     * Convert a GameResult to a JSON which can be sent to the server.
     */
    private convert(gameResult: GameResult): GameResult {
        const copy: GameResult = Object.assign({}, gameResult);
        return copy;
    }
}
