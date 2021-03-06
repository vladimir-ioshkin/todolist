import {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useReducer,
    useState,
    Dispatch,
    SetStateAction,
} from 'react';

export type Tag = 'work' | 'important' | 'home' | 'hobby'| 'other';

export const TAGS: Tag[] = [ 'work', 'important', 'home', 'hobby', 'other' ];

export interface TodoItem {
    id: string;
    title: string;
    details?: string;
    tag: Tag;
    done: boolean;
}

interface TodoItemsState {
    todoItems: TodoItem[];
}

interface TodoItemsAction {
    type: 'loadState' | 'add' | 'edit' | 'delete' | 'toggleDone';
    data: any;
}

const TodoItemsContext = createContext<
    (TodoItemsState & { 
        dispatch: (action: TodoItemsAction) => void, 
        isQuotaExceeded: boolean, 
        setIsQuotaExceeded: Dispatch<SetStateAction<boolean>>,
        clearStorage: () => void, 
    }) | null
>(null);

const defaultState = { todoItems: [] };
const localStorageKey = 'todoListState';

export const TodoItemsContextProvider = ({
    children,
}: {
    children?: ReactNode;
}) => {
    const [isQuotaExceeded, setIsQuotaExceeded] = useState<boolean>(false);
    const [state, dispatch] = useReducer(todoItemsReducer, defaultState);

    useEffect(() => {
        const saveState = () => {
            const savedState = localStorage.getItem(localStorageKey);
    
            if (savedState) {
                try {
                    dispatch({ type: 'loadState', data: JSON.parse(savedState) });
                } catch {}
            }
        };

        saveState();

        window.addEventListener('storage', saveState);

        return () => window.removeEventListener('storage', saveState);
    }, []);

    useEffect(() => {
        try {
            localStorage.setItem(localStorageKey, JSON.stringify(state));
        } catch(error) {
            setIsQuotaExceeded(true);
        }
    }, [state]);

    const clearStorage = () => {
        localStorage.clear();
    };

    return (
        <TodoItemsContext.Provider value={{ 
            ...state, 
            dispatch, 
            isQuotaExceeded, 
            setIsQuotaExceeded, 
            clearStorage,
        }}>
            {children}
        </TodoItemsContext.Provider>
    );
};

export const useTodoItems = () => {
    const todoItemsContext = useContext(TodoItemsContext);

    if (!todoItemsContext) {
        throw new Error(
            'useTodoItems hook should only be used inside TodoItemsContextProvider',
        );
    }

    return todoItemsContext;
};

function todoItemsReducer(state: TodoItemsState, action: TodoItemsAction) {
    switch (action.type) {
        case 'loadState': {
            return action.data;
        }
        case 'add':
            return {
                ...state,
                todoItems: [
                    { id: generateId(), done: false, ...action.data.todoItem },
                    ...state.todoItems,
                ],
            };
        case 'edit':
            const nextTodoItems = state.todoItems.map((item) => {
               if (item.id === action.data.todoItem.id) {
                   return {
                       ...item,
                       ...action.data.todoItem,
                   };
               }
               return item;
            });
            return {
                ...state,
                todoItems: nextTodoItems,
            };
        case 'delete':
            return {
                ...state,
                todoItems: state.todoItems.filter(
                    ({ id }) => id !== action.data.id,
                ),
            };
        case 'toggleDone':
            const itemIndex = state.todoItems.findIndex(
                ({ id }) => id === action.data.id,
            );
            const item = state.todoItems[itemIndex];

            return {
                ...state,
                todoItems: [
                    ...state.todoItems.slice(0, itemIndex),
                    { ...item, done: !item.done },
                    ...state.todoItems.slice(itemIndex + 1),
                ],
            };
        default:
            throw new Error();
    }
}

function generateId() {
    return `${Date.now().toString(36)}-${Math.floor(
        Math.random() * 1e16,
    ).toString(36)}`;
}
