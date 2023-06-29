import { Platform } from 'react-native';
import FerretSvgComponent from '../SVG/FerretSvgComponent';
import GuineaPigSvgComponent from '../SVG/GuineaPigSvgComponent';
const isPhone = Platform.OS === 'ios' || Platform.OS === 'android';
import { translate } from '../../assets/i18n/Language';

export const ProductCategories = [
    { name: translate('categoryProduct.cat'), icon: 'cat' },
    { name: translate('categoryProduct.dog'), icon: 'dog' },
    { name: translate('categoryProduct.bird'), icon: 'bird' },
    { name: translate('categoryProduct.bunnie'), icon: 'rabbit' },
    { name: translate('categoryProduct.hamster'), icon: 'rodent' },
    { name: translate('categoryProduct.fish'), icon: 'fish' },
    { name: translate('categoryProduct.guinea_pig'), icon: <GuineaPigSvgComponent size={isPhone ? 90 : 90} /> },
    { name: translate('categoryProduct.ferret'), icon: <FerretSvgComponent size={isPhone ? 110 : 110} /> },
];
