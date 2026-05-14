const fs = require('fs');

let content = fs.readFileSync('src/pages/InstallFlow.jsx', 'utf8');

// 1. Add axios import and loadScript
const importsRegex = /(import \{.*\} from "framer-motion";)/;
content = content.replace(importsRegex, `$1\nimport axios from "axios";\n\nconst loadScript = src => new Promise((resolve) => {\n  const script = document.createElement('script');\n  script.src = src;\n  script.onload = () => resolve(true);\n  script.onerror = () => resolve(false);\n  document.body.appendChild(script);\n});`);

// 2. Replace handleComplete with handleRazorpayCheckout
const handleCompleteRegex = /const handleComplete = async \(\) => \{[\s\S]*?setTimeout\(\(\) => setDeliveryStatus\(2\), 4000\); \/\/ Move to Delivered\n  \};/m;

const handleRazorpayCheckoutFn = `const handleRazorpayCheckout = async () => {
    const amount = product?.price || product?.price_min || 0;
    setLoading(true);
    
    try {
      const { data } = await axios.post('http://localhost:5000/api/payment/order', {
        amount: amount,
        currency: 'USD'
      });
      
      if (!data.success) {
        throw new Error(data.message || 'Failed to create order');
      }
      
      const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js');
      if (!res) {
        alert('Razorpay SDK failed to load. Are you online?');
        setLoading(false);
        return;
      }
      
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID || '', // Needs to be added to frontend .env
        amount: Math.round(amount * 100),
        currency: data.currency,
        name: 'Deployra',
        description: \`Deployment setup for \${product?.title || 'System'}\`,
        order_id: data.order_id,
        handler: async function (response) {
          try {
            const verifyData = await axios.post('http://localhost:5000/api/payment/verify', {
              orderId: data.order_id,
              paymentId: response.razorpay_payment_id,
              signature: response.razorpay_signature
            });
            
            if (verifyData.data.success) {
               setLoading(false);
               setStep(4);
               setDeliveryStatus(0);
               setTimeout(() => setDeliveryStatus(1), 1500);
               setTimeout(() => setDeliveryStatus(2), 4000);
            }
          } catch (err) {
             console.error("Verification failed", err);
             alert("Payment verification failed.");
          }
        },
        modal: {
          ondismiss: function () {
            setLoading(false);
          }
        },
        theme: {
          color: '#4D9FFF'
        }
      };
      
      const rzp = new window.Razorpay(options);
      rzp.on('payment.failed', function (response) {
         console.error(response.error.description);
         alert("Payment failed: " + response.error.description);
      });
      rzp.open();
      
    } catch (error) {
      console.error(error);
      alert("Checkout error: " + (error.response?.data?.message || error.message));
      setLoading(false);
    }
  };`;

content = content.replace(handleCompleteRegex, handleRazorpayCheckoutFn);

// 3. Remove Step 3 Render (line ~453 to ~517)
const step3RenderRegex = /\{step === 3 && \([\s\S]*?<\/StepContent>\n              \)\}/m;
content = content.replace(step3RenderRegex, '');

// 4. Update the "Configure and Pay" button logic
// Before:
// {step < 3 ? (
//   <Button onClick={() => setStep(step + 1)} className="bg-white text-black rounded-xl font-heading font-bold gap-2 h-12 px-8 hover:bg-white/90 shadow-[0_0_20px_rgba(255,255,255,0.2)] ml-auto">
//     {step === 2 ? "Configure and Pay" : "Continue"} <ArrowRight className="w-4 h-4" />
//   </Button>
// ) : (
//   <Button onClick={handleComplete} className="bg-nova-blue text-white rounded-xl font-heading font-bold gap-2 h-12 px-8 hover:bg-nova-blue/90 shadow-[0_0_20px_rgba(77,159,255,0.3)]">
//     Pay ${product?.price || product?.price_min || "0"} & Setup <ArrowRight className="w-4 h-4" />
//   </Button>
// )}
const navButtonsRegex = /\{step < 3 \? \([\s\S]*?<\/Button>\n              \)\}/m;
const newNavButtons = `{step === 1 ? (
                <Button onClick={() => setStep(2)} className="bg-white text-black rounded-xl font-heading font-bold gap-2 h-12 px-8 hover:bg-white/90 shadow-[0_0_20px_rgba(255,255,255,0.2)] ml-auto">
                  Continue <ArrowRight className="w-4 h-4" />
                </Button>
              ) : step === 2 ? (
                <Button onClick={handleRazorpayCheckout} className="bg-nova-blue text-white rounded-xl font-heading font-bold gap-2 h-12 px-8 hover:bg-nova-blue/90 shadow-[0_0_20px_rgba(77,159,255,0.3)] ml-auto">
                  Configure and Pay <ArrowRight className="w-4 h-4" />
                </Button>
              ) : null}`;

content = content.replace(navButtonsRegex, newNavButtons);

fs.writeFileSync('src/pages/InstallFlow.jsx', content);
console.log('InstallFlow updated');
