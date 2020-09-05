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
                    response.body.should.be.a("object");
                done();
                })
        });
    });


    describe("POST /regras/cadastro", ()=>{
        it("Deve inserir novo cadastro com dia com o valor 'todos'", (done)=>{
            const ruleTest = {
                day : "todos",
                intervals : [
                    {
                        start: "07:00"
                    },
                    {
                        end: "10:00"
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
                    response.body.should.have.a.property("message").eq("Nova regra adicionada com sucesso!");
                done();
                })
        });

        it("Deve inserir novo cadastro com dia da semana válido", (done)=>{
            const ruleTest = {
                day : "quarta",
                intervals : [
                    {
                        start: "11:00"
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
                    response.body.should.have.a.property("message").eq("Nova regra adicionada com sucesso!");
                done();
                })
        });

        it("Deve inserir novo cadastro com objetos de dias de semana válidos", (done)=>{
            const ruleTest = {
                day : ["segunda", "sexta"],
                intervals : [
                    {
                        start: "18:00"
                    },
                    {
                        end: "20:00"
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
                    response.body.should.have.a.property("message").eq("Nova regra adicionada com sucesso!");
                done();
                })
        });

        it("Deve inserir novo cadastro com data válida", (done)=>{
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
                    response.body.should.have.a.property("message").eq("Nova regra adicionada com sucesso!");
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
                    response.body.should.have.a.property("message").eq("Dia com formato inválido")
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
                    response.body.should.have.a.property("message").eq("Dia com formato inválido")
                done();
                })
        });

        it("Não deve inserir cadastro se houver choque de horário para uma mesma data ou dia da semana", (done)=>{
            const ruleTest = {
                day : "quarta",
                intervals : [
                    {
                        start: "10:00"
                    },
                    {
                        end: "11:00"
                    }
                ]
            }
            chai.request(server)
                .post("/regras/cadastro")
                .send(ruleTest)
                .end((err, response)=>{
                    response.should.be.a("object");
                    response.body.should.have.a.property("status").eq("error");
                    response.body.should.have.a.property("message").eq("Conflito de horários")
                done();
                })
        });
    });

    describe("DELETE /regras/deletar", ()=>{
        it("Deve deletar regra dado dia no formato válido", (done)=>{
            const dayTest = {
                day: "18-10-2022"
            };
            chai.request(server)
                .delete("/regras/deletar")
                .send(dayTest)
                .end((err, response)=>{
                    response.should.have.status(200);
                    response.should.be.a("object");
                    response.body.should.have.a.property("status").eq("success");
                    response.body.should.have.a.property("message").eq("Regra deletada com sucesso!");
                done();
                })
        });

        it("Deve deletar regra dado dia da semana", (done)=>{
            const dayTest = {
                day: "sexta"
            };
            chai.request(server)
                .delete("/regras/deletar")
                .send(dayTest)
                .end((err, response)=>{
                    response.should.have.status(200);
                    response.should.be.a("object");
                    response.body.should.have.a.property("status").eq("success");
                    response.body.should.have.a.property("message").eq("Regra deletada com sucesso!");
                done();
                })
        });

        it("Deve retornar erro se o dia estiver no formato errado", (done)=>{
            const dayTest = {
                day: "50-50-3030"
            };
            chai.request(server)
                .delete("/regras/deletar")
                .send(dayTest)
                .end((err, response)=>{
                    response.should.be.a("object");
                    response.body.should.have.a.property("status").eq("error");
                    response.body.should.have.a.property("message").eq("Dia com formato inválido")
                done();
                });
        });

        it("Deve retornar erro se o dia não for um dia da semana", (done)=>{
            const dayTest = {
                day: "banana"
            };
            chai.request(server)
                .delete("/regras/deletar")  
                .send(dayTest)
                .end((err, response)=>{
                    response.should.be.a("object");
                    response.body.should.have.a.property("status").eq("error");
                    response.body.should.have.a.property("message").eq("Dia com formato inválido")
                done();
                });
        })
    })
});