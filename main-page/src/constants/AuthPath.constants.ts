const enum AuthPathConstants {
  //https://my-base-rs.herokuapp.com
  //https://qwerzxvxzvzxvxzv.herokuapp.com
  BASE = 'https://qwerzxvxzvzxvxzv.herokuapp.com',
  USERS = '/users',
  SIGIN = '/signin',
  TOKENS = '/tokens',
  STATISTICS = '/statistics',
  WORDS = '/words',
  AGGREGATED_WORDS = '/aggregatedWords',
  FILTER_BY_HARD = `filter={"userWord.difficulty":"hard"}`

}

export default AuthPathConstants