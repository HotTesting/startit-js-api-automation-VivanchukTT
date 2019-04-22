import {Request} from "../constructor/request";
import * as faker from "faker";
import {expect} from "chai";
const baseUrl = "http://ip-5236.sunline.net.ua:30020";
const adminEmail = "test@test.com";
const pass = "123456";


describe("Set of tests", function() {
    it("Should get the User information", async function() {
        let adminLoginResp = await new Request(`${baseUrl}/users/login`)
            .method('POST')
            .body({email: adminEmail,
               password: pass
                })
            .send();
        console.log("Login successful!");
        let getUsersInfoResp = await new Request(`${baseUrl}/api/user`)
            .method("GET")
            .headers({Authorization: `Bearer ${adminLoginResp.body.token}`})
            .send();
        console.log("User info returned!");
        expect(getUsersInfoResp.body).to.have.property(`username`);
        expect(getUsersInfoResp.body).not.have.property(`Forbidden`);
        expect(getUsersInfoResp.body).not.have.property(`error`);
    });

    it("NEGATIVE: Should return Error", async function() {
        let adminLoginResp = await new Request(`${baseUrl}/users/login`)
            .method('POST')
            .body({email: adminEmail,password: pass})
            .send();
        let getUsersInfoResp = await new Request(`${baseUrl}/api/user`)
            .method("GET")
            .headers({Authorization: "InvalidToken"})
            .send();
            try {
                expect(getUsersInfoResp).to.have.property(`username`);
                expect(getUsersInfoResp.body).not.have.property(`error`);
                console.log("User info returned!");
            }
            catch(err){
                console.log("User info NOT returned!"); 
                throw(err); 
            }
    });

    it("Should create && delete new User", async function() {
        let adminLoginResp = await new Request(`${baseUrl}/users/login`)
            .method('POST')
            .body({email: adminEmail,
                   password: pass
                })
            .send();
        console.log("Login successful!");
        //create a New User
        let createUserResponse = await new Request(`${baseUrl}/api/users`)
            .method("POST")
            .headers({Authorization: `Bearer ${adminLoginResp.body.token}`})
            .body({username: "MyUserForDeletion",
                   email: faker.internet.email(undefined, undefined, `ip-5236.sunline.net.ua`),
                   password: faker.internet.password(),
                   fromAdmin: true                          
                })
            .send();
        console.log("User created!");
        const newUsersID = `${createUserResponse.body._id}`
        //Delete the User
        let deleteUserResponse = await new Request(`${baseUrl}/api/users/${newUsersID}`)
            .method("DELETE")
            .headers({Authorization: `Bearer ${adminLoginResp.body.token}`})
            .send();
        console.log("User deleted!");
        expect(deleteUserResponse.body).to.have.property(`_id`);
        expect(deleteUserResponse.body).not.have.property(`Forbidden`);
        expect(deleteUserResponse.body).not.have.property(`error`);
        });  

    it("NEGATIVE: Should fail deletion of the new User", async function() {
            let adminLoginResp = await new Request(`${baseUrl}/users/login`)
                .method('POST')
                .body({email: adminEmail,password: pass})
                .send();
            console.log("Login successful!");
            //create a New User
            let createUserResponse = await new Request(`${baseUrl}/api/users`)
                .method("POST")
                .headers({Authorization: `Bearer ${adminLoginResp.body.token}`})
                .body({username: faker.internet.userName(),
                       email: faker.internet.email(undefined, undefined, `ip-5236.sunline.net.ua`),
                       password: faker.internet.password(),
                       fromAdmin: true})
                .send();
            const newUsersID = `${createUserResponse.body._id}`
            //Delete the User -- incorrect ID
            let deleteUserResponse = await new Request(`${baseUrl}/api/users/incorrectID123456`)
                .method("DELETE")
                .headers({Authorization: `Bearer ${adminLoginResp.body.token}`})
                .send();
            try {
            expect(deleteUserResponse.body).to.have.property(`_id`);
            expect(deleteUserResponse.body).not.have.property(`Forbidden`);
            expect(deleteUserResponse.body).not.have.property(`error`);
            console.log("User deleted!");
            }
            catch(err){
            console.log("User NOT deleted!");
            throw(err);
            }
            });
          
    it("Should register new User", async function() {
        let adminLoginResp = await new Request(`${baseUrl}/users/login`)
            .method('POST')
            .body({email: adminEmail,
                   password: pass
                })
            .send();
        console.log("Login successful!");
        let registerUserResponse = await new Request(`${baseUrl}/users/register`)
        .method("POST")
        .headers({Authorization: `Bearer ${adminLoginResp.body.token}`})
        .body({username: faker.internet.userName(),
               email: faker.internet.email(undefined, undefined, `ip-5236.sunline.net.ua`),
               password: faker.internet.password(),                           
              })
        .send(); 
            //get the Information about the new User
        const newUsersID = `${registerUserResponse.body.id}`
        let getNewUserInfo = await new Request(`${baseUrl}/api/users/${newUsersID}`)
        .method("GET")
        .headers({Authorization: `Bearer ${adminLoginResp.body.token}`})        
        .send();
        expect(registerUserResponse.body).to.have.property(`id`);  
        expect(registerUserResponse.body).not.have.property(`Forbidden`);
        expect(registerUserResponse.body).not.have.property(`error`);
    }); 

    it("Get a Users list", async function() {
        let adminLoginResp = await new Request(`${baseUrl}/users/login`)
            .method('POST')
            .body({email: adminEmail,
                   password: pass
                })
            .send();
        console.log("Login successful!");
        let getUsersListResp = await new Request(`${baseUrl}/api/users`)
        .method("GET")
        .headers({Authorization: `Bearer ${adminLoginResp.body.token}`})
        .send();
        console.log("Users list returned!");
        expect(getUsersListResp.body).not.empty;
        expect(getUsersListResp.body).not.have.property(`error`);
        console.log("User info returned!", getUsersListResp);
        });

    it("NEGATIVE: Get a Users list", async function() {
        let adminLoginResp = await new Request(`${baseUrl}/users/login`)
                .method('POST')
                .body({email: adminEmail,
                       password: pass
                    })
                .send();
            console.log("Login successful!");
            let getUsersListResp = await new Request(`${baseUrl}/api/users`)
            .method("GET")
            .headers({Authorization: "IncorrectToken"})
            .send();
         try{
            expect(getUsersListResp.body).not.have.property(`error`);
            console.log("User list returned!");
            }
         catch(err){
            console.log("User list NOT returned!");
            throw(err);            
            }

            });
    });

