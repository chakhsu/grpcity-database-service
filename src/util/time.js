const timeout = (ms) => {
  return new Promise((resolve, reject) => setTimeout(resolve, ms))
}

export {
  timeout
}
