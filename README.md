**API para controle de dias e horários de atendimento**
----
  Essa api retorna, cadastra e deleta regras para horários e dia de atendimento de uma clínica, por meio de arquivos JSON.

* **METHOD/URL**

    `GET /regras` - Retorna todas as regras cadastradas.
    
    ```
      {
         "geral": [< regra para todos os dias >],
         "semanal" : [<regras definidas para dias da semana, ex.: "segunda">],
         "diario":[<regras definidas para datas específicas, ex.: "15-10-2020">]
      }
    ```
    
    `POST /regras/cadastro/` - Recebe um JSON definindo uma nova regra.
    
    ```
      {
         "dia": "<string: "DD-MM-YYYY"" ou <string: dia_da_semana> ou [<array_de_dias_de_semana],
         "intervals" : [{start : "hh:mm"}, {end : "hh:mm"}]
      }
    ```
    
    `DELETE /regras/deletar` - Recebe um JSON com atributo "day" que tem como valor uma string representando uma data no formato "DD-MM-YYYY" ou uma string informando o dia da semana e deleta a regra correspondente.
    
    ```
      {
         "dia": "<string: "DD-MM-YYYY"" ou <string: dia_da_semana>"
      }
    ```
    
    `GET /horarios` - Exibe as regras de acordo com o intervalo definido na no objeto JSON. Obs.: Essa rota só está validando as regras cadastradas como "diário"
    
    ```
      {
         "start_day": "<string: "DD-MM-YYYY">,
         "end_day": "<string: "DD-MM-YYYY">
      }
    ```
    

* **Resposta de sucesso:**
  
  Os objetos de sucesso terão a seguinte forma:

  ```
     {
        "status": "success",
        "message" : <mensagem indicando sucesso da rotina>
     }
   ```
 
* **Resposta de erro:**

  Em caso de erro serão exibidos objetos com a estrutura abaixo:

  ```
     {
        "status": "error",
        "message" : <mensagem indicando o erro propagado>
     }
   ```



* **Notes:**

Os arquivos do postman se encontram na pasta "postman" no projeto.

Os testes unitários se encontram na pasta "test"




