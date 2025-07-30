import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_BACKEND_URL}`,
  }),
  tagTypes: ['Orders', 'Services', 'Products', 'Offers'],
  endpoints: (builder) => ({



    getUserOrders: builder.query({
      query: (shopId) => `/user/order/shop/${shopId}`,
      providesTags: ['Orders'],
    }),

    getTotalAmountBalance: builder.query({
      query: (shopId) => `/user/order/getTotelbalanceAmount/${shopId}`,
      providesTags: ['Orders'],
    }),

    getUserOrdersByStatus: builder.query({
      query: (status) => `/user/order/status/${status}`,
      providesTags: ['Orders'],
    }),

    getAllServices: builder.query({
      query: (id) => `/shop/service/getall/${id}`,
      providesTags: ['Services'],
    }),

    getProductByService: builder.query({
      query: (id) => `/shop/product/service/${id}`,
      providesTags: (result, error, id) =>
        result?.product?.subcategories?.flatMap((subcategory) =>
          subcategory.products.map((product) => ({ type: 'Products', id: product._id }))
        ) || [{ type: 'Products' }],
    }),

    getImagesDetails: builder.query({
      query: (id) => `/shop/gallery/getall/${id}`,
      providesTags: ['Images'],
    }),

    getAllDeliveryBoys: builder.query({
      query: () => `/delivery/auth/getall`,
      providesTags: ['DeliveryBoys'],
    }),


    getDeliveryBoyByID: builder.query({
      query: (id) => `/delivery/auth/shop/${id}`,
      providesTags: ['DeliveryBoys']
    }),

    getShopDetailsByID: builder.query({
      query: (id) => `/shop/auth/get/${id}`,
      providesTags: ['DeliveryBoys']
    }),
    getAllOrdersByDeliveryBoy: builder.query({
      query: (id) => `/user/order/delivery-boy/${id}`,
      providesTags: ['DeliveryBoys']
    }),

    getShopDetailsById: builder.query({
      query: (id) => `/shop/auth/get/${id}`,
      providesTags: ['shops'],
    }),

    getOffersbyShopid: builder.query({
      query: (id) => `/shop/offer/approved/${id}`,
      providesTags: ['Offers']
    }),

    getRejectedOffersByShopId: builder.query({
      query: (shopId) => `/shop/offer/rejected/${shopId}`,
      providesTags: ['Offers'],
    }),

    getPendingOffersByShopId: builder.query({
      query: (shopId) => `/shop/offer/pending/${shopId}`,
      providesTags: ['Offers'],
    }),

    getNotesByShopId: builder.query({
      query: (id) => `/shop/notes/shop-notes/${id}`,
      providesTags: ['notes']
    }),

    createNote: builder.mutation({
      query: ({ shopId, title, content }) => ({
        url: '/shop/notes/shop-notes',
        method: 'POST',
        body: { shopId, title, content },
      }),
      invalidatesTags: ['notes'],
    }),



    deleteNotesBynoteId: builder.mutation({
      query: (id) => ({
        url: `/shop/notes/shop-notes/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: ['Notes'],
    }),

    deleteDeliveryBoysById: builder.mutation({
      query: (id) => ({
        url: `/delivery/auth/delivery-boy/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['DeliveryBoys'],
    }),

    deleteServicesById: builder.mutation({
      query: (id) => ({
        url: `/shop/service/delete/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Services'],
    }),

    deleteProductById: builder.mutation({
      query: (id) => ({
        url: `/shop/product/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Products'],
    }),

    deleteImageById: builder.mutation({
      query: (id) => ({
        url: `/shop/gallery/delete/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Images'],
    }),

    deleteOfferById: builder.mutation({
      query: (id) => ({
        url: `/shop/offer/delete/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Offers'],
    }),

    deleteProductBySubcategory: builder.mutation({
      query: (id) => ({
        url: `/shop/product/subcategories/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['SubCategories'],
    }),




    postImages: builder.mutation({
      query: (formData) => ({
        url: `/shop/gallery/add`,
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: ['Images'],
    }),





    addService: builder.mutation({
      query: (formData) => ({
        url: '/shop/service/add',
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: ['Services'],
    }),

    addProduct: builder.mutation({
      query: (product) => ({
        url: '/shop/product/addproduct',
        method: 'POST',
        body: product,
      }),
      invalidatesTags: ['Products'],
    }),


    addProductForSubCategory: builder.mutation({
      query: (subProduct) => ({
        url: '/shop/product/createOnlySubcategory',
        method: 'POST',
        body: subProduct,
      }),
      invalidatesTags: ['subProducts'],
    }),

    addOffersOnShop: builder.mutation({
      query: (offers) => ({
        url: 'shop/offer/add',
        method: 'POST',
        body: offers,
      }),
      invalidatesTags: ['Offers'],
    }),

    assignOrderToDeliveryBoy: builder.mutation({
      query: ({ id, offers }) => ({
        url: `/user/order/assign-delivery/${id}`,
        method: 'PUT',
        body: offers,
      }),
      invalidatesTags: ["Orders"],
    }),

    assignDeliveryBoytoReturn: builder.mutation({
      query: ({ id, deliveryBoyId }) => ({
        url: `/user/order/assign-deliveryboy-completed/${id}`,
        method: 'PUT',
        body: { deliveryBoyId },
      }),
    }),

    updateProductById: builder.mutation({
      query: ({ productId, body }) => {
        const formData = new FormData();
        formData.append("name", body.name);
        formData.append("price", body.price);
        if (body.image) {
          formData.append("image", body.image);
        }
        return {
          url: `/shop/product/${productId}`,
          method: "PUT",
          body: formData,
        };
      },
      invalidatesTags: (result, error, { productId }) => [{ type: 'Products', id: productId }],
    }),


    registerShop: builder.mutation({
      query: (shopData) => ({
        url: `/shop/auth/register`,
        method: 'POST',
        body: shopData,
      }),
    }),


    sendOtp: builder.mutation({
      query: (body) => ({
        url: "/shop/auth/login",
        method: "POST",
        body,
      }),
    }),

    verifyOtp: builder.mutation({
      query: (body) => ({
        url: "/shop/auth/verify-login-otp",
        method: "POST",
        body,
      }),
    }),

    resendOtp: builder.mutation({
      query: (body) => ({
        url: "/admin/auth/resend-otp",
        method: "POST",
        body,
      }),
    }),

    logoutFrom: builder.mutation({
      query: (body) => ({
        url: "/user/auth/logout",
        method: "POST",
        body,
      }),
    }),




  }),
});

export const {
  useGetUserOrdersQuery,
  useGetUserOrdersByStatusQuery,
  useGetAllServicesQuery,
  useGetProductByServiceQuery,
  useDeleteServicesByIdMutation,
  useDeleteProductByIdMutation,
  useAddServiceMutation,
  useAddProductMutation,
  useUpdateProductByIdMutation,
  useGetImagesDetailsQuery,
  useDeleteImageByIdMutation,
  usePostImagesMutation,
  useGetAllDeliveryBoysQuery,
  useGetDeliveryBoyByIDQuery,
  useDeleteDeliveryBoysByIdMutation,
  useGetShopDetailsByIdQuery,
  useRegisterShopMutation,
  useSendOtpMutation,
  useVerifyOtpMutation,
  useResendOtpMutation,
  useLogoutFromMutation,
  useGetShopDetailsByIDQuery,
  useGetAllOrdersByDeliveryBoyQuery,
  useGetOffersbyShopidQuery,
  useGetRejectedOffersByShopIdQuery,
  useAddProductForSubCategoryMutation,
  useDeleteOfferByIdMutation,
  useAddOffersOnShopMutation,
  useGetPendingOffersByShopIdQuery,
  useGetDeliveryBoysQuery,
  useDeleteProductBySubcategoryMutation,
  useAssignOrderToDeliveryBoyMutation,
  useGetNotesByShopIdQuery,
  useDeleteNotesBynoteIdMutation,
  useCreateNoteMutation,
  useGetTotalAmountBalanceQuery,
  useAssignDeliveryBoytoReturnMutation
} = apiSlice;
