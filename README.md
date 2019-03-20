### Scripts: 
- `npm start` || `npm run start` || `gulp build && gulp`
- `npm run dev` || `gulp`
- `npm run deploy` || `gulp deploy`
- `npm run prod` || `gulp build && gulp deploy

### Tools:
| `Gulp` |
| `Jade` |
| `Sass` |

### Start: 
1. `npm install`.
3. Prepare.
    - name project `name` in `./package.json`;
    - demo server url `demoServer` in `./package.json`; 
    - demo server credits `./.env`;
    - style vars `./src/styles/helpers/_variables.scss`.
4. `npm start`.
5. Development...
6. Deploy. 
    - git;
    - demo server `npm run deploy` or `npm run prod`.
