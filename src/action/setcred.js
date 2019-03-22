export const SET_CRED = 'SET_CRED';

export function setCred(id, token){
    return {
        type: SET_CRED,
        id: id,
        token: token,
    };
}