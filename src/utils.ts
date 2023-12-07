import {LOADING_STATUS} from './enums';

const isLoadingOrCompletedOrFailed = (...args: LOADING_STATUS[]) =>
  args.some(
    (state: LOADING_STATUS) =>
      state === LOADING_STATUS.LOADING ||
      state === LOADING_STATUS.COMPLETED ||
      state === LOADING_STATUS.FAILED,
  );

const isLoading = (...args: LOADING_STATUS[]) =>
  args.some((state: LOADING_STATUS) => state === LOADING_STATUS.LOADING);

const isLastProfileCard = (cardsArray, currentProfileData) => {
  const lastIndex = cardsArray.length - 1;
  const currentIndex = cardsArray.findIndex(
    data => data.id === currentProfileData.id,
  );
  const isLastCard = currentIndex === lastIndex;
  return [isLastCard, currentIndex];
};

export {isLoadingOrCompletedOrFailed, isLoading, isLastProfileCard};
