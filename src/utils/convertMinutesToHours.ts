export const convertMinutesToHours = (minutes: number) => {
  const hours = Math.floor(minutes / 60);
  const min = minutes % 60;
  const textHours = `${hours}hr`;
  const textMinutes = `${min}min`;

  return `${textHours} ${textMinutes}`;
};
