// stripe-checkout.js - Stripe payment integration for premium features
// This file handles micro-payments for advanced features

const initStripeCheckout = (featureName) => {
  const PRICE_IDS = {
    'watermark-pro': 'price_watermark_pro',
    'pdf-password': 'price_pdf_password',
    'video-trim-pro': 'price_video_trim_pro',
    'noise-reduce-pro': 'price_noise_reduce_pro'
  };

  const showUpgradeModal = (feature, description) => {
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black/50 flex items-center justify-center z-50';
    modal.innerHTML = `
      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6 max-w-md w-full mx-4">
        <h3 class="text-xl font-bold mb-4">프리미엄 기능: ${feature}</h3>
        <p class="text-gray-600 dark:text-gray-400 mb-4">${description}</p>
        <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mb-4">
          <p class="text-sm text-gray-500 dark:text-gray-400">1회 결제: $0.99</p>
          <p class="text-xs text-gray-400 dark:text-gray-500">결제 후 즉시 사용 가능</p>
        </div>
        <div class="flex gap-2">
          <button id="cancel-upgrade" class="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700">
            취소
          </button>
          <button id="pay-upgrade" class="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            결제하기
          </button>
        </div>
      </div>
    `;
    document.body.appendChild(modal);

    document.getElementById('cancel-upgrade').addEventListener('click', () => {
      modal.remove();
    });

    document.getElementById('pay-upgrade').addEventListener('click', () => {
      processPayment(feature);
      modal.remove();
    });
  };

  const processPayment = async (feature) => {
    try {
      showToast('결제 처리 중...', 'info');
      // In production, this would call your backend to create a Checkout Session
      // For demo purposes, we'll simulate a successful payment
      const paymentSuccess = await new Promise(resolve => {
        setTimeout(() => resolve(Math.random() > 0.1), 2000);
      });

      if (paymentSuccess) {
        localStorage.setItem(`premium_${feature}`, 'true');
        showToast(`결제 성공! ${feature} 기능이 활성화되었습니다`, 'success');
        // Reload the feature or refresh the page
        if (typeof initImageResizer === 'function') {
          initImageResizer();
        } else {
          location.reload();
        }
      } else {
        showToast('결제 실패. 다시 시도해주세요.', 'error');
      }
    } catch (err) {
      console.error('Payment error:', err);
      showToast('결제 처리 중 오류가 발생했습니다.', 'error');
    }
  };

  // Check if user has premium access
  const hasPremiumAccess = (feature) => {
    return localStorage.getItem(`premium_${feature}`) === 'true';
  };

  // Public API
  return {
    showUpgradeModal,
    processPayment,
    hasPremiumAccess,
    PRICE_IDS
  };
};