import express, { Express, Router, Request, Response } from 'express'
import axios from 'axios'
import { parse } from '@babel/parser';
import traverse from '@babel/traverse';

export function getFunctionNode() {
    const code = `
	app.use('*', (req, res, next) => {
		res.header('Access-Control-Allow-Origin', '*')
		next()
	})`;

    let functionNode;
    const ast = parse(code);
    traverse(ast, {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        FunctionDeclaration(path) {
            functionNode = path.node;
        }
    });

    return functionNode;
}

const app: Express = express()
app.use('*', (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    next()
})
const router: Router = express.Router()

app.use('/api', router)

router.get('/list', async (req: Request, res: Response) => {
    const result = await axios.post('https://api.inews.qq.com/newsqa/v1/query/inner/publish/modules/list?modules=statisGradeCityDetail,diseaseh5Shelf')
    res.json({
        ...result.data.data
    })
})

app.listen(6006, () => {
    console.log('seccess server http://localhost:6006')
    const code = `
	app.use('*', (req, res, next) => {
		res.header('Access-Control-Allow-Origin', '*')
		next()
	})`;

    let functionNode;
    const ast = parse(code);
    traverse(ast, {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        FunctionDeclaration(path) {
            console.log(path.node);
        }
    });
})