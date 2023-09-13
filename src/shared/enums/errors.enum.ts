/*
  Custom exceptions
*/

export enum UsernameExists {
  status = 422,
  key = 'UsernameExists',
  message = 'Username already exists.',
}

export enum InvalidUsername {
  status = 422,
  key = 'InvalidUsername',
  message = `Username must consist of only letters and digits and should not start from digit.`,
}

export enum InvalidName {
  status = 422,
  key = 'InvalidName',
  message = `Name must consist of only letters and spaces.`,
}

export enum UserNotFound {
  status = 422,
  key = 'UserNotFound',
  message = 'User not found.',
}

export enum BookNotFound {
  status = 422,
  key = 'BookNotFound',
  message = 'Book not found.',
}

export enum SubscriptionExists {
  status = 422,
  key = 'SubscriptionExists',
  message = 'Subscription already exists.',
}

export enum InvalidPeriod {
  status = 422,
  key = 'InvalidPeriod',
  message = 'Invalid subscription period. Start date can not be after end date.',
}

export enum InvalidDate {
  status = 422,
  key = 'InvalidStartDate',
  message = 'None of the dates can be in the past.',
}

export enum SubscriptionNotFound {
  status = 422,
  key = 'SubscriptionNotFound',
  message = 'Subscription not found.',
}

export enum TooManyBooksRented {
  status = 422,
  key = 'TooManyBooksRented',
  message = 'You have already rented too many books. Please return some of them to rent new ones.',
}

export enum BookNotAvailable {
  status = 422,
  key = 'BookNotAvailable',
  message = 'Currently this book is not available because it is rented by other person.',
}

export enum RentNotFound {
  status = 422,
  key = 'RentNotFound',
  message = 'This book is not currently rented by you.',
}
