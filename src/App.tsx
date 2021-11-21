import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { TodoItemsList } from './TodoItems';
import { TodoItemsContextProvider, useTodoItems } from './TodoItemsContext';
import TodoItemForm from './TodoItemForm';
import { QuotaExceededModal } from './QuotaExceededModal';

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#9012fe',
        },
        secondary: {
            main: '#b2aabf',
        },
    },
});

function App() {
    return (
        <TodoItemsContextProvider>
            <ThemeProvider theme={theme}>
                <Content />
            </ThemeProvider>
        </TodoItemsContextProvider>
    );
}

function Content() {
    const { isQuotaExceeded, setIsQuotaExceeded, clearStorage } = useTodoItems();
    
    return (
        <Container maxWidth="sm">
            <header>
                <Typography variant="h2" component="h1">
                    Todo List
                </Typography>
            </header>
            <main>
                <TodoItemForm />
                <TodoItemsList />
                <QuotaExceededModal
                    isOpen={isQuotaExceeded}
                    setIsQuotaExceeded={setIsQuotaExceeded}
                    clearStorage={clearStorage}
                />
            </main>
        </Container>
    );
}

export default App;
