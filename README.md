### Scripts: 
- `npm start` || `npm run start` || `gulp build && gulp` - начало работы с предварительной обработкой.
- `npm run dev` || `gulp` - начало работы без предварительного обработки.
- `npm run deploy` || `gulp deploy` - отправка изменений на демо сервер.
- `npm run prod` || `gulp build && gulp deploy` - отправка изменений на демо сервер с предварительной обработкой.

### Tools:
| `Gulp` |
| `Jade` |
| `Sass` |

### Start: 
1. `npm install`.
3. Prepare.
    - name project `name` в файле `./package.json`;
    - demo server url `demoServer` в файле `./package.json`; 
    - demo server credits `./.env`;
    - style vars `./src/styles/helpers/_variables.scss`.
4. `npm start`.
5. Development...
6. Deploy. 
    - git;
    - demo server `npm run deploy` or `npm run prod`.
