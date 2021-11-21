import { ChangeEvent, useCallback, useState } from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Checkbox from '@material-ui/core/Checkbox';
import Select from '@material-ui/core/Select';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import DeleteIcon from '@material-ui/icons/Delete';
import { makeStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import { motion } from 'framer-motion';
import { TAGS, Tag, TodoItem, useTodoItems } from './TodoItemsContext';
import { TagChip } from './TagChip';

const spring = {
    type: 'spring',
    damping: 25,
    stiffness: 120,
    duration: 0.25,
};

const useTodoItemListStyles = makeStyles({
    root: {
        marginTop: 16,
    },
    list: {
        listStyle: 'none',
        padding: 0,
    },
    select: {
        margin: 2,
        minWidth: 120,
    },
    chips: {
      display: 'flex',
      flexWrap: 'wrap',
    },
});

export const TodoItemsList = function () {
    const [ tags, setTags ] = useState<string[]>([]);
    const { todoItems } = useTodoItems();

    const classes = useTodoItemListStyles();
    
    const filteredItems = tags.length ?
        todoItems.filter((item) => {
            return tags.includes(item.tag);
        }) :
        todoItems;

    const sortedItems = filteredItems.slice().sort((a, b) => {
        if (a.done && !b.done) {
            return 1;
        }

        if (!a.done && b.done) {
            return -1;
        }

        return 0;
    });

    const handleChange = (event: ChangeEvent<{ value: unknown }>) => {
        setTags(event.target.value as string[]);
    };

    return (
        <div className={classes.root}>
            <FormControl className={classes.select}>
                <InputLabel id="filtered-tags-label">Filter</InputLabel>
                <Select
                    labelId="filtered-tags-label"
                    id="filtered-tags"
                    multiple
                    value={tags}
                    onChange={handleChange}
                    input={<Input id="input-filtered-tags" />}
                    renderValue={(selected) => (
                        <div className={classes.chips}>
                            {(selected as Tag[]).map((tag) => (
                                <TagChip key={tag} tag={tag} />
                            ))}
                        </div>
                    )}
                >
                    {TAGS.map((tag) => (
                        <MenuItem key={tag} value={tag}>
                            <>
                                <Checkbox checked={tags.indexOf(tag) > -1} />
                                <TagChip tag={tag} />
                            </>
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <ul className={classes.list}>
                {sortedItems.map((item) => (
                    <motion.li key={item.id} transition={spring} layout={true}>
                        <TodoItemCard item={item} />
                    </motion.li>
                ))}
            </ul>
        </div>
    );
};

const useTodoItemCardStyles = makeStyles({
    root: {
        marginTop: 24,
        marginBottom: 24,
    },
    doneRoot: {
        textDecoration: 'line-through',
        color: '#888888',
    },
});

export const TodoItemCard = function ({ item }: { item: TodoItem }) {
    const classes = useTodoItemCardStyles();
    const { dispatch } = useTodoItems();

    const handleDelete = useCallback(
        () => dispatch({ type: 'delete', data: { id: item.id } }),
        [item.id, dispatch],
    );

    const handleToggleDone = useCallback(
        () =>
            dispatch({
                type: 'toggleDone',
                data: { id: item.id },
            }),
        [item.id, dispatch],
    );

    return (
        <Card
            className={classnames(classes.root, {
                [classes.doneRoot]: item.done,
            })}
        >
            <CardHeader
                action={
                    <IconButton aria-label="delete" onClick={handleDelete}>
                        <DeleteIcon />
                    </IconButton>
                }
                title={
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={item.done}
                                onChange={handleToggleDone}
                                name={`checked-${item.id}`}
                                color="primary"
                            />
                        }
                        label={
                            <Typography component="div">
                                {item.title}
                                <TagChip tag={item.tag} />
                            </Typography>
                        }
                    />
                }
            />
            {item.details ? (
                <CardContent>
                    <Typography variant="body2" component="p">
                        {item.details}
                    </Typography>
                </CardContent>
            ) : null}
        </Card>
    );
};
