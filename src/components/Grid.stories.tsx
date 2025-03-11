import type { Meta, StoryObj } from '@storybook/react';
import Grid from './Grid';
import { gridConfig } from '../gridConfig';

const meta = {
    component : Grid,
    title     : 'Grid',
    tags      : ['autodocs'],
    args      : {
        ...gridConfig
    }
} satisfies Meta<typeof Grid>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args : {
        columnLines : true,
        sortFeature : {
            disabled : false
        },
        filterFeature : {
            disabled : false
        },
        summaryFeature : {
            disabled : false
        },
        groupFeature : {
            disabled : false
        },
        rowReorderFeature : {
            showGrip : true,
            disabled : false
        },
        stripeFeature : {
            disabled : true
        },
        rowHeight           : 50,
        animateRemovingRows : true
    }
};

export const CompactGrid: Story = {
    args : {
        ...Default.args,
        rowHeight   : 25,
        columnLines : false
    }
};

export const GroupByCity: Story = {
    args : {
        ...Default.args,
        groupFeature : { field : 'city' }
    }
};

export const DataEmpty: Story = {
    args : {
        ...Default.args,
        store : {
            readUrl  : '/no-data',
            autoLoad : true
        }
    }
};

export const DelayedDataLoading: Story = {
    args : {
        ...Default.args,
        store : {
            readUrl  : '/delay',
            autoLoad : true
        }
    }
};

export const IncorrectReadURL: Story = {
    args : {
        ...Default.args,
        store : {
            readUrl  : '/incorrect-url',
            autoLoad : true
        }
    }
};

export const TreeData: Story = {
    args : {
        ...Default.args,
        treeFeature : true,
        store       : {
            readUrl  : '/tree-data',
            autoLoad : true
        },

        columns : [
            { type : 'tree', field : 'name', text : 'Name', flex : 1 },
            { type : 'number', field : 'born', text : 'Born', flex : 1, format : '0'  }
        ]
    }
};
