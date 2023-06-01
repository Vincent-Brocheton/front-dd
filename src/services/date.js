import dayjs from 'dayjs';
import 'dayjs/locale/fr';
dayjs.locale('fr');
export class DateAPI {

    static formatDate(date) {
        return dayjs(date).format('dddd DD MMMM YYYY');
    }
}