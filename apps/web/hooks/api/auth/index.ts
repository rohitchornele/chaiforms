import { trpc } from "~/trpc/client";


export const useSignup = () => {

   const utils = trpc.useUtils()

   const {
      mutateAsync: createUserWithEmailAndPasswordAsync,
      mutate: createUserWithEmailAndPassword,
      error,
      failureCount,
      isError,
      isIdle,
      isSuccess,
      status,
   } =
      trpc.auth.createUserWithEmailAndPassword.useMutation({
         onSuccess: async () => {
            await utils.auth.getLoggedInUserInfo.invalidate();
         }
      });


   return {
      createUserWithEmailAndPasswordAsync,
      createUserWithEmailAndPassword,
      error,
      failureCount,
      isError,
      isIdle,
      isSuccess,
      status,
   }
}


export const useSignIn = () => {
   const utils = trpc.useUtils()
   const {
      mutateAsync: signInUserWithEmailAndPasswordAsync,
      mutate: signInUserWithEmailAndPassword,
      error,
      failureCount,
      isError,
      isIdle,
      isSuccess,
      status,
   } =
      trpc.auth.signInUserWithEmailAndPassword.useMutation({
         onSuccess: async () => {
            await utils.auth.getLoggedInUserInfo.invalidate();
         }
      });


   return {
      signInUserWithEmailAndPasswordAsync,
      signInUserWithEmailAndPassword,
      error,
      failureCount,
      isError,
      isIdle,
      isSuccess,
      status,
   }
}


export const useUser = () => {
   const {
      data: user,
      error,
      isFetched,
      isFetching,
      isLoading,
      status,
   } = trpc.auth.getLoggedInUserInfo.useQuery()

   console.log({
      user,
      error,
      status,
      isLoading,
      isFetching,
      isFetched,
   });

   return {
      user,
      error,
      isFetched,
      isFetching,
      isLoading,
      status,
   }
}



export const useLogoutUser =
   () => {

      const utils =
         trpc.useUtils();

      const {
         mutateAsync:
         logoutUserAsync,

         mutate:
         logoutUser,

         status,

         error,

         isPending,

         isSuccess,

         isError,
      } =
         trpc.auth.logoutUser.useMutation({
            onSuccess:
               async () => {

                  /**
                   * clear cache
                   */

                  await utils.invalidate();
               },
         });

      return {
         logoutUserAsync,

         logoutUser,

         status,

         error,

         isPending,

         isSuccess,

         isError,
      };
   };
