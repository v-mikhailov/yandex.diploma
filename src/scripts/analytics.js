import '../blocks/analytics/analytics.css';
import Statistics from '../scripts/componets/Statistics';
import DataStorage from '../scripts/modules/DataStorage';

const dataStorage = new DataStorage();

const statistics = new Statistics(dataStorage);

statistics.renderStatistics();
