// ApplePayButton.jsx
import React, { useEffect, useState } from "react"

const ApplePayButton = () => {
  const [canUseApplePay, setCanUseApplePay] = useState(false)

  useEffect(() => {
    if (window.ApplePaySession && window.ApplePaySession.canMakePayments()) {
      setCanUseApplePay(true)
    }
  }, [])

  const handleApplePay = async () => {
    const paymentRequest = {
      countryCode: "US",
      currencyCode: "USD",
      supportedNetworks: ["visa", "masterCard", "amex"],
      merchantCapabilities: ["supports3DS"],
      total: {
        label: "Test Merchant",
        amount: "10.00",
      },
    }

    const session = new window.ApplePaySession(3, paymentRequest)

    session.onvalidatemerchant = event => {
      console.log("Validating Merchant...")
      // Trong môi trường test, trả về một giá trị giả
      session.completeMerchantValidation({
        // Dữ liệu từ validation (test giả lập tại môi trường test)
        merchantSessionIdentifier: "test-validation",
      })
    }

    session.onpaymentauthorized = event => {
      console.log("Payment Authorized: ", event.payment)

      // Mô phỏng việc gửi tới backend
      setTimeout(() => {
        const isSuccess = true // Có thể mô phỏng trạng thái giao dịch tại đây
        session.completePayment(
          isSuccess
            ? window.ApplePaySession.STATUS_SUCCESS
            : window.ApplePaySession.STATUS_FAILURE
        )
      }, 1000)
    }

    session.begin()
  }

  return (
    <div>
      {canUseApplePay ? (
        <button
          onClick={handleApplePay}
          style={{
            display: "inline-block",
            width: "200px",
            height: "44px",
            backgroundColor: "black",
            WebkitAppearance: "-apple-pay-button",
            applePayButtonType: "buy",
          }}></button>
      ) : (
        <p>Apple Pay is not available on this device/browser.</p>
      )}
    </div>
  )
}

export default ApplePayButton
