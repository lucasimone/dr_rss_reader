/**
 * Created by luca.lamorte on 21/05/2017.
 */

export const LOGIN = "LOGIN"
export function login(username, password) {

    return {
        type: LOGIN,
        username: username,
        password: password,
        isAutheticated: true
    }
}

export const LOGOUT = "LOGOUT"
export function logout() {

    return {
        type: LOGOUT,
        username: "guest",
        password: "",
        isAutheticated: false
    }
}