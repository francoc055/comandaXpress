export function DecodeToken(token){

    const arrayToken = token.split('.');
    const tokenPayload = JSON.parse(atob(arrayToken[1]));
    console.log(tokenPayload.role);

    return tokenPayload.role;
}