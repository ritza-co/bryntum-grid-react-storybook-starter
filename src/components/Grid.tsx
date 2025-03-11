import { useRef } from 'react';
import { Model } from '@bryntum/grid';
import { BryntumGrid, BryntumGridProps, BryntumToolbar } from '@bryntum/grid-react';
import GridToolbar from './GridToolbar';

/**
 * Example Bryntum Grid component showcasing various features including:
 * - Sorting
 * - Filtering
 * - Grouping
 * - Row reordering
 * - Theme switching
 * - Data loading
 * - Tree data
 */

export default function GridComponent(gridProps: BryntumGridProps) {
    const gridRef    = useRef<BryntumGrid>(null);
    const toolbarRef = useRef<BryntumToolbar>(null);

    const handleSelectionChange =
        ({ selection }: { selection: Model[] }) => {
            const removeButton = toolbarRef.current?.instance.widgetMap['removeButton'];
            const grid = gridRef.current?.instance;
            if (!removeButton || !grid) return;
            if (selection?.length && !grid?.readOnly) {
                removeButton.enable();
            }
            else {
                removeButton.disable();
            }
        };

    return (
        <div className="bryntum-grid-container">
            <GridToolbar
                gridRef={gridRef}
                toolbarRef={toolbarRef}
            />
            <BryntumGrid
                ref={gridRef}
                onSelectionChange={handleSelectionChange}
                {...gridProps}
            />
        </div>
    );
}