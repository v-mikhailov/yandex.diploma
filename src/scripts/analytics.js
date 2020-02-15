import '../blocks/analytics/analytics.css';
import Statistics from '../scripts/componets/Statistics';
import DataStorage from '../scripts/modules/DataStorage';
import { getPreviousDate } from './utils/getPreviousDate';

const statistics = new Statistics(document.querySelector('.news__current-news'), { DataStorage }, [ getPreviousDate ]);

statistics.renderStatistics();



// todo функция подсчета слов может возвращать объект с разнными параметрами.