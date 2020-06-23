# CommitLint

*Tipo/Type*|Descrição
---|---
 **ci**:|Muda-se um item de configuração
**chore**:|Qualquer mudança que não afeta ao código em si
**revert**:|Reverte um commit anterior
**fix**|Efetua uma correção de bug no código
**improvement**|Uma melhoria na feature atual
**docs**:|Mudanças apenas na documentação / readme.md
**refactor**:|Refatorar código, sem adicionar uma featura ou bugfix
**build**:|Mudanças que apenas afeta a costrução da aplicação como Babel,webpack, gulp etc..
**perf**:|Mudanças que afetam a performace da aplicação
**test**:|Adiciona ou corrige testes
**style**:|Adiciona ou corrige o estilo

## Exemplo:
```
git commit -m "feat: Add new controller"
```
```
git commit -m "fix: Correct new line in User.js controller"
```
```
git commit -m "docs: Add new description in readme.md"
```
