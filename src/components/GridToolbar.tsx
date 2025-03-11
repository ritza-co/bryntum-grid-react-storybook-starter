import { RefObject, useState } from 'react';
import { ButtonGroup, DomHelper, Store } from '@bryntum/grid';
import { BryntumGrid, BryntumToolbar } from '@bryntum/grid-react';

const THEME_STORAGE_KEY = 'bryntum-theme';

type GridToolbarProps = {
    gridRef: RefObject<BryntumGrid | null>;
    toolbarRef: RefObject<BryntumToolbar | null>;
}

export default function GridToolbar({ gridRef, toolbarRef }: GridToolbarProps) {
    const [count, setCount] = useState(1);
    DomHelper.setTheme(localStorage.getItem(THEME_STORAGE_KEY) || 'stockholm');

    const handleReadOnlyToggle = ({ pressed }: { pressed: boolean }) => {
        const grid = gridRef.current?.instance;
        const toolbar = toolbarRef.current?.instance;
        if (!grid || !toolbar) return;

        const group = toolbar.widgetMap['group'] as ButtonGroup;
        const addButton = group.widgetMap['addButton'];
        const insertButton = group.widgetMap['insertButton'];
        const removeButton = toolbar.widgetMap['removeButton'];

        addButton.disabled = insertButton.disabled = grid.readOnly = pressed;
        removeButton.disabled = pressed || !grid.selectedRecords.length;
    };

    const handleAdd = () => {
        const grid = gridRef.current?.instance;
        if (!grid) return;

        setCount(prevCount => prevCount + 1);
        const store = grid.store as Store;
        const added = store.add({
            name : `New person ${count}`
        });
        grid.selectedRecord = added[0];
    };

    const handleInsert = () => {
        const grid = gridRef.current?.instance;
        if (!grid) return;

        setCount(prevCount => prevCount + 1);
        const store = grid.store as Store;
        const added = store.insert(0, {
            name : `New person ${count}`
        });
        grid.selectedRecord = added[0];
    };

    const handleRemove = () => {
        const grid = gridRef.current?.instance;
        if (!grid) return;

        const selected = grid.selectedRecords;
        if (selected?.length) {
            const store = grid.store as Store;
            const nextRecord = store.getNext(selected[selected.length - 1]);
            const prevRecord = store.getPrev(selected[0]);
            store.remove(selected);
            grid.selectedRecord = nextRecord || prevRecord;
        }
    };

    type EventOnChange = {
        source: unknown;
        value: string | number | boolean;
        oldValue: string | number | boolean;
        valid: boolean;
        event: Event;
        userAction: boolean;
    };

    const handleThemeChange = (event: EventOnChange) => {
        DomHelper.setTheme(`${event.value}`);
        localStorage.setItem(THEME_STORAGE_KEY, `${event.value}`);
    };

    return (
        <BryntumToolbar
            ref={toolbarRef}
            items={[
                {
                    type        : 'button',
                    ref         : 'readOnlyButton',
                    text        : 'Read-only',
                    tooltip     : 'Toggles read-only mode on grid',
                    toggleable  : true,
                    icon        : 'b-fa-square',
                    pressedIcon : 'b-fa-check-square',
                    onToggle    : handleReadOnlyToggle
                },
                {
                    type  : 'buttongroup',
                    ref   : 'group',
                    items : [
                        {
                            type     : 'button',
                            ref      : 'addButton',
                            icon     : 'b-fa-plus-circle',
                            text     : 'Add',
                            tooltip  : 'Adds a new row (at bottom)',
                            onAction : handleAdd
                        },
                        {
                            type     : 'button',
                            ref      : 'insertButton',
                            icon     : 'b-fa-plus-square',
                            text     : 'Insert',
                            tooltip  : 'Inserts a new row (at top)',
                            onAction : handleInsert
                        }
                    ]
                },
                {
                    type     : 'button',
                    ref      : 'removeButton',
                    color    : 'b-red',
                    icon     : 'b-fa b-fa-trash',
                    text     : 'Remove',
                    tooltip  : 'Removes selected record(s)',
                    disabled : true,
                    onAction : handleRemove
                },
                {
                    type  : 'combobox',
                    items : [
                        { value : 'classic-dark', text : 'Classic dark' },
                        { value : 'classic-light', text : 'Classic light' },
                        { value : 'classic', text : 'Classic' },
                        { value : 'material', text : 'Material' },
                        { value : 'stockholm', text : 'Stockholm' }
                    ],
                    placeholder : DomHelper.themeInfo.name,
                    onChange    : handleThemeChange,
                    style       : 'margin-left: auto;',
                    value       : localStorage.getItem(THEME_STORAGE_KEY) || 'stockholm'
                }
            ]}
        />
    );
}