import icons from 'src/assets/icons';

const routes = [
  {
    to: '/',
    label: 'Home',
    icon: () => <i className="fa-solid fa-house-user"></i>,
  },
  {
    to: '/pins',
    label: 'Pins',
    icon: () => <img src={icons.iconPinnedActive} alt="" />,
  },
  {
    to: '/notes',
    label: 'Notes',
    icon: () => <i className="fa-solid fa-book"></i>,
  },
  {
    to: '/topics',
    label: 'Topics',
    icon: () => <i className="fa-solid fa-biohazard"></i>,
  },
  {
    to: '/profile',
    label: 'Profile',
    icon: () => <i className="fa-solid fa-id-card"></i>,
  },
  {
    to: '/trashs',
    label: 'Trashs',
    icon: () => <i className="fa-solid fa-trash"></i>,
  },
];
export default routes;
