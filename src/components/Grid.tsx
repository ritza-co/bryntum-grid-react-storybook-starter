import { Grid } from '@bryntum/grid';
import { BryntumGrid, BryntumGridProps } from '@bryntum/grid-react';
import { useEffect, useRef, useState } from 'react';
import '@bryntum/grid/grid.stockholm.css';

export default function GridComponent(gridProps: BryntumGridProps) {
    const gridRef = useRef<BryntumGrid>(null);
    const [grid, setGrid] = useState<Grid>();

    useEffect(() => {
        setGrid(gridRef.current!.instance);
    }, [grid, gridRef]);

    return (
        <BryntumGrid
            ref={gridRef}
            {...gridProps}
        />
    );
}