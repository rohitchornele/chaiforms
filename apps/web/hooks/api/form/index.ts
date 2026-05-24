import { trpc } from "~/trpc/client";

export const useCreateForm = () => {

   const utils = trpc.useUtils()

   const {
      mutateAsync: createFormAsync,
      mutate: createForm,
      error,
      failureCount,
      isError,
      isIdle,
      isSuccess,
      status,
   } =
      trpc.form.createForm.useMutation({
         onSuccess: async () => {
            await utils.form.invalidate();
         }
      });


   return {
      createFormAsync,
      createForm,
      error,
      failureCount,
      isError,
      isIdle,
      isSuccess,
      status,
   }

}


export const useListForm = () => {

   const { data: forms, error, isFetched, isFetching, isLoading, status } = trpc.form.listFormsByUserId.useQuery()

   return {
      forms, error, isFetched, isFetching, isLoading, status
   }

}

export const useGetForm = (id: string) => {
  const { data: form, isLoading, error } = trpc.form.getFormById.useQuery({ id });
  return { form, isLoading, error };
};

export const useGetFields = (formId: string) => {

   const { data: fields, error, isFetched, isFetching, isLoading, status } = trpc.form.getField.useQuery({ formId })

   return {
      fields, error, isFetched, isFetching, isLoading, status
   }
}


export const useCreateField = (formId: string) => {

   const utils = trpc.useUtils()

   const {
      mutateAsync: createFieldAsync,
      mutate: createField,
      error,
      failureCount,
      isError,
      isIdle,
      isSuccess,
      status,
   } = trpc.form.createField.useMutation({
      onSuccess: async () => {
         await utils.form.getField.invalidate({ formId })
      }
   })

   return {
      createFieldAsync,
      createField,
      error,
      failureCount,
      isError,
      isIdle,
      isSuccess,
      status,
   }
}



export const useUpdateField = (formId: string) => {

   const utils = trpc.useUtils()

   const {
      mutateAsync: updateFieldAsync,
      mutate: updateField,
      error,
      failureCount,
      isError,
      isIdle,
      isSuccess,
      status,
   } = trpc.form.updateField.useMutation({
      onSuccess: async () => {
         await utils.form.getField.invalidate({ formId })
      }
   })

   return {
      updateFieldAsync,
      updateField,
      error,
      failureCount,
      isError,
      isIdle,
      isSuccess,
      status,
   }
}


export const useDeleteField = ( fieldId: string ) => {

   const utils = trpc.useUtils()

   const {
      mutateAsync: deleteFieldAsync,
      mutate: deleteField,
      error,
      failureCount,
      isError,
      isIdle,
      isSuccess,
      status,
   } = trpc.form.deleteField.useMutation()

   return {
      deleteFieldAsync,
      deleteField,
      error,
      failureCount,
      isError,
      isIdle,
      isSuccess,
      status,
   }
}

