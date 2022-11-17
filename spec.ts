import { parse } from '@babel/parser';
import traverse from '@babel/traverse';

const code = `
app.use('*', (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    next()
})`;

const ast = parse(code);
traverse(ast, {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    FunctionDeclaration(path) {
        console.log(path.node);
    }
});