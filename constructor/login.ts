import {Request} from "../constructor/request";
import * as faker from "faker";
import {expect} from "chai";
const baseUrl = "http://ip-5236.sunline.net.ua:30020";
const adminEmail = "test@test.com";
const adminPass = "123456";
const userEmail = "ivanchuk.viktoria@gmail.com";
const userPass = "Qwerty123";


export class UsersController {
    baseURL;
    token;
    
    constructor(baseURL?: string, token?: string) {
        this.baseURL = "http://ip-5236.sunline.net.ua:30020"
        this.token = token
    }

    public async loginAsAdmin(email, password){
        const adminLoginResp = await new Request(`${baseUrl}/users/login`)
            .method("POST")
            .body({ email: email, password: password })
            .send();
            return adminLoginResp.body;
    }
    async createUser(email, password, username) {
        const userCreateResp = await new Request(
            `${this.baseURL}/api/users`
        )
            .method("POST")
            .auth(this.token)
            .body({
                email: email,
                password: password,
                username: username
            })
            .send();
        return userCreateResp.body
    }
}
