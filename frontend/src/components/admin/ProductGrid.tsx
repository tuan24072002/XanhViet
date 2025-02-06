import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { changeAction, resetState, selectItemProduct } from "@/slice/app.slice";
import JqxGrid, { IGridColumn, jqx } from "jqwidgets-scripts/jqwidgets-react-tsx/jqxgrid";
import { RefObject, useEffect, useState } from "react";
type ProductGridProps = {
    gridRef: RefObject<JqxGrid>,
    setIsOpenDialog: (e: boolean) => void,
}

const ProductGrid = ({ gridRef, setIsOpenDialog }: ProductGridProps) => {
    const dispatch = useAppDispatch();
    const appState = useAppSelector(state => state.app);
    const [productSource, setProductSource] = useState<any>({
        datafields: [
            { name: 'index', type: 'number' },
            { name: '_id', type: 'string' },
            { name: 'name', type: 'string' },
            { name: 'description', type: 'string' },
            { name: 'price', type: 'string' },
            { name: 'imageSrc', type: 'string' },
        ],
        dataType: 'array',
        localData: appState.listProduct.map((product, index) => ({
            ...product,
            index: index + 1
        }))
    })
    const [columnData, setColumnData] = useState<IGridColumn[]>([
        {
            text: 'STT', datafield: 'index', width: '3%', cellsalign: 'center', align: 'center'
        },
        {
            text: 'Tên sản phẩm', datafield: 'name', width: '20%'
        },
        {
            text: 'Mô tả', datafield: 'description', width: 'auto'
        },
        {
            text: 'Giá', datafield: 'price', width: '20%',
            cellsrenderer: (
                _row?: number,
                _columnfield?: string,
                value?: any,
            ) => {
                return `<p class="text-red-500 font-semibold h-full flex items-center justify-center">${value}</p>`;
            },
        },
        {
            text: "Hình ảnh",
            datafield: "imageSrc",
            width: 120,
            cellsrenderer: (
                _row?: number,
                _columnfield?: string,
                value?: any,
            ) => {
                return `<div class="h-full w-full flex items-center justify-center">
                                <img src="${value}" alt="Product Image" class="w-full h-full object-contain" />
                            </div>`;
            },
        },
        {
            datafield: 'action',
            text: '',
            width: '80px',
            cellsrenderer: (row: any) => {
                return `
            <div style="display: flex; justify-content: center; align-items: center; gap: 5px; height: 100%;">
                <button class="update-btn bg-blue-500 p-2 text-white flex items-center justify-center rounded-md" data-row="${row}">
                    <i class='bx bxs-edit'></i>
                </button>
                <button class="delete-btn bg-red-500 p-2 text-white flex items-center justify-center rounded-md" data-row="${row}">
                    <i class='bx bx-trash'></i>
                </button>
            </div>`;
            },
        }
    ]);
    const handleButtonClick = (event: any) => {
        const button = event.target.closest('button');
        if (!button) return;
        const isUpdateBtn = button.classList.contains('update-btn');
        const isDeleteBtn = button.classList.contains('delete-btn');
        const selection = gridRef.current?.getrowdata(gridRef.current?.getselectedrowindex());
        if (!selection || selection.length === 0) {
            console.warn('No selection made');
            return;
        }
        if (isUpdateBtn) {
            dispatch(changeAction('UPD'));
            dispatch(selectItemProduct(selection));
            setIsOpenDialog(true);
        } else if (isDeleteBtn) {
            dispatch(changeAction('DEL'));
            dispatch(selectItemProduct(selection));
            setIsOpenDialog(true);
            console.log(selection);
        } else {
            return;
        }

    };
    const handleDoubleClick = () => {
        const selection = gridRef.current?.getrowdata(gridRef.current?.getselectedrowindex());
        if (!selection || selection.length === 0) {
            console.warn('No selection made');
            return;
        }
        dispatch(changeAction('UPD'));
        dispatch(selectItemProduct(selection));
        setIsOpenDialog(true);
    }
    useEffect(() => {
        setColumnData([
            {
                text: 'STT', datafield: 'index', width: '3%', cellsalign: 'center', align: 'center'
            },
            {
                text: 'Tên sản phẩm', datafield: 'name', width: '20%'
            },
            {
                text: 'Mô tả', datafield: 'description', width: 'auto'
            },
            {
                text: 'Giá', datafield: 'price', width: '20%',
                cellsrenderer: (
                    _row?: number,
                    _columnfield?: string,
                    value?: any,
                ) => {
                    return `<p class="text-red-500 font-semibold h-full flex items-center justify-center">${value}</p>`;
                },
            },
            {
                text: "Hình ảnh",
                datafield: "imageSrc",
                width: 120,
                cellsrenderer: (
                    _row?: number,
                    _columnfield?: string,
                    value?: any,
                ) => {
                    return `<div class="h-full w-full flex items-center justify-center">
                                <img src="${value}" alt="Product Image" class="w-full h-full object-contain" />
                            </div>`;
                },
            },
            {
                datafield: 'action',
                text: '',
                width: '80px',
                cellsrenderer: (row: any) => {
                    return `
            <div style="display: flex; justify-content: center; align-items: center; gap: 5px; height: 100%;">
                <button class="update-btn bg-blue-500 p-2 text-white flex items-center justify-center rounded-md" data-row="${row}">
                    <i class='bx bxs-edit'></i>
                </button>
                <button class="delete-btn bg-red-500 p-2 text-white flex items-center justify-center rounded-md" data-row="${row}">
                    <i class='bx bx-trash'></i>
                </button>
            </div>`;
                },
            }
        ]);
    }, []);
    useEffect(() => {
        if (appState.status) {
            switch (appState.status) {
                case 'completed':
                    setProductSource(appState.listProduct)
                    dispatch(resetState())
                    break;
            }
        }
    }, [appState.status])
    useEffect(() => {
        if (appState.status) {
            switch (appState.status) {
                case 'completed':
                    productSource.localData = appState.listProduct.map((product, index) => ({
                        ...product,
                        index: index + 1
                    }))
                    setProductSource(productSource)
                    break;
            }
        }
    }, [appState.status])
    return (
        <>
            <div className="h-[calc(100vh-250px)] w-full relative py-4 px-2" onClick={handleButtonClick}>
                <JqxGrid
                    ref={gridRef}
                    width={'calc(100%-1px)'}
                    height={'100%'}
                    source={new jqx.dataAdapter(productSource)}
                    columns={columnData}
                    pageable={false}
                    sortable={true}
                    altrows={true}
                    selectionmode={'singlerow'}
                    showgroupsheader={false}
                    style={{ zIndex: '0' }}
                    onRowdoubleclick={handleDoubleClick}
                    filterable={true}
                    showfilterrow={true}
                    autofill
                    rowsheight={50}
                />
            </div>
        </>
    )
}

export default ProductGrid