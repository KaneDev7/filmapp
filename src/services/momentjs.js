import moment from 'moment';

export function convertISOToDuration(isoDate) {
  const now = moment();
  const then = moment(isoDate);
  const duration = moment.duration(now.diff(then));

  const years = duration.years();
  const months = duration.months();
  const days = duration.days();
  const hours = duration.hours();
  const minutes = duration.minutes();
  const seconds = duration.seconds();

  if (years > 0) {
    return `il y'a ${years} an${years > 1 ? 's' : ''}`;
  } else if (months > 0) {
    return `il y'a ${months} mois`;
  } else if (days > 0) {
    return `il y'a ${days} jour${days > 1 ? 's' : ''}`;
  } else if (hours > 0) {
    return `il y'a ${hours} heure${hours > 1 ? 's' : ''}`;
  } else if (minutes > 0) {
    return `il y'a ${minutes} minute${minutes > 1 ? 's' : ''}`;
  } else if (seconds > 0) {
    return 'quelques secondes';
  } else {
    return 'à l\'instant';
  }
}