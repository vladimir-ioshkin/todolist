import { Dispatch, SetStateAction, useCallback } from 'react';
import { TodoItem, useTodoItems } from './TodoItemsContext';
import { useForm } from 'react-hook-form';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { FormFields } from './FormFields';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  }),
);

export const TodoItemModal = (
    { editingItem, setEditingItem }: 
    {
        editingItem: TodoItem,
        setEditingItem: Dispatch<SetStateAction<TodoItem | null>>
    }
) => {
    const classes = useStyles();
    const { dispatch } = useTodoItems();
    const { control, handleSubmit, watch } = useForm();
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
                    disabled={!watch('title')}
                >
                    Edit
                </Button>
            </form>
        </Modal>
        
    );
}
