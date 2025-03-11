import { delay, http, HttpResponse } from 'msw';
import { data } from '../gridData';
import { treeData } from '../gridTreeData';

export const handlers = [
    http.get('/data.json', async() => {
        return HttpResponse.json({
            success : true,
            data    : data
        });
    }),

    http.get('/delay', async() => {
        await delay(5000);
        return HttpResponse.json({
            success : true,
            data    : data
        });
    }),

    http.get('/no-data', async() => {
        return HttpResponse.json({
            success : true,
            data    : []
        });
    }),

    http.get('/incorrect-url', () => {
        console.log('msw');
        return new HttpResponse(null, { status : 404 });
    }),

    http.get('/tree-data', async() => {
        return HttpResponse.json({
            success : true,
            data    : treeData
        });
    })
];