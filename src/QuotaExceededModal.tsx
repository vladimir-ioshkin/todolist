import { Dispatch, SetStateAction, useCallback } from 'react';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import Typography from '@material-ui/core/Typography';
import { useStyles } from './useModalStyles';

export const QuotaExceededModal = (
    { isOpen, setIsQuotaExceeded, clearStorage }:
    { 
        isOpen: boolean,
        setIsQuotaExceeded: Dispatch<SetStateAction<boolean>>,
        clearStorage: () => void,
    }
) => {
    const classes = useStyles();
    const handleClear = useCallback(() => {
        clearStorage();
        setIsQuotaExceeded(false);
    }, [setIsQuotaExceeded, clearStorage]);
    const handleClose = useCallback(() => {
        setIsQuotaExceeded(false);
    }, [setIsQuotaExceeded]);

    return (
        <Modal 
            open={isOpen}
            onClose={handleClose}
            className={classes.modal}
        >
            <div className={classes.paper}>
                <Typography component="div">
                    Oops, the storage is full!
                    Would you like to clear it?
                </Typography>
                <div className={classes.controls}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleClear}
                    >
                        Clear
                    </Button>
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={handleClose}
                    >
                        Close
                    </Button>
                </div>
            </div>
        </Modal>
        
    );
}
