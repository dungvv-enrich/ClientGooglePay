import "./App.css"
// import GooglePayButton from "@google-pay/button-react"
import ApplePayButton from "./ApplePayButton"

function App() {
  const urlParams = new URLSearchParams(window.location.search)
  const amount = urlParams.get("amount") || "1.00" // Mặc định 1.00 USD
  const paymentKey = urlParams.get("key") || "BCR2DN4T262MZ6IX"

  console.log("Amount:", amount)
  console.log("Key:", paymentKey)

  //const environment = "PRODUCTION" //'PRODUCTION'
  return (
    <div className='App'>
      {/* <GooglePayButton
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
                  gateway: "Test01",
                  gatewayMerchantId: "BCR2DN4T262MZ6IX",
                },
              },
            },
          ],
          merchantInfo: {
            merchantId: "BCR2DN4T77JMJTI6",
            merchantName: "New Dzung",
          },
          shippingAddressParameters: {
            phoneNumberRequired: false,
            allowedCountryCodes: ["US", "GB"],
          },
          shippingAddressRequired: true,
          transactionInfo: {
            totalPriceStatus: "FINAL",
            totalPriceLabel: "Total",
            totalPrice: "0.01",
            currencyCode: "USD",
            countryCode: "US",
          },
        }}
        buttonColor={"default"}
        buttonLocale={"en"}
        buttonType={"buy"}
        buttonRadius={20}
        onLoadPaymentData={paymentRequest => {
          console.log("load payment data", paymentRequest)
          alert("Payment Successful!")
        }}
        onError={error => {
          console.error("Payment Error:", error)
          alert("Payment Failed!")
        }}
      /> */}
      <ApplePayButton />
    </div>
  )
}

export default App
