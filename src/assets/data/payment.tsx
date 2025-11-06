/* eslint-disable react/react-in-jsx-scope */
import images from "@/constants/images";
import {  FontAwesome, Octicons } from '@expo/vector-icons'

   export const paymentData = [
        {
            id: 1,
            label: 'Pay with Paystack',
            img: images.paystack,
            icon: null,
        },
        {
            id: 2,
            label: 'Pay with USSD',
            img: null,
            icon: <Octicons name="number" size={16} color="white" />,
        },
        {
            id: 3,
            label: 'Pay with Transfer',
            img: null,
            icon: <FontAwesome name="send" size={16} color="white" />,
        },
    ]