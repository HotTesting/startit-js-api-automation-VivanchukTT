import * as request from "request-promise-native";


export class Login {
  //public token:string = ' ';

    async login(email: string, pass: string){
    let adminLoginResp = await request.post(
    "http://ip-5236.sunline.net.ua:30020/users/login",
    {
        json: true,
        body: {email: email,password: pass}
        }
    );
    console.log("Login successful!");
        
    
    };
};