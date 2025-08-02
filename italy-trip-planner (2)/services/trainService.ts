import { TrainTime } from '../types';

const allTrains: { [key: string]: TrainTime[] } = {
  "Rome-Florence": [
    { trainNumber: "FR 9400", trainType: "Frecciarossa", departureTime: "08:50", arrivalTime: "10:27", duration: "1h 37m", price: 59.90 },
    { trainNumber: "IT 8962", trainType: "Italo", departureTime: "09:15", arrivalTime: "10:50", duration: "1h 35m", price: 55.90 },
    { trainNumber: "FR 9404", trainType: "Frecciarossa", departureTime: "09:50", arrivalTime: "11:27", duration: "1h 37m", price: 59.90 },
    { trainNumber: "RG 4132", trainType: "Regionale", departureTime: "10:22", arrivalTime: "14:06", duration: "3h 44m", price: 22.10 },
  ],
  "Florence-Rome": [
    { trainNumber: "FR 9411", trainType: "Frecciarossa", departureTime: "10:33", arrivalTime: "12:10", duration: "1h 37m", price: 59.90 },
    { trainNumber: "IT 8973", trainType: "Italo", departureTime: "11:05", arrivalTime: "12:40", duration: "1h 35m", price: 55.90 },
    { trainNumber: "FR 9415", trainType: "Frecciarossa", departureTime: "11:33", arrivalTime: "13:10", duration: "1h 37m", price: 59.90 },
  ],
  "Florence-Pisa": [
    { trainNumber: "RG 4016", trainType: "Regionale", departureTime: "08:28", arrivalTime: "09:28", duration: "1h 00m", price: 8.90 },
    { trainNumber: "RG 4020", trainType: "Regionale", departureTime: "09:28", arrivalTime: "10:28", duration: "1h 00m", price: 8.90 },
    { trainNumber: "RG 18320", trainType: "Regionale", departureTime: "10:00", arrivalTime: "11:21", duration: "1h 21m", price: 8.90 },
  ],
  "Pisa-Florence": [
    { trainNumber: "RG 4017", trainType: "Regionale", departureTime: "09:32", arrivalTime: "10:32", duration: "1h 00m", price: 8.90 },
    { trainNumber: "RG 4021", trainType: "Regionale", departureTime: "10:32", arrivalTime: "11:32", duration: "1h 00m", price: 8.90 },
  ],
   "Rome-Pisa": [
    { trainNumber: "FR 9560", trainType: "Frecciarossa", departureTime: "08:57", arrivalTime: "11:43", duration: "2h 46m", price: 45.50 },
    { trainNumber: "IC 510", trainType: "Intercity", departureTime: "09:57", arrivalTime: "12:57", duration: "3h 00m", price: 29.90 },
  ],
  "Pisa-Rome": [
    { trainNumber: "FR 9561", trainType: "Frecciarossa", departureTime: "10:15", arrivalTime: "13:03", duration: "2h 48m", price: 45.50 },
  ],
};

export const fetchTrainTimes = (
  departure: string, 
  destination: string,
  time?: string,
  timeType?: 'depart' | 'arrive'
): Promise<TrainTime[]> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const key = `${departure}-${destination}`;
      if (allTrains[key]) {
        let results = allTrains[key];

        if (time) {
            if (timeType === 'depart') {
                results = results.filter(train => train.departureTime >= time);
            } else if (timeType === 'arrive') {
                results = results.filter(train => train.arrivalTime <= time);
            }
        }

        resolve(results);
      } else {
        if(Math.random() > 0.9) {
            reject(new Error('Failed to connect to the train schedule provider. Please try again.'));
        } else {
            resolve([]);
        }
      }
    }, 500 + Math.random() * 500);
  });
};
