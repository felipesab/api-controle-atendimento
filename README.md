**API para controle de dias e horários de atendimento**
----
  Essa api retorna/cadastra/deleta regras de horários e dias de atendimento de uma clínica, por meio de arquivos JSON e parametros de URL.

* **METHOD/URL**

    `GET /regras` - Retorna todas as regras cadastradas.
    
    `POST /regras/cadastro/` - Recebe um objeto definindo uma nova regra.
    ```
      {
         "dia": "DD-MM-YYYY" ou <string: dia_da_semana> ou [<objetos_de_dias_de_semana],
         "intervals" : [{start : "hh:mm"}, {end : "hh:mm"}]
      }
    ```
    
    `DELETE /regras/deletar/<dia>` - Recebe uma string no formato "DD-MM-YYYY" ou uma string informando o dia da semana e deleta a regra correspondente.
    
    `GET /horarios/<dia inicial>/<dia final>` - Exibe as regras de acordo com o intervalo definido na URL. **
    

* **Resposta de sucesso:**
  
  Os objetos de sucesso terão a seguinte forma:

  * **status:** success <br />
    **message:** <mensagem indicando que a rotina obteve êxito>
 
* **Resposta de erro:**

  Em caso de erro serão exibidos objetos com a estrutura abaixo:

  * **status:** error <br />
    **message:** <mensagem indicando o erro ocorrido>



* **Notes:**

Bom, esse é o meu projeto! Consegui implementar muito do que foi proposto, faltou algumas coisas aqui e ali, mas particulamente estou satisfeito com o que fiz
apesar da minha pouca experiencia com a stack.

O método GET /horarios não está 100%, dei uma mascarada nele ( xDDDD ), os dados que alimentam esse método não são do JSON principal, são de um JSON mais simples que só guarda
regras com o dia no formato "DD-MM-YYYY". Esse com certeza foi o método que tive mais dificuldade, muitas regrinhas!

Os arquivos do postman se encontram na pasta "postman" no projeto.




