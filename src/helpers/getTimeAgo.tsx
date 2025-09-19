export function getTimeAgo(dateString: string): string {
  const givenDate = new Date(dateString);
  if (isNaN(givenDate.getTime())) return "invalid date";

  const rtf = new Intl.RelativeTimeFormat(undefined, { style: 'short' });
  const diffInMs = givenDate.getTime() - new Date().getTime();
  const diffInSeconds = diffInMs / 1000;

  if (Math.abs(diffInSeconds) < 60) {
    return rtf.format(Math.round(diffInSeconds), 'second');
  } else if (Math.abs(diffInSeconds) < 3600) {
    return rtf.format(Math.round(diffInSeconds / 60), 'minute');
  } else if (Math.abs(diffInSeconds) < 86400) {
    return rtf.format(Math.round(diffInSeconds / 3600), 'hour');
  } else if (Math.abs(diffInSeconds) < 2592000) {
    return rtf.format(Math.round(diffInSeconds / 86400), 'day');
  } else if (Math.abs(diffInSeconds) < 31536000) {
    return rtf.format(Math.round(diffInSeconds / 2592000), 'month');
  } else {
    return rtf.format(Math.round(diffInSeconds / 31536000), 'year');
  }
}