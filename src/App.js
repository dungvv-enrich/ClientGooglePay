import "./App.css"
import GooglePayButton from "@google-pay/button-react"

const shippingOptions = [
  {
    id: "free",
    label: "Free shipping",
    description: "Arrives in 5 to 7 days",
    price: "0.00",
  },
  {
    id: "express",
    label: "Express shipping",
    description: "$5.00 - Arrives in 1 to 3 days",
    price: "5.00",
  },
]
function App() {
  const environment = "TEST" //'PRODUCTION'
  return (
    <div className='App'>
      <GooglePayButton
        environment={environment}
        paymentRequest={{
          apiVersion: 2,
          apiVersionMinor: 0,
          allowedPaymentMethods: [
            {
              type: "CARD",
              parameters: {
                allowedAuthMethods: ["PAN_ONLY", "CRYPTOGRAM_3DS"],
                allowedCardNetworks: [
                  "AMEX",
                  "DISCOVER",
                  "JCB",
                  "MASTERCARD",
                  "VISA",
                ],
                billingAddressRequired: true,
                billingAddressParameters: {
                  format: "FULL",
                },
              },
              tokenizationSpecification: {
                type: "PAYMENT_GATEWAY",
                parameters: {
                  gateway: "example",
                  gatewayMerchantId: "DCR2DFGGHP7EJS",
                },
              },
            },
          ],
          merchantInfo: {
            // merchantId: "12345678901234567890",
            merchantName: "example",
          },
          shippingAddressParameters: {
            phoneNumberRequired: false,
            allowedCountryCodes: ["US", "GB"],
          },
          shippingAddressRequired: true,
          transactionInfo: {
            totalPriceStatus: "FINAL",
            totalPriceLabel: "Total",
            totalPrice: "12.99",
            currencyCode: "USD",
            countryCode: "US",
          },
          // callbackIntents: ["PAYMENT_AUTHORIZATION"],
          // shippingAddressRequired: true,
          // shippingOptionParameters: {
          //   defaultSelectedOptionId: "free",
          //   shippingOptions: shippingOptions.map(o => ({
          //     id: o.id,
          //     label: o.label,
          //     description: o.description,
          //   })),
          // },
          // shippingOptionRequired: true,
        }}
        //existingPaymentMethodRequired={true} //setup khi product
        buttonColor={"black"}
        // buttonLocale={"en"}
        buttonType={"buy"}
        buttonRadius={20}
        onLoadPaymentData={paymentRequest => {
          console.log("load payment data", paymentRequest)
        }}
        // onPaymentAuthorized={paymentData => ({
        //   transactionState: "ERROR",
        //   error: {
        //     reason: "PAYMENT_DATA_INVALID",
        //     message: "Insufficient funds",
        //     intent: "PAYMENT_AUTHORIZATION",
        //   },
        // })}
        // onPaymentDataChanged={paymentData => {
        //   if (paymentData.shippingAddress?.countryCode === "US") {
        //     return {
        //       error: {
        //         reason: "SHIPPING_ADDRESS_UNSERVICEABLE",
        //         message: "Cannot ship to the United States of America",
        //         intent: "SHIPPING_ADDRESS",
        //       },
        //     }
        //   }
        //   return {}
        // }}
      />
    </div>
  )
}

export default App
