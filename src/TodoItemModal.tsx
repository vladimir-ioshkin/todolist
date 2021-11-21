import { Dispatch, SetStateAction, useCallback } from 'react';
import { TodoItem, useTodoItems } from './TodoItemsContext';
import { useForm } from 'react-hook-form';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import { useStyles } from './useModalStyles';
import { FormFields } from './FormFields';

export const TodoItemModal = (
    { editingItem, setEditingItem }: 
    {
        editingItem: TodoItem,
        setEditingItem: Dispatch<SetStateAction<TodoItem | null>>
    }
) => {
    const classes = useStyles();
    const { dispatch } = useTodoItems();
    const { control, handleSubmit } = useForm();
    const handleClose = useCallback(() => setEditingItem(null), [setEditingItem]);

    return (
        <Modal 
            open={true}
            onClose={handleClose}
            className={classes.modal}
        >
            <form
                className={classes.paper}
                onSubmit={handleSubmit((formData) => {
                    const todoItem = {
                        ...formData,
                        id: editingItem.id,
                    };
                    dispatch({ type: 'edit', data: { todoItem } });
                    handleClose();
                })}
            >
                <FormFields
                    control={control}
                    title={editingItem.title}
                    details={editingItem.details ?? ''}
                    tag={editingItem.tag}
                />
                <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                >
                    Edit
                </Button>
            </form>
        </Modal>
        
    );
}
