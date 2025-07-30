import React from 'react'
import { useGetDeliveryBoyByIdQuery } from '../../redux/appSlice'
export const TemporaryComponent = () => {

    const { data: deliveryBoy } = useGetDeliveryBoyByIdQuery();
    console.log(deliveryBoy);


    return (
        <div>TemporaryComponent</div>
    )
}
