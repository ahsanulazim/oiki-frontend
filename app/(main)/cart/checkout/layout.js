export const metadata = {
  title: "Checkout | Oiki Lifestyle",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
    },
  },
};

export default function CheckoutLayout({ children }) {
  return <>{children}</>;
}

