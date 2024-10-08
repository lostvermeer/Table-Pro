// import { combineReducers, configureStore } from '@reduxjs/toolkit'
// import { TableReducer } from './reducer'

// export const store = configureStore({
//   reducer: {
//     posts: postsReducer,
//     comments: commentsReducer,
//     users: usersReducer
//   }
// })

// const rootreducer = combineReducers({company:TableReducer});
// const store=configureStore({reducer:rootreducer,middleware:[thunk]})
// export default store;

// // Get the type of our store variable
// export type AppStore = typeof store
// // Infer the `RootState` and `AppDispatch` types from the store itself
// export type RootState = ReturnType<AppStore['getState']>
// // Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
// export type AppDispatch = AppStore['dispatch']