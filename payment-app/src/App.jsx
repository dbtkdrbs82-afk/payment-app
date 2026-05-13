import "./App.css";
import { loadTossPayments } from "@tosspayments/payment-sdk";

function App() {
  const page = window.location.pathname;

  if (page === "/fail") {
    const params = new URLSearchParams(window.location.search);
  
    const code = params.get("code");
    const message = params.get("message");
  
    return (
      <div className="page">
        <div className="payment-card">
          <h1>결제 실패</h1>
          <p>에러 코드: {code}</p>
          <p>{message}</p>
  
          <button onClick={() => (window.location.href = "/")}>
            다시 시도
          </button>
        </div>
      </div>
    );
  }  

  const handlePayment = async () => {
    try {
      const clientKey = "test_ck_LlDJaYngroaYkOqwzpPl3ezGdRpX";

      const tossPayments = await loadTossPayments(clientKey);

      await tossPayments.requestPayment("카드", {
        amount: 1000,
        orderId: "order-" + Date.now(),
        orderName: "테스트 상품",
        customerName: "홍길동",
        successUrl: window.location.origin + "/success",
        failUrl: window.location.origin + "/fail",
      }); 

    } catch (error) {
      console.error(error);
      alert("결제 오류 발생");
    }
  };

  return (
    <div className="page">
      <div className="payment-card">
        <h1>결제 테스트</h1>
        <p>상품명: 테스트 상품</p>
        <p>금액: 1,000원</p>

        <button onClick={handlePayment}>
          결제하기
        </button>
      </div>
    </div>
  );
}

export default App;