import { TAGS, useTodoItems } from './TodoItemsContext';
import { useForm } from 'react-hook-form';
import Button from '@material-ui/core/Button';
import { FormFields } from './FormFields';

export default function TodoItemForm() {
    const { dispatch } = useTodoItems();
    const { control, handleSubmit, reset, watch } = useForm();

    return (
        <form
            onSubmit={handleSubmit((formData) => {
                dispatch({ type: 'add', data: { todoItem: formData } });
                reset({ title: '', details: '', tag: TAGS[0] });
            })}
        >
            <FormFields
                control={control}
                title=""
                details=""
                tag={TAGS[0]}    
            />
            <Button
                variant="contained"
                color="primary"
                type="submit"
                disabled={!watch('title')}
            >
                Add
            </Button>
        </form>
    );
}
