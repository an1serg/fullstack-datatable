import Homepage from './pages/Homepage';
import PersonTable from './pages/PersonTable';
import BookTable from './pages/BookTable';

// @mui icons
import Icon from '@mui/material/Icon';

export const routes = [
  {
    type: 'collapse',
    route: '/',
    key: 'home',
    icon: <Icon fontSize='small'>dashboard</Icon>,
    component: <Homepage />,
    name: 'Главная',
  },
  {
    type: 'collapse',
    route: '/persons',
    key: 'person',
    icon: <Icon fontSize='small'>table_view</Icon>,
    component: <PersonTable />,
    name: 'Авторы',
  },
  {
    type: 'collapse',
    route: '/books',
    key: 'book',
    icon: <Icon fontSize='small'>table_view</Icon>,
    component: <BookTable />,
    name: 'Книги',
  },
];
