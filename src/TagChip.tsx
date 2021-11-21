import classnames from 'classnames';
import Chip from '@material-ui/core/Chip';
import { makeStyles } from '@material-ui/core';
import { Tag } from './TodoItemsContext';

const useTagChipStyles = makeStyles({
    root: {
        marginTop: 2,
        marginBottom: 2,
        marginLeft: 6,
        marginRight: 6,
    },
    work: {
        backgroundColor: '#9b90c8',
    },
    important: {
        backgroundColor: '#ffeb99',
    },
    home: {
        backgroundColor: '#9eccb3',
    },
    hobby: {
        backgroundColor: '#83b5dd',
    },
    other: {
        backgroundColor: '#aab1b0',
    },
});

export const TagChip = ({ tag }: { tag: Tag }) => {
    const classes = useTagChipStyles();

    return (
        <Chip
            label={tag} 
            className={classnames(classes.root, {
                [classes.work]: tag === 'work',
                [classes.important]: tag === 'important',
                [classes.home]: tag === 'home',
                [classes.hobby]: tag === 'hobby',
                [classes.other]: tag === 'other',
            })}
        />
    );
};
