import {LOADING_STATUS} from './enums'

const isLoadingOrCompletedOrFailed = (...args: LOADING_STATUS[]) =>
  args.some(
    (state: LOADING_STATUS) =>
      state === LOADING_STATUS.LOADING ||
      state === LOADING_STATUS.COMPLETED ||
      state === LOADING_STATUS.FAILED,
  )

const isLoading = (...args: LOADING_STATUS[]) =>
  args.some((state: LOADING_STATUS) => state === LOADING_STATUS.LOADING)

const isLastProfileCard = (cardsArray, currentProfileData) => {
  const lastIndex = cardsArray.length - 1
  const currentIndex = cardsArray.findIndex(
    data => data.user._id === currentProfileData.user._id,
  )
  const isLastCard = currentIndex === lastIndex
  return [isLastCard, currentIndex]
}

function getUserBatchYear(userEmailContent: string) {
  const numbers = userEmailContent.match(/\d+/g) || []
  return numbers[numbers.length - 1]
}

function getUserContentFromEmail(email: string) {
  if (email) {
    const emailContentArray = email.split('@')
    const userContent = emailContentArray[0]
    const domainContent = emailContentArray[1]
    const domainContentArray = domainContent.split('.')
    const schoolName = domainContentArray[1]
    const programName = domainContentArray[0]
    const batch = getUserBatchYear(userContent)
    return [schoolName, programName, batch]
  }
  return []
}

const generateSignInPayload = async (user: any) => {
  const data = getUserContentFromEmail(user?.email)

  const batchYear = data[2]
  const program = data[1].toUpperCase()
  const school = data[0].toUpperCase()
  const payload = {
    email: user.email || '',
    firstName: user.givenName || '',
    lastName: user.familyName || '',
    class: batchYear,
    program: program,
    school: school,
    cohort: `${school} ${program} Class of ${batchYear}`,
  }
  return payload
}

export {
  isLoadingOrCompletedOrFailed,
  isLoading,
  isLastProfileCard,
  getUserContentFromEmail,
  generateSignInPayload,
}
