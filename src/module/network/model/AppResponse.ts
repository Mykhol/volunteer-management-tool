/**
 * Represents the response from a request made.
 */
export class AppResponse<T> {

    constructor(
        public status: number,
        public body: T | null,
        public errorBody: any | null,
        private message: string | null
    ) {}

    isSuccessful = (): boolean => {
        return this.status < 300 && this.status >= 200
    }

    static createOk = <T>(body: T | null, message: string | null = null): AppResponse<T> => {
        return new AppResponse<T>(200, body, null, message)
    }

    static createError = <T>(errorBody: any | null, message: string | null = null): AppResponse<T> => {
        return new AppResponse<T>(500, null, errorBody, message)
    }

}