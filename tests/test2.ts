import {Request} from "../constructor/request";
import * as chai from "chai";
import {Schemas} from "./schemas/schemas"
chai.use(require("chai-json-schema-ajv"));
const expect = chai.expect;
const baseUrl = "http://ip-5236.sunline.net.ua:30020";
const adminEmail = "test@test.com";
const pass = "123456";
const userEmail = "ivanchuk.viktoria@gmail.com";
const userPass = "Qwerty123";
let sch = new Schemas; 


describe("Set of tests", function() {
    it("Should create a board-list-card", async function() {
        let adminLoginResp = await new Request(`${baseUrl}/users/login`)    //LOG-IN AS ADMIN
            .method('POST')
            .body({email: adminEmail,password: pass})
            .send();
            expect(adminLoginResp.body).to.be.jsonSchema(sch.loginSchema);

        let userLoginResp = await new Request(`${baseUrl}/users/login`)     //LOG-IN AS A USER
            .method('POST')
            .body({email: userEmail,password: userPass})
            .send();
            const userID = await `${userLoginResp.body.id}`;
            expect(userLoginResp.body).to.be.jsonSchema(sch.loginSchema);

        let createBoardResp = await new Request(`${baseUrl}/api/boards`)    //CREATE A BOARD
            .method('POST')
            .headers({Authorization: `Bearer ${adminLoginResp.body.token}`})
            .body({ title: "BoardTitleVI5",owner: userID,permission:"public",color:"pumpkin"})
            .send();
            const boardID = await `${createBoardResp.body._id}`;
            expect(createBoardResp.body).to.be.jsonSchema(sch.boardSchema);
        
        let addSwimlaneResp = await new Request(`${baseUrl}/api/boards/${boardID}/swimlanes`)   //CREATE A SWIMLINE
            .method('POST')
            .headers({Authorization: `Bearer ${adminLoginResp.body.token}`})
            .body({ title: "Swimlane VI"})
            .send();
            const swimID = await `${addSwimlaneResp.body._id}`;
            expect(addSwimlaneResp.body).to.be.jsonSchema(sch.swimSchema);

        let createListsResp = await new Request(`${baseUrl}/api/boards/${boardID}/lists`)       //CREATE A LIST
            .method('POST')
            .headers({Authorization: `Bearer ${adminLoginResp.body.token}`})
            .body({ title: "List VI"})
            .send();
            const listID = await `${createListsResp.body._id}`;
            expect(createListsResp.body).to.be.jsonSchema(sch.listSchema);

        let createCardResp = await new Request(`${baseUrl}/api/boards/${boardID}/lists/${listID}/cards`)    //CREATE A CARD
            .method('POST')
            .headers({Authorization: `Bearer ${adminLoginResp.body.token}`})
            .body({ title: "Card VI", description: "Card description", authorId: userID, swimlaneId: swimID})
            .send();
            console.log("Card created!");
            expect(createCardResp.body).to.be.jsonSchema(sch.cardSchema); 

        let getCardsResp = await new Request(`${baseUrl}/api/boards/${boardID}/swimlanes/${swimID}/cards`)  //GET ALL CARDS
            .method('GET')
            .headers({Authorization: `Bearer ${adminLoginResp.body.token}`})
            .send();
            expect(getCardsResp.body).to.be.jsonSchema(sch.cardsSchema); 

        let getListsResp = await new Request(`${baseUrl}/api/boards/${boardID}/lists`)      //GET ALL LISTS OF BOARD
            .method('GET')
            .headers({Authorization: `Bearer ${adminLoginResp.body.token}`})
            .send();
            expect(getListsResp.body).to.be.jsonSchema(sch.listsSchema); 

        let getBoardsResp = await new Request(`${baseUrl}/api/users/${userID}/boards`)      //GET ALL BOARDS OF USER
            .method('GET')
            .headers({Authorization: `Bearer ${adminLoginResp.body.token}`})
            .send();
            expect(getBoardsResp.body).to.be.jsonSchema(sch.boardsSchema);
    });
})