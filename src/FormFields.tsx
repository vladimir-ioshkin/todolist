import { Controller, Control } from 'react-hook-form';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';
import { TagChip } from './TagChip';
import { TAGS, Tag } from './TodoItemsContext';

const useInputStyles = makeStyles(() => ({
    root: {
        marginBottom: 24,
    },
}));

export const FormFields = ({ control, title, details, tag }:
{ 
    control: Control,
    title: string,
    details: string,
    tag: Tag,
}) => {
    const classes = useInputStyles();

    return (
        <>
            <Controller
                name="title"
                control={control}
                defaultValue={title}
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
                defaultValue={details}
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
                defaultValue={tag}
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
        </>
    );
}
