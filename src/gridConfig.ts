import { BryntumGridProps } from '@bryntum/grid-react';

export const gridConfig: BryntumGridProps = {
    filterFeature     : true,
    rowReorderFeature : {
        showGrip : true
    },
    columns : [
        { text : 'Name', field : 'name', flex : 2 },
        { text : 'Age', field : 'age', width : 100, type : 'number', sum : 'average' },
        { text : 'City', field : 'city', flex : 1 },
        { text : 'Food', field : 'food', flex : 1 },
        {
            text  : 'Color',
            field : 'color',
            flex  : 1,
            renderer({
                cellElement,
                value
            }: {
        cellElement: HTMLElement;
        value: string;
      }) {
                // set the color based on the value (e.g. "Red" should be red)
                cellElement.style.color = value;
                return value;
            }
        }
    ],
    store : {
        readUrl  : '/data.json',
        autoLoad : true
    }
};
