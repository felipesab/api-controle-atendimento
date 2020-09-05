const moment = require("moment");
const fs = require("fs").promises;



function validateDay(day) {
    const dias = ["domingo", "segunda", "terca", "quarta", "quinta", "sexta", "sabado", "todos"]
    const index = dias.indexOf(day);
    const validMoment = moment(day, "DD-MM-YYYY").isValid()
  
    if (index == -1 && !validMoment)
      throw new Error("Dia com formato inválido");
};


function dayValidatorController(day) {
  try {
    if (day == undefined)
      throw new Error("É necessário enviar uma regra para cadastro.");

    if (typeof (day) == "object") {
      for (x in day)
        validateDay(day[x]);
    }
    else
      validateDay(day);

    return true;
  }
  catch (err) {
    throw err;
  }
};

function deleteRule(rulesFile, ruleGroup, day, group){
  try{
    let deleted = false;
    const path = "./regras/regras.json"
  
    for(i in ruleGroup){
      if(ruleGroup[i].day == day){
        ruleGroup.splice(i, 1);
        deleted = true;
      }
    }
  
    if(!deleted)
      throw new Error("Não foi encontrado regra para esse dia");
  
    if (group == "geral") 
      rulesFile.geral = ruleGroup;
    else if (group == "semanal") 
      rulesFile.semanal = ruleGroup;
    else 
      rulesFilediario = ruleGroup;
  
    fs.writeFile(path, JSON.stringify(rulesFile));
  }
  catch(err) {throw err}

}


function deleteController(rulesFile, day) {
  try{
    if(day == "todos")
      deleteRule(rulesFile, rulesFile.geral, day, "geral");
    else if(moment(day, "DD-MM-YYY").isValid())
      deleteRule(rulesFile, rulesFile.diario, day, "diario");
    else
      deleteRule(rulesFile, rulesFile.semanal, day, "semanal")
  }
  catch(err) {throw err};
};



function searchRule(rulesFile, newRule) {
  try {
    const day = newRule.day;

    if (rulesFile.geral.length > 0) {
      for (obj of rulesFile.geral) {
        checkSchedule(obj, newRule);
      }
      if(day == "todos"){
        insertRule(rulesFile, rulesFile.geral, newRule, "geral")
        return;
      }
    }
    if(day == "todos"){
      insertRule(rulesFile, rulesFile.geral, newRule, "geral");
      return;
    }

    if(moment(day, "DD-MM-YYYY").isValid()){
      if(rulesFile.diario.length > 0){
        for(obj of rulesFile.diario){
          checkSchedule(obj, newRule);
        }
        insertRule(rulesFile, rulesFile.diario, newRule, "diario");
      }
      else{
        insertRule(rulesFile, rulesFile.diario, newRule,"diario");
      }
    }
    else{
      if(rulesFile.semanal.length > 0){
        for (obj of rulesFile.semanal) {
          checkSchedule(obj, newRule);
        }
        insertRule(rulesFile, rulesFile.semanal, newRule, "semanal");
      }
      else
        insertRule(rulesFile, rulesFile.semanal, newRule, "semanal");
    }

  }
  catch(err){
    throw err;
  }
};

function checkSchedule(rule, NewRule) {
  const ruleEnd = moment(rule.intervals[1].end, "HH:mm");
  const ruleStart = moment(rule.intervals[0].start, "HH:mm");
  const startt = moment(NewRule.intervals[0].start, "HH:mm");
  const endd = moment(NewRule.intervals[1].end, "HH:mm");

  if (rule.day == NewRule.day|| rule.day == 'todos') {
    if ((ruleStart <= endd && ruleStart >= startt) || (ruleEnd >= startt && ruleEnd <= endd) ||
                (ruleStart <= startt && ruleEnd >= startt) ||((ruleStart <= endd && ruleEnd >= endd))) {
      throw new Error("Conflito de horários");
    }
  }

};


function cadastroController(rulesFile, ruleObject) {
  try {
    if (typeof (ruleObject.day) == "object") {
      for (dia of ruleObject.day) {
        const newRule = {
          day: dia,
          intervals: [{ start: ruleObject.intervals[0].start }, { end: ruleObject.intervals[1].end }]
        }
        newRule.day = dia,
        searchRule(rulesFile, newRule);
      }
    }
    else 
      searchRule(rulesFile, ruleObject);
  }
  catch (err) {
    throw err;
  }
};


function insertRule(rulesFile, rulesGroup, newRule, group) {
  try {
    rulesGroup.push(newRule);
    const path = "./regras/regras.json"

    if (group == "geral") {
      rulesFile.geral = rulesGroup;
    }
    else if (group == "semanal") {
      rulesFile.semanal = rulesGroup;
    }
    else {
      rulesFilediario = rulesGroup;
    }

    fs.writeFile(path, JSON.stringify(rulesFile));
  }
  catch (err) {
    throw new Error("Falha ao tentar inserir regra.");
  }


};

module.exports = { cadastroController, dayValidatorController, insertRule, searchRule, checkSchedule, validateDay, deleteController };


