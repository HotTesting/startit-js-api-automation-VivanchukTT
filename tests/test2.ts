import {Request} from "../constructor/request";
import * as faker from "faker";
import {expect} from "chai";
const baseUrl = "http://ip-5236.sunline.net.ua:30020";
const adminEmail = "test@test.com";
const pass = "123456";
const userEmail = "ivanchuk.viktoria@gmail.com";
const userPass = "Qwerty123";


describe("Set of tests", function() {
    it("Should create a board-list-card", async function() {
        let adminLoginResp = await new Request(`${baseUrl}/users/login`)
            .method('POST')
            .body({email: adminEmail,password: pass})
            .send();
            console.log("Login successful!");

        let userLoginResp = await new Request(`${baseUrl}/users/login`)
            .method('POST')
            .body({email: userEmail,password: userPass})
            .send();
            console.log("Login successful!");
            const userID = await `${userLoginResp.body.id}`;

        let createBoardResp = await new Request(`${baseUrl}/api/boards`)
            .method('POST')
            .headers({Authorization: `Bearer ${adminLoginResp.body.token}`})
            .body({ title: "BoardTitleVI5",owner: userID,permission:"public",color:"pumpkin"})
            .send();
            console.log("Board created!");
            const boardID = await `${createBoardResp.body._id}`;
        
        let addSwimlaneResp = await new Request(`${baseUrl}/api/boards/${boardID}/swimlanes`)
            .method('POST')
            .headers({Authorization: `Bearer ${adminLoginResp.body.token}`})
            .body({ title: "Swimlane VI"})
            .send();
            console.log("Swim added!");
            const swimID = await `${addSwimlaneResp.body._id}`;

        let createListsResp = await new Request(`${baseUrl}/api/boards/${boardID}/lists`)
            .method('POST')
            .headers({Authorization: `Bearer ${adminLoginResp.body.token}`})
            .body({ title: "List VI"})
            .send();
            console.log("Lists created!");
            const listID = await `${createListsResp.body._id}`;

        let createCardResp = await new Request(`${baseUrl}/api/boards/${boardID}/lists/${listID}/cards`)
            .method('POST')
            .headers({Authorization: `Bearer ${adminLoginResp.body.token}`})
            .body({ title: "Card VI", description: "Card description", authorId: userID, swimlaneId: swimID})
            .send();
            console.log("Card created!"); 

        let getCardsResp = await new Request(`${baseUrl}/api/boards/${boardID}/swimlanes/${swimID}/cards`)
            .method('GET')
            .headers({Authorization: `Bearer ${adminLoginResp.body.token}`})
            .send();
            console.log("Cards returned!");

        let getListsResp = await new Request(`${baseUrl}/api/boards/${boardID}/lists`)
            .method('GET')
            .headers({Authorization: `Bearer ${adminLoginResp.body.token}`})
            .send();
            console.log("Lists returned!");

        let getBoardsResp = await new Request(`${baseUrl}/api/users/${userID}/boards`)
            .method('GET')
            .headers({Authorization: `Bearer ${adminLoginResp.body.token}`})
            .send();
        console.log("Boards of User was returned!");   

    });
})