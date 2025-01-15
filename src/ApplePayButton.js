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
      supportedMethods: "https://apple.com/apple-pay",
      data: 1,
      version: 14,
      merchantIdentifier: "merchant.identifier.example",
      countryCode: "US",
      currencyCode: "USD",
      displayName: "MyStore",
      supportedNetworks: ["visa", "masterCard", "amex"],
      merchantCapabilities: ["supports3DS"],
      total: {
        label: "Test Merchant",
        amount: "0.01",
        type: "final",
      },
    }

    const session = new window.ApplePaySession(3, paymentRequest)

    session.onvalidatemerchant = async event => {
      console.log("Validating Merchant...")
      // Trong môi trường test, trả về một giá trị giả
      session.completeMerchantValidation({
        // Dữ liệu từ validation (test giả lập tại môi trường test)
        merchantSessionIdentifier: "test-validation",
      })
      const merchantSession = await validateMerchant()
      session.completeMerchantValidation(merchantSession)
    }

    const validateMerchant = async () => {
      // Mock implementation of merchant validation
      return {
        merchantSessionIdentifier: "test-validation",
      }
    }
    session.onpaymentmethodselected = event => {
      // Define ApplePayPaymentMethodUpdate based on the selected payment method.
      // No updates or errors are needed, pass an empty object.
      const update = {}
      session.completePaymentMethodSelection(update)
    }
    session.onshippingmethodselected = event => {
      // Define ApplePayShippingMethodUpdate based on the selected shipping method.
      // No updates or errors are needed, pass an empty object.
      const update = {}
      session.completeShippingMethodSelection(update)
    }
    session.onshippingcontactselected = event => {
      // Define ApplePayShippingContactUpdate based on the selected shipping contact.
      const update = {}
      session.completeShippingContactSelection(update)
    }
    // session.onpaymentauthorized = event => {
    //   console.log("Payment Authorized: ", event.payment)

    //   // Mô phỏng việc gửi tới backend
    //   setTimeout(() => {
    //     const isSuccess = true // Có thể mô phỏng trạng thái giao dịch tại đây
    //     session.completePayment(
    //       isSuccess
    //         ? window.ApplePaySession.STATUS_SUCCESS
    //         : window.ApplePaySession.STATUS_FAILURE
    //     )
    //   }, 1000)
    // }

    // session.begin()
    // }
    session.onpaymentauthorized = event => {
      // Define ApplePayPaymentAuthorizationResult
      const result = {
        status: window.ApplePaySession.STATUS_SUCCESS,
      }
      session.completePayment(result)
    }
    session.oncouponcodechanged = event => {
      const calculateNewShippingMethods = couponCode => {
        // Mock implementation of calculating new shipping methods based on coupon code
        return []
      }
      // Define ApplePayCouponCodeUpdate
      const calculateNewTotal = couponCode => {
        // Mock implementation of calculating new total based on coupon code
        return {
          label: "New Total",
          amount: "0.01",
          type: "final",
        }
      }
      const calculateNewLineItems = couponCode => {
        // Mock implementation of calculating new line items based on coupon code
        return []
      }
      const calculateErrors = couponCode => {
        // Mock implementation of calculating errors based on coupon code
        return []
      }

      const newTotal = calculateNewTotal(event.couponCode)
      const newLineItems = calculateNewLineItems(event.couponCode)

      const newShippingMethods = calculateNewShippingMethods(event.couponCode)
      const errors = calculateErrors(event.couponCode)

      session.completeCouponCodeChange({
        newTotal: newTotal,
        newLineItems: newLineItems,
        newShippingMethods: newShippingMethods,
        errors: errors,
      })
    }

    session.oncancel = event => {
      // Payment canceled by WebKit
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
