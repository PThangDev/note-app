import icons from 'src/assets/icons';
import configs from 'src/configs';

const routes = [
  {
    to: configs.routePath.home,
    label: 'Home',
    icon: () => <i className="fa-solid fa-house-user"></i>,
  },
  {
    to: configs.routePath.pins,
    label: 'Pins',
    icon: () => <img src={icons.iconPinnedActive} alt="" />,
  },
  {
    to: configs.routePath.notes,
    label: 'Notes',
    icon: () => <i className="fa-solid fa-book"></i>,
  },
  {
    to: configs.routePath.topics,
    label: 'Topics',
    icon: () => <i className="fa-solid fa-biohazard"></i>,
  },
  {
    to: configs.routePath.profile,
    label: 'Profile',
    icon: () => <i className="fa-solid fa-id-card"></i>,
  },
  {
    to: configs.routePath.trash,
    label: 'Trashs',
    icon: () => <i className="fa-solid fa-trash"></i>,
  },
];
export default routes;
