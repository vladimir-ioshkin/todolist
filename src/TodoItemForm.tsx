import { useTodoItems } from './TodoItemsContext';
import { useForm, Controller } from 'react-hook-form';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';
import { TagChip } from './TagChip';
import { TAGS } from './TodoItemsContext';

const useInputStyles = makeStyles(() => ({
    root: {
        marginBottom: 24,
    },
}));

export default function TodoItemForm() {
    const classes = useInputStyles();
    const { dispatch } = useTodoItems();
    const { control, handleSubmit, reset, watch } = useForm();

    return (
        <form
            onSubmit={handleSubmit((formData) => {
                dispatch({ type: 'add', data: { todoItem: formData } });
                reset({ title: '', details: '', tag: TAGS[0] });
            })}
        >
            <Controller
                name="title"
                control={control}
                defaultValue=""
                rules={{ required: true }}
                render={({ field }) => (
                    <TextField
                        {...field}
                        label="TODO"
                        fullWidth={true}
                        className={classes.root}
                    />
                )}
            />
            <Controller
                name="details"
                control={control}
                defaultValue=""
                render={({ field }) => (
                    <TextField
                        {...field}
                        label="Details"
                        fullWidth={true}
                        multiline={true}
                        className={classes.root}
                    />
                )}
            />
            <Controller
                name="tag"
                control={control}
                defaultValue={TAGS[0]}
                render={({ field }) => (
                    <>
                        <InputLabel id="tag-label">Tag</InputLabel>
                        <Select 
                            {...field}
                            labelId="tag-label"
                            fullWidth={true}
                            className={classes.root}
                        >
                            {TAGS.map((tag) => (
                                <MenuItem key={tag} value={tag}>
                                    <TagChip tag={tag} />
                                </MenuItem>
                            ))}
                        </Select>
                    </>
                )}
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
