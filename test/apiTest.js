const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../server");

chai.should();

chai.use(chaiHttp);

describe("Suíte de testes para a API", ()=>{
    describe("GET /regras", ()=>{
        it("Deve retornar todas as regras", (done)=>{
            chai.request(server)
                .get("/regras")
                .end((err, response) =>{
                    response.should.have.status(200);
                    response.body.should.be.a("array");
                done();
                })
        });
    });

    describe("POST /regras/cadastro", ()=>{
        it("Deve inserir novo cadastro", (done)=>{
            const ruleTest = {
                day : "18-10-2022",
                intervals : [
                    {
                        start: "12:00"
                    },
                    {
                        end: "15:00"
                    }
                ]
            }
            chai.request(server)
                .post("/regras/cadastro")
                .send(ruleTest)
                .end((err, response)=>{
                    response.should.have.status(200);
                    response.should.be.a("object");
                    response.body.should.have.a.property("status").eq("success");
                done();
                })
        });

        it("Não deve inserir cadastro se a data estiver em formato errado", (done)=>{
            const ruleTest = {
                day : "12-25-2022",
                intervals : [
                    {
                        start: "12:00"
                    },
                    {
                        end: "15:00"
                    }
                ]
            }
            chai.request(server)
                .post("/regras/cadastro")
                .send(ruleTest)
                .end((err, response)=>{
                    response.should.be.a("object");
                    response.body.should.have.a.property("status").eq("error");
                    response.body.should.have.a.property("message").eq("Invalid day format")
                done();
                })
        });

        it("Não deve inserir cadastro se a data não for um dia da semana", (done)=>{
            const ruleTest = {
                day : "banana",
                intervals : [
                    {
                        start: "12:00"
                    },
                    {
                        end: "15:00"
                    }
                ]
            }
            chai.request(server)
                .post("/regras/cadastro")
                .send(ruleTest)
                .end((err, response)=>{
                    response.should.be.a("object");
                    response.body.should.have.a.property("status").eq("error");
                    response.body.should.have.a.property("message").eq("Invalid day format")
                done();
                })
        });
    });

    describe("DELETE /regras/deletar/:day", ()=>{
        it("Deve deletar regra dado dia", (done)=>{
            const dayTest = "01-01-2020";
            chai.request(server)
                .delete("/regras/deletar/" + dayTest)
                .end((err, response)=>{
                    response.should.have.status(200);
                    response.should.be.a("object");
                    response.body.should.have.a.property("status").eq("success");
                done();
                })
        });

        it("Deve deletar regra dado dia da semana", (done)=>{
            const dayTest = "quinta";
            chai.request(server)
                .delete("/regras/deletar/" + dayTest)
                .end((err, response)=>{
                    response.should.have.status(200);
                    response.should.be.a("object");
                    response.body.should.have.a.property("status").eq("success");
                done();
                })
        });

        it("Deve retornar erro se o dia estiver no formato errado", (done)=>{
            const dayTest = "2020-15-10";
            chai.request(server)
                .delete("/regras/deletar/" + dayTest)
                .end((err, response)=>{
                    response.should.be.a("object");
                    response.body.should.have.a.property("status").eq("error");
                    response.body.should.have.a.property("message").eq("Invalid day format")
                done();
                });
        });

        it("Deve retornar erro se o dia não for um dia da semana", (done)=>{
            const dayTest = "banana";
            chai.request(server)
                .delete("/regras/deletar/" + dayTest)
                .end((err, response)=>{
                    response.should.be.a("object");
                    response.body.should.have.a.property("status").eq("error");
                    response.body.should.have.a.property("message").eq("Invalid day format")
                done();
                });
        })
    })
});