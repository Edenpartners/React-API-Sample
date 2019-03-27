export const SET_CRED = 'SET_CRED';

export function setCred(token){
    return {
        type: SET_CRED,
        token: token,
    };
}